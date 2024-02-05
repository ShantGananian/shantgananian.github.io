---
layout: single # archive

title: 'Künstliche Neuronale Netze und ihre Anwendung auf die industrielle Fehlerdiagnose von Pleuelstangen in Kompressoren: Einführung und Anwendungen'
excerpt: "Erstellung neuronaler Netze mit MATLAB und Anwendung zur Lösung technischer Probleme wie Mustererkennung zur korrekten Sortierung von Paketen und Klassifizierung zur Fehlerdiagnose von Kompressorpleueln."
myLink: /en/nn-parcel-rod/ # Custom Variable
# author_profile: true
last_modified_at: 2024-01-15
date: 2024-01-15
published: true
tagsen:
  - MATLAB
  - Qualitätssicherung
  - Datenanalyse
  - Neuronale Netze
  - Künstliche Intelligenz
  - Fehlerdiagnose


toc: true
toc_label: "Inhaltsübersicht"
toc_icon: "cog"
toc_sticky: true

header:
  #image: /assets/img/mca-stress-deflection/Figure6.jpg
  #teaser: assets/img/mca-stress-deflection/Figure6.jpg
---

<img align="right" width="25%" heighth="auto" src="/assets/img/laufende-arbeiten.png" alt="Figure">

<br>
Erstellung neuronaler Netze mit MATLAB und Anwendung zur Lösung technischer Probleme wie Mustererkennung zur korrekten Sortierung von Paketen und Klassifizierung zur Fehlerdiagnose von Kompressorpleueln.

<a id="section-a"></a>
## Neuronenmodell und Übertragungsfunktionen

<a id="subsection-a"></a>
### 1. Neuronenmodell

Der grundlegende Baustein für neuronale Netze ist das in <a href="#figure1">Abbildung 1</a> dargestellte Neuron mit einem Eingang. In einem Neuron gibt es drei Funktionsabläufe.

<ul>
    <li>Zunächst wird die skalare Eingabe $p$ mit dem skalaren Gewicht $w$ multipliziert, um das Skalarprodukt $wp$ zu bilden. Dieser Vorgang wird als Gewichtsfunktion bezeichnet.</li>
    <li>Zweitens wird die gewichtete Eingabe $wp$ mit der skalaren Bias $b$ (auch "Offset" genannt) addiert, die wie eine Gewichtung ist, aber mit einer konstanten Eingabe von $1$, um die Nettoeingabe $n$ zu bilden. Dieser Vorgang wird als Nettoeingangsfunktion bezeichnet.</li>
    <li>Schließlich wird die Nettoeingabe $n$ durch die Übertragungsfunktion $f$ (auch "Aktivierungsfunktion" genannt) geleitet, die die skalare Ausgabe $a$ erzeugt. Dieser Vorgang wird als Übertragungsfunktion bezeichnet. Ohne die Angabe der Übertragungsfunktion kann die Ausgabe des Neurons nicht bestimmt werden.</li>
</ul>

<center>
    <p>
    <figure id="figure1" style='display: table; width: 55%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure1.png" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 1: Ein-Eingangs-Neuron</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-a"></a>
### 2. Übertragungsfunktionen

Es gibt zahlreiche gebräuchliche Aktivierungsfunktionen. Im folgenden Code werden vier Aktivierungsfunktionen für eine Nettoeingabe $n$ berechnet und gezeichnet:

<ol>
    <li>Hyperbolisch-tangentiale sigmoide Übertragungsfunktion: $$a=f\left(n\right)=\mathrm{tansig}\left(n\right)=\frac{2}{1+e^{-2n} }-1$$</li>
    <li>Exponentiale Übertragungsfunktion: $$a=f\left(n\right)=\frac{2}{1+e^{-n} }-1$$</li>
    <li>Hard-Limit-Übertragungsfunktion: $$a=f\left(n\right)=\mathrm{hardlim}\left(n\right)=\left\lbrace \begin{array}{ll}
1 & \mathrm{if}\;n\ge 0\\
0 & \mathrm{otherwise}
\end{array}\right.$$</li>
    <li>Lineare Übertragungsfunktion: $$a=f\left(n\right)=\mathrm{purelin}\left(n\right)=n$$</li>
</ol>

wobei die Nettoeingabe $n=\mathbf{Wp}+b=2p+3$ ist, wenn die Gewichtung $w$ der einzelnen Eingabe $p$ gleich $2$ und der Bias $b$ gleich $3$ ist.

Die exponentielle Übertragungsfunktion ist normalisiert und von Null abgehoben, so dass die Ausgabe zwischen $-1$ und $1$ liegt.

Die hyperbolische Tangens-Sigmoid-Übertragungsfunktion (<code>tansig</code> oder <code>tanh</code>) und die Exponentialübertragungsfunktion sind sehr ähnlich. Sie setzen der Ausgabe Grenzen. In diesem Fall innerhalb des Bereichs $-3 ≤ n < 1$, in dem sie die Funktion der Eingabe zurückgeben. Außerhalb dieser Grenzen geben sie $-1$ oder $1$ zurück.

Die hard-limit Übertragungsfunktion (<code>hardlim<code>) gibt $0$ zurück, wenn der Wert kleiner als ein Schwellenwert ist, und $1$, wenn er größer oder gleich dem Schwellenwert ist, hier $-1,5$.

Die lineare Übertragungsfunktion berechnet einfach die Ausgabe des Neurons, indem sie einfach den Wert $n$ zurückgibt, der ihr übergeben wurde.

Der folgende Code berechnet diese vier Aktivierungsfunktionen für eine Nettoeingabe $n$ und stellt sie dar:

{% include codes/nn-parcel-rod/m1.html %}

<center>
    <p>
    <figure id="figure2" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure2.png" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 2: Grafische Darstellung der Aktivierungsfunktionen</figcaption>
    </figure>
    </p>
</center>

Die zentrale Idee neuronaler Netze besteht darin, die einstellbaren skalaren Parameter $w$ und $b$ des Neurons so anzupassen, dass das Netz ein gewünschtes oder interessantes Verhalten zeigt. Dieses Verfahren wird als Perceptron-Lernregel oder Trainingsalgorithmus bezeichnet.

<a id="section-b"></a>
## Mehrfacheingabe-Neuron

Das einfache Neuron kann erweitert werden, um Eingaben zu verarbeiten, die Vektoren sind. Ein Neuron mit einem einzigen Zwei-Elemente-Eingangsvektor $(R=2)$ ist in <a href="#figure1">Abbildung 3</a> dargestellt, wobei die einzelnen Eingangselemente $p_1$ und $p_2$ mit den Gewichten $w_{1,1}$ und $w_{1,2}$ des Neurons (hier gibt es ein Neuron) multipliziert und die gewichteten Werte der summierenden Verzweigung zugeführt werden. Ihre Summe ist einfach $\textbf{Wp}$, das Punktprodukt, das einfach die Summe der komponentenweisen Produkte der Vektorkomponenten der (einzeiligen) Matrix $\textbf{W}$ und des Vektors $\textbf{p}$ ist. Das Neuron hat einen Bias (Offset) $b$, der mit den gewichteten Eingängen summiert wird, um die Nettoeingabe $n$ zu bilden. Die Nettoeingabe $n$ ist das Argument der Übertragungsfunktion $f$.

$$n=w_{1,1} \cdot p_1 +w_{1,2} \cdot p_2 +b$$

<center>
    <p>
    <figure id="figure3" style='display: table; width: 55%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure3.png" alt="Figure 3">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 3: Zwei-Eingabe-Neuron</figcaption>
    </figure>
    </p>
</center>

Eine Entscheidungsgrenze wird durch die Eingangsvektoren bestimmt, für die die Nettoeingabe $n$ gleich Null ist.

$$n=w_{1,1} \cdot p_1 +w_{1,2} \cdot p_2 +b=0$$

Damit wird eine Grenze im Eingaberaum (Merkmalsraum) definiert, eine lineare Trennlinie, die den Eingaberaum in zwei Teile unterteilt. Ein Eingaberaum umfasst alle möglichen Wertemengen für die Eingabe. Wenn das innere Produkt der Gewichtsmatrix $\textbf{W}$ (in diesem Fall ein einzeiliger Vektor) mit dem Eingabevektor $\textbf{p}$ größer oder gleich $-b$ ist, ist die Ausgabe positiv $(n>1)$, andernfalls ist die Ausgabe negativ $(n<1)$. <a href="#figure4">Abbildung 4</a> veranschaulicht dies für den Fall, dass $b = -3$. Die blaue Linie in der Abbildung, die lineare Trennlinie, wird in drei Dimensionen als Ebene oder Hyperebene bezeichnet und stellt alle Punkte dar, für die die Nettoeingabe $n$ gleich Null ist und somit im Eingabe-Ausgabe-Raum das Ergebnis der Übertragungsfunktion $f$, in diesem Fall die hyperbolische Tangens-Sigmoid-Übertragungsfunktion, ebenfalls Null ist. Der schattierte Bereich enthält alle Eingangsvektoren, für die der Ausgang des Netzes näher oder gleich $1$ ist. Für alle anderen Eingangsvektoren ist der Ausgang näher oder gleich $-1$ (der nicht schattierte Bereich).

Im Grunde gibt es eine unendliche Menge von Gleichungen, die alle dasselbe Trennzeichen darstellen, da die Multiplikation beider Seiten der Gleichung mit einer beliebigen Zahl die Gleichheit nicht beeinträchtigt.

<center>
    <p>
    <figure id="figure4" style='display: table; width: 65%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure4.png" alt="Figure 4">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 4: Entscheidungsgrenze für Perzeptron mit zwei Eingängen</figcaption>
    </figure>
    </p>
</center>

Die Entscheidungsgrenze, eine Hyperebene, wird immer orthogonal zur Gewichtsmatrix sein, und die Position der Grenze kann durch Änderung von $b$ verschoben werden. Zur Verdeutlichung: Nach der Definition der Orthogonalität in der Mathematik sind zwei Vektoren im euklidischen Raum dann und nur dann orthogonal, wenn ihr Punktprodukt gleich Null ist, d. h. wenn sie einen Winkel von $90°$ bilden. Aus der Definition der Hyperebene in der Geometrie geht hervor, dass eine Hyperebene ein Unterraum ist, dessen Dimension um eins kleiner ist als die des ihn umgebenden Raums. In einem zweidimensionalen Raum wäre eine Hyperebene also eine Linie.

Für einen $n$-dimensionalen Raum ist eine Ebene durch die Gleichung definiert:

$$\left(w_1 p_1 \right)+\left(w_2 p_2 \right)+\left(w_3 p_3 \right)+\ldotp \ldotp \ldotp \left(w_n p_n \right)+b=0$$

$$\Rightarrow \mathit{\mathbf{w}}\cdot {\mathit{\mathbf{p}}}^T +b=0$$

wobei $\textbf{w}$ und $\textbf{p}$ jeweils Vektoren der Länge $n$ sind. $\textbf{w}$ ist ein Vektor orthogonal zur Ebene, die den Vektor $\textbf{p}$ enthält, und $b$ ist proportional zum senkrechten Abstand vom Ursprung zur Ebene (der Entscheidungsgrenze). Die Proportionalitätskonstante ist das Negativ des Betrags des Normalenvektors.

Zusammenfassend lässt sich sagen, dass das Ziel des Lernens in einem Einzelausgangs-Perzeptron im Allgemeinen darin besteht, die trennende Hyperebene (d.h. die lineare Entscheidungsgrenze), die einen $n$-dimensionalen "Eingaberaum" teilt, anzupassen, wobei $n$ die Anzahl der Nettoeingaben ist, indem die Gewichte und der Bias so lange verändert werden, bis sich alle Eingabevektoren mit dem Zielwert $1$ auf einer Seite der Hyperebene und alle Eingabevektoren mit dem Zielwert $0$ oder $-1$, je nach Aktivierungsfunktion, auf der anderen Seite der Hyperebene befinden. In einem Nework mit mehreren Neuronen ist $\textbf{W}$ eine Matrix, die aus einer Reihe von Zeilenvektoren besteht, von denen jeder in einer Gleichung ähnlich der obigen verwendet wird. Für jede Zeile von $\textbf{W}$ gibt es eine Begrenzung.

Die Schlüsseleigenschaft des Ein-Neuronen-Perzeptrons ist daher, dass es Eingangsvektoren in zwei Kategorien trennen kann. Da die Grenze linear ist, kann das einschichtige Perzeptron nur zur Klassifizierung von Eingaben verwendet werden, die linear trennbar sind (durch eine lineare Grenze getrennt werden können).

Zur Definition eines Netzes sind die folgenden Problemspezifikationen hilfreich:

<ol>
  <li>Anzahl der Netzeingaben = Anzahl der Problemeingaben</li>
  <li>Anzahl der Neuronen in der Ausgabeschicht = Anzahl der Problemausgaben</li>
  <li>Die Wahl der Übertragungsfunktion der Ausgangsschicht wird zumindest teilweise durch die Problemstellung der Ausgänge bestimmt</li>
</ol>

<a id="subsection-a"></a>
### Problembeschreibung

Berechnung der Ausgabe eines einfachen Neurons.

<a id="subsection-b"></a>
### Schritte

<ol>
  <li><a href="#subsubsection-a">Festlegung der Neuronenparameter</a></li>
  <li><a href="#subsubsection-b">Festlegung des Eingangsvektors</a></li>
  <li><a href="#subsubsection-c">Berechnung der Neuronenausgabe</a></li>
  <li><a href="#subsubsection-d">Aufzeichnung der Neuronenausgabe über den Bereich der Eingaben</a></li>
</ol>

<a id="subsubsection-a"></a>
**1. Festlegung der Neuronenparameter**

Als Beispiel für ein Zwei-Eingabe-Perzeptron mit einem Neuron, wie in Abbildung 2 oben dargestellt, werden die folgenden Werte für die Gewichte und den Bias zugewiesen:

{% include codes/nn-parcel-rod/m2.html %}

Im Falle eines einzelnen Neurons ist die skalare Nettoeingabe $n$ für die Übertragungsfunktion $f$, die die skalare Neuronenausgabe $a$ erzeugt, gegeben durch:

$$n=\ \mathit{\mathbf{p}}*\ {\mathit{\mathbf{W}}}^T +b={\left[\begin{array}{cc}
p_1  & p_2 
\end{array}\right]}\cdot {\left[\begin{array}{cc}
4  & -2 
\end{array}\right]^{T}} -3=4p_1 -2p_2 -3$$

<a id="subsubsection-b"></a>
**2. Festlegung des Eingangsvektors**

{% include codes/nn-parcel-rod/m3.html %}


<a id="subsubsection-c"></a>
**3. Berechnung der Neuronenausgabe**

Der Ausgang dieses Netzes wird durch eine Übertragungsfunktion bestimmt, zum Beispiel die hyperbolische Tangens-Sigmoid-Übertragungsfunktion <code>tansig</code>.

{% include codes/nn-parcel-rod/m4.html %}

{% include codes/nn-parcel-rod/m5.html %}

<a id="subsubsection-d"></a>
**4. Aufzeichnung der Neuronenausgabe über den Bereich der Eingaben**

The above described neuron with a vector input could be illustrated in the input-output space by graphing the network output over range of input values for $p_1$ and $p_2$, as shown in <a href="#figure5">Figure 5</a>. For this purpose, the MATLAB function <code>meshgrid</code> is used here to create two matrices $p_1$ and $p_2$, each with a size of $101\times101$. The function <code>meshgrid</code> returns 2-D grid coordinates based on the coordinates contained in the assigned vector between the parentheses. $p_1$ is a matrix where each row is a copy of the assigned vector, and $p_2$ is a matrix where each column is a copy of the assigned vector.

To find the neuron output, the function is evaluated at the input values resulting, in this case, from the equation $4p_1 -2p_2 -3$.

The types of the inputs and outputs depend on the function, in this case: the hyperbolic tangent sigmoid transfer function <code>tansig</code>, which takes a matrix of net input column vector and returns a column vector matrix of the same size consisting of the elements of the input column vector where each element of it is squashed from the interval $[-inf \quad inf]$ to the interval $[-1 \quad 1]$ with an "S-shaped" curve.

To plot the inputs and outputs in a 3-D plot by using MATLAB function <code>plot3</code>, the inputs and the output matrices must have at least one dimension that is same size. However, here the input and output matrices don't have a same size dimension, thus, <code>reshape</code> function is used to reshape the output column vector <code>a</code> and return a reshaped array <code>a</code> of the size: $length\left(p_{1} \right) \times length\left(p_{2} \right)$. 

{% include codes/nn-parcel-rod/m6.html %}

<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure5.png" alt="Figure 5">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 5: Plot of neuron's inputs, outputs and decision boundary, in the input-output space</figcaption>
    </figure>
    </p>
</center>

The next lines of code shows the top-view of the input-output space plot, <a href="#figure6">Figure 6</a>, which is the input-space, where the intersection of the decision boundary with the transfer function curves is a line, similar to the linear separator previously illustrated in <a href="#figure4">Figure 4</a>.

{% include codes/nn-parcel-rod/m7.html %}

<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure6.png" alt="Figure 6">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 6: Decision boundary as seen in the input-space (top-view)</figcaption>
    </figure>
    </p>
</center>
