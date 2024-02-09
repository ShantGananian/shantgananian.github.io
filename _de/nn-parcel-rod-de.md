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
toc_label: "Inhaltsverzeichnis"
toc_icon: "cog"
toc_sticky: true

header:
  image: /assets/img/nn-parcel-rod/Figure28.jpg
  teaser: assets/img/nn-parcel-rod/Figure28.jpg
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

Die hard-limit Übertragungsfunktion (<code>hardlim</code>) gibt $0$ zurück, wenn der Wert kleiner als ein Schwellenwert ist, und $1$, wenn er größer oder gleich dem Schwellenwert ist, hier $-1,5$.

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

Zusammenfassend lässt sich sagen, dass das Ziel des Lernens in einem Perzeptron mit einem Ausgang im Allgemeinen darin besteht, die trennende Hyperebene (d.h. die lineare Entscheidungsgrenze), die einen $n$-dimensionalen "Eingaberaum" teilt, anzupassen, wobei $n$ die Anzahl der Nettoeingaben ist, indem die Gewichte und der Bias so lange verändert werden, bis sich alle Eingabevektoren mit dem Zielwert $1$ auf einer Seite der Hyperebene und alle Eingabevektoren mit dem Zielwert $0$ oder $-1$, je nach Aktivierungsfunktion, auf der anderen Seite der Hyperebene befinden. In einem Nework mit mehreren Neuronen ist $\textbf{W}$ eine Matrix, die aus einer Reihe von Zeilenvektoren besteht, von denen jeder in einer Gleichung ähnlich der obigen verwendet wird. Für jede Zeile von $\textbf{W}$ gibt es eine Begrenzung.

Die Schlüsseleigenschaft des Ein-Neuronen-Perzeptrons ist daher, dass es Eingangsvektoren in zwei Kategorien trennen kann. Da die Grenze linear ist, kann das einschichtige Perzeptron nur zur Klassifizierung von Eingaben verwendet werden, die linear trennbar sind (durch eine lineare Grenze getrennt werden können).

Zur Definition eines Netzes sind die folgenden Problemspezifikationen hilfreich:

<ol>
  <li>Anzahl der Netzeingaben = Anzahl der Problemeingaben</li>
  <li>Anzahl der Neuronen in der Ausgabeschicht = Anzahl der Problemausgaben</li>
  <li>Die Wahl der Übertragungsfunktion der Ausgabeschicht wird zumindest teilweise durch die Problemstellung der Ausgänge bestimmt</li>
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

<ul style='list-style-type: none'>
    <li>
    $$
    n=\ \mathit{\mathbf{p}}*\ {\mathit{\mathbf{W}}}^T +b
    $$
    </li>
    <li>
    $$
    ={\left[\begin{array}{cc}
    p_1  & p_2 
    \end{array}\right]}\cdot {\left[\begin{array}{cc}
    4  & -2 
    \end{array}\right]^{T}} -3
    $$
    </li>
    <li>
    $$
    =4p_1 -2p_2 -3
    $$
    </li>
</ul>

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

Das oben beschriebene Neuron mit einer Vektoreingabe könnte im Eingabe-Ausgabe-Raum veranschaulicht werden, indem die Netzwerkausgabe über den Bereich der Eingabewerte für $p_1$ und $p_2$ grafisch dargestellt wird, wie in <a href="#figure5">Abbildung 5</a> gezeigt. Zu diesem Zweck wird hier die MATLAB-Funktion <code>meshgrid</code> verwendet, um zwei Matrizen $p_1$ und $p_2$ mit einer Größe von jeweils $101 \times 101$ zu erstellen. Die Funktion <code>meshgrid</code> gibt 2-D-Gitterkoordinaten zurück, die auf den Koordinaten basieren, die in dem zugewiesenen Vektor zwischen den Klammern enthalten sind. $p_1$ ist eine Matrix, bei der jede Zeile eine Kopie des zugeordneten Vektors ist, und $p_2$ ist eine Matrix, bei der jede Spalte eine Kopie des zugeordneten Vektors ist.

Um den Ausgang des Neurons zu finden, wird die Funktion mit den Eingangswerten ausgewertet, die sich in diesem Fall aus der Gleichung $4p_1 -2p_2 -3$ ergeben.

Die Art der Ein- und Ausgänge hängt von der Funktion ab, in diesem Fall von der Hyperbeltangens-Sigmoid-Transferfunktion <code>tansig</code>, die eine Matrix von Nettoeingabe-Spaltenvektoren annimmt und eine Spaltenvektor-Matrix derselben Größe zurückgibt, die aus den Elementen des Eingabe-Spaltenvektors besteht, wobei jedes Element aus dem Intervall $[-inf \quad inf]$ in das Intervall $[-1 \quad 1]$ mit einer "S-förmigen" Kurve gequetscht wird.

Um die Ein- und Ausgänge mit der MATLAB-Funktion <code>plot3</code> in einem 3-D-Diagramm darzustellen, müssen die Ein- und Ausgabematrizen mindestens eine gleich große Dimension haben. In diesem Fall haben die Eingabe- und Ausgabematrizen jedoch keine gleich große Dimension. Daher wird die Funktion <code>reshape</code> verwendet, um den Ausgabespaltenvektor <code>a</code> umzuformen und ein umgestaltetes Array <code>a</code> mit der folgenden Größe zurückzugeben: $length\left(p_{1} \right) \times length\left(p_{2} \right)$.

{% include codes/nn-parcel-rod/m6.html %}

<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure5.png" alt="Figure 5">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 5: Darstellung der Eingänge, der Ausgänge und der Entscheidungsgrenze des Neurons im Eingabe-Ausgabe-Raum</figcaption>
    </figure>
    </p>
</center>

The next lines of code shows the top-view of the input-output space plot, <a href="#figure6">Figure 6</a>, which is the input-space, where the intersection of the decision boundary with the transfer function curves is a line, similar to the linear separator previously illustrated in <a href="#figure4">Figure 4</a>.

Die nächsten Codezeilen zeigen die Draufsicht auf den Eingabe-Ausgabe-Raum, <a href="#figure6">Abbildung 6</a>, d. h. den Eingaberaum, in dem der Schnittpunkt der Entscheidungsgrenze mit den Übertragungsfunktionskurven eine Linie ist, ähnlich der linearen Trennlinie, die zuvor in <a href="#figure4">Abbildung 4</a> dargestellt wurde.

{% include codes/nn-parcel-rod/m7.html %}

<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure6.png" alt="Figure 6">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 6: Entscheidungsgrenze aus Sicht des Eingaberaums (Draufsicht)</figcaption>
    </figure>
    </p>
</center>

<a id="section-c"></a>
## Mehrfach-Neuronen-Perzeptron

Wie bereits erwähnt, hat jedes Neuron eine einzige Entscheidungsgrenze. Ein Perzeptron mit nur einem Neuron kann Eingabevektoren in zwei Kategorien klassifizieren, da seine Ausgabe entweder $0$ oder $1$ sein kann. Ein Perzeptron mit mehreren Neuronen kann die Eingaben in viele Kategorien einteilen. Jede Kategorie wird durch einen anderen Ausgabevektor repräsentiert. Da jedes Element des Ausgabevektors entweder $0$ oder $1$ sein kann, gibt es insgesamt $2^S$ mögliche Kategorien, wobei $S$ die Anzahl der Neuronen ist. Bei einem Perzeptron mit mehreren Neuronen wird die Entscheidungsgrenze für jedes Neuron $i$ wie folgt definiert:

$$_{i}\mathbf{w}^{T}\cdot \textbf{P} + \mathit{b}_{i}= 0$$

<a id="section-d"></a>
## Perzeptron-Lernregel

Unter Lernregel versteht man ein Verfahren (einen Algorithmus) zur Änderung der Gewichte und Bias eines Netzes. (Dieses Verfahren wird auch als Trainingsalgorithmus bezeichnet). Der Zweck der Lernregel besteht darin, das Netz auf eine bestimmte Aufgabe zu trainieren, z. B. auf die Lösung eines Klassifizierungsproblems. Es gibt viele Arten von Trainingsalgorithmen (Lernregeln) für neuronale Netze. Sie lassen sich in drei große Kategorien einteilen: überwachtes Lernen, unüberwachtes Lernen und verstärkendes (oder abgestuftes) Lernen.

Beim ***überwachten Lernen*** wird die Lernregel mit einer Reihe von Beispielen (der Trainingsmenge) für das richtige Verhalten des Netzes (Eingaben und deren Zielausgaben) versorgt:

$$\left\{ \textbf{p}_{1}, \textbf{t}_{1} \right\}, \left\{ \textbf{p}_{2}, \textbf{t}_{2} \right\}, ..., \left\{ \textbf{p}_{q}, \textbf{t}_{q} \right\},$$

wobei $\textbf{p}_q$ eine Eingabe für das Netz und $\textbf{t}_q$ die entsprechende korrekte (Ziel-)Ausgabe ist. Während die Eingaben auf das Netz angewendet werden, werden die Netzausgaben mit den Zielwerten verglichen. Die Lernregel wird dann verwendet, um die Gewichte und Bias des Netzes anzupassen, um die Netzausgänge näher an die Ziele zu bringen.

***Verstärkungslernen*** ähnelt dem überwachten Lernen, mit dem Unterschied, dass der Algorithmus nicht für jede Netzwerkeingabe die richtige Ausgabe erhält, sondern nur eine Bewertung. Die Bewertung (oder Punktzahl) ist ein Maß für die Leistung des Netzes über eine Reihe von Eingaben.

Beim ***unüberwachten Lernen*** werden die Gewichte und Bias nur in Reaktion auf die Eingaben des Netzes geändert. Es sind keine Zielausgaben verfügbar.

Um mit dem Training zu beginnen und die Lernregeln zu erstellen, werden einige Anfangswerte für die Netzwerkparameter (Gewichte und Bias) zugewiesen. Dann werden dem Netz die Eingangsvektoren nacheinander vorgelegt. Jedes Mal, wenn das Netz nicht den richtigen Wert liefert (die Zielausgabe, die mit der Eingabe verbunden ist), wird der Gewichtsvektor so verändert, dass er mehr in Richtung des Eingabevektors zeigt. Wenn das Netz den richtigen Wert liefert, muss nichts geändert werden. Auf diese Weise wird ein einziger Ausdruck gefunden, der einer einheitlichen Lernregel ähnelt. Hierfür wird zunächst eine neue Variable definiert, der Perzeptron-Fehler $e$:

$$e = t - a$$

wobei $e$ der falsche Ausgabewert (auch Fehler genannt) ist. Er ist gleich $0$, wenn das Netz die richtige Ausgabe $(t=a)$ liefert. Auf diese Weise lautet die einheitliche Lernregel für Perzeptronen mit mehreren Neuronen in Matrixschreibweise:

$$\textbf{W}^{new} =\textbf{W}^{old} + \textbf{e}\cdot \textbf{P}^{T}$$

und

$$\textbf{b}^{new} =\textbf{b}^{old} + \textbf{e}$$

Obwohl die Perzeptron-Lernregel einfach ist, ist sie sehr leistungsfähig. Sie wird immer zu Gewichten konvergieren, die die gewünschte Klassifizierung erreichen (vorausgesetzt, dass solche Gewichte existieren).

<a id="section-e"></a>
## Ein anschauliches Beispiel 

Das folgende Beispiel soll zeigen, wie die in den vorangegangenen Abschnitten beschriebenen Architekturen zur Lösung eines einfachen praktischen Problems - eines Mustererkennungsproblems - verwendet werden können, indem drei verschiedene neuronale Netzarchitekturen eingesetzt werden: ein einschichtiges Perzeptron (Feedforward-Netz) mit einer symmetrischen Hard-Limit-Übertragungsfunktion <code>hardlims</code>, ein Hamming-Netz (kompetitives Netz) und ein Hopfield-Netz (rekurrentes assoziatives Speichernetz).

<a id="subsection-a"></a>
### Problembeschreibung

Eine zentrale Bearbeitungsstation verfügt über eine Paketsortiermaschine, die mit Hilfe von Scan-, Volumen- und Wiegetechniken Pakete identifizieren und genau profilieren kann, wie in <a href="#figure7">Abbildung 7</a> dargestellt. Wenn die Pakete eine zentrale Bearbeitungsstation erreichen, können verschiedene Arten von Paketen miteinander vermischt sein. Ziel ist es, die Pakete nach ihrer Art zu sortieren. Es gibt ein Förderband, auf das die Pakete geladen werden. Dieses Förderband durchläuft eine Reihe von Sensoren, die drei Eigenschaften des Pakets messen: ***Größe***, ***Form*** und ***Gewicht***. Es wird angenommen, dass diese Sensoren zwei Werte $1$ und $-1$ ausgeben werden. Der Größensensor gibt einen Wert von $1$ aus, wenn es sich um ein mittelgroßes Paket handelt, und einen Wert von $-1$, wenn es sich um ein Paket handelt. Der Formsensor gibt einen Wert von $1$ aus, wenn das Paket ungefähr rund ist, und einen Wert von $-1$, wenn es eher rechteckig ist. Der Gewichtssensor gibt eine $1$ aus, wenn das Paket mehr als $10$ Kilogramm wiegt, und eine $-1$, wenn das Paket gleich oder weniger als $10$ Kilogramm wiegt.

Die drei Sensorausgänge werden dann in ein neuronales Netz eingegeben. Der Zweck des Netzes ist es, zu entscheiden, welche Art von Paket sich auf dem Förderband befindet, damit das Paket in die richtige Richtung geleitet werden kann. Um das Problem noch weiter zu vereinfachen, wird angenommen, dass sich nur zwei Arten von Paketen auf dem Förderband befinden: **Typ A** (mittelgroß, rechteckig, schwerer als 10 Kilogramm) und **Typ B** (Paket, rechteckig, gleich oder weniger als 10 Kilogramm).

<center>
    <p>
    <figure id="figure7" style='display: table; width: 100%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure7de.png" alt="Figure 7">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 7: Paketsortiermaschine</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-b"></a>
### Ziele

<ol>
  <li><a href="#subsubsection-e">Entwurf eines Perzeptrons (Feedforward-Netzwerk) zur Erkennung von Mustern</a></li>
  <li><a href="#subsubsection-f">Bestimmung und Skizzierung einer Entscheidungsgrenze für das Perzeptron-Netz, das diese prototypischen Muster erkennen soll.</a></li>
  <li><a href="#subsubsection-g">Bestimmung von Gewichten und Bias, die zu dieser Entscheidungsgrenze führen</a></li>
  <li><a href="#subsubsection-h">Entwurf eines Hamming-Netzes (Wettbewerbsnetz) zur Erkennung dieser Muster</a></li>
  <li><a href="#subsubsection-i">Entwurf eines Hopfield-Netzes (rekurrentes assoziatives Speichernetz) zur Erkennung dieser Muster</a></li>
</ol>

<a id="subsection-c"></a>
### Lösung

<a id="subsubsection-e"></a>
**1. Entwurf eines Perzeptrons (Feedforward-Netzwerk) zur Erkennung von Mustern**

Da jedes Paket die Sensoren durchläuft, kann es durch einen dreidimensionalen Vektor dargestellt werden. Das erste Element des Vektors steht für die Größe, das zweite Element für die Form und das dritte Element für das Gewicht:

$$
\textbf{p} = \left[\matrix{ p_1\cr p_2\cr p_3} \right] = \left[\matrix{ size \cr shape \cr weight} \right]
$$

Ein Prototyp vom **Typ A** würde also durch den Vektor dargestellt:

$$
\textbf{p}_{\textbf{1}} = \left[\matrix{ 1\cr -1\cr 1} \right]
$$

und ein **Typ B**-Prototyp würde durch den Vektor dargestellt werden:

$$
\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]
$$

Das neuronale Netz erhält für jedes Paket auf dem Förderband einen dreidimensionalen Eingangsvektor und muss entscheiden, ob das Paket vom Typ A $(\textbf{p}_1)$ oder vom Typ B $(\textbf{p}_2)$ ist.

Da es nur zwei Kategorien gibt, können wir ein Perzeptron mit einem einzigen Neuron verwenden. Die Vektoreingaben sind dreidimensional $(R=3)$, daher lautet die Gleichung des Perzeptrons:

$$
a = hardlims\left[ \left[\matrix{ w_{1,1} & w_{1,2} & w_{1,3}} \right] \cdot \left[\matrix{ p_1\cr p_2\cr p_3} \right]+b \right] 
$$

<a id="subsubsection-f"></a>
**2. Bestimmung und Skizzierung einer Entscheidungsgrenze**

Der Bias und die Elemente der Gewichtsmatrix werden so gewählt, dass das Perzeptron in der Lage ist, zwischen Parzellen des Typs A und des Typs B zu unterscheiden. Das Perzeptron wird beispielsweise so konfiguriert, dass die Ausgabe $1$ beträgt, wenn eine Parzelle des Typs A eingegeben wird, und $-1$, wenn eine Parzelle des Typs B eingegeben wird. Unter Verwendung des in <a href="#figure4">Abbildung 4</a> dargestellten Konzepts gibt es eine lineare Grenze, die Parzellen vom Typ A und Parzellen vom Typ B trennen kann. Die beiden Prototyp-Vektoren sind in den nächsten beiden Diagrammen, <a href="#figure8">Abbildung 8</a> und <a href="#figure9">Abbildung 9</a>, dargestellt. Die Abbildungen zeigen die lineare Grenze, die diese beiden Vektoren symmetrisch trennt, nämlich die Ebene $p_2, p_3$.

In MATLAB:

{% include codes/nn-parcel-rod/m8.html %}

Der MATLAB-Code für die benutzerdefinierte Funktion <code>viewProtypeVect</code>, die im vorherigen Code zur Darstellung beider Ansichten verwendet wurde, ist wie folgt:

{% include codes/nn-parcel-rod/m9.html %}

<center>
    <p>
    <figure id="figure8" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure8.png" alt="Figure 8">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 8: 3-D-Ansicht der Prototyp-Vektoren und der Entscheidungsgrenze</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure9" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure9.png" alt="Figure 9">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 9: 2-D-Ansicht der Prototyp-Vektoren und der Entscheidungsgrenze (Draufsicht)</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-g"></a>
**3. Bestimmung von Gewichten und Bias, die zu dieser Entscheidungsgrenze führen**

Die Ebene $p_2, p_3$, die Entscheidungsgrenze, kann durch die folgende Gleichung beschrieben werden:

$$
p_1 =0
$$

oder

$$
\left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ p_1\cr p_2\cr p_3} \right]+0 = 0 
$$

Daher lauten die Gewichtungsmatrix und der Bias:

$$
\textbf{W} = \left[\matrix{ 1 & 0 & 0} \right] ,\quad b = 0
$$

Die Gewichtsmatrix ist orthogonal zur Entscheidungsgrenze und zeigt in Richtung der Region, die das Prototypmuster Typ A enthält, für das das Perzeptron eine Ausgabe von 1 erzeugen soll. Der Bias ist 0, da die Entscheidungsgrenze durch den Ursprung verläuft.

Die Prüfung der Funktionsweise des Perzeptron-Musterklassifikators zeigt, dass er Typ A und Typ B korrekt klassifiziert:

- Pakete des Typs A (mittelgroß, rechteckig, schwerer als 10 Kilogramm):

$$
a = hardlims\left[ \left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ 1\cr -1\cr 1} \right]+0\right] = 1
$$

- Paket des Typs B (Paket, rechteckig, bis 10 Kilogramm):

$$
a = hardlims\left[ \left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ -1\cr -1\cr -1} \right]+0\right] = -1
$$

Wenn jedoch ein nicht so perfektes Paket des Typs B in den Klassifikator eingegeben wird, wird beispielsweise ein Paket des Typs B, das eher rund ist, durch die Sensoren geleitet. Der Eingabevektor würde dann sein:

$$
\textbf{p} = \left[\matrix{ -1\cr 1\cr -1} \right]
$$

Die Antwort des Netzes wäre vom Typ B:

$$
a = hardlims\left[ \left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ -1\cr 1\cr -1} \right]+0\right] = -1
$$

In der Tat wird jeder Eingangsvektor, der näher am Prototyp-Vektor vom Typ B als am Prototyp-Vektor vom Typ A (im euklidischen Abstand) liegt, als Typ B eingestuft (und umgekehrt).

In MATLAB könnte dieser Perzeptron-Entwurf folgendermaßen kodiert werden:

{% include codes/nn-parcel-rod/m10.html %}

was zu der folgenden Ausgabe führt:

{% include codes/nn-parcel-rod/m11.html %}

<a id="subsubsection-h"></a>
**4. Hamming-Netzwerk**

Das Hamming-Netz wurde ausdrücklich zur Lösung von binären Mustererkennungsproblemen entwickelt, bei denen jedes Element des Eingangsvektors nur zwei mögliche Werte $1$ oder $0$ hat, sowie zur Lösung eines bipolaren Mustererkennungsproblems, wie in diesem Beispiel, bei dem die Elemente des Eingangsvektors die Werte $1$ oder $-1$ haben. Das Hamming-Netzwerk ist ein Clusternetzwerk. Es basiert auf der Verwendung von festen Prototyp-Vektoren (Exemplaren) und einer rekurrenten Schicht.

Das Hamming-Netz besteht aus zwei Arten von Schichten:

- **Feedforward**-Schicht, eine **Korrelationsschicht**, bei der alle Neuronen mit allen Eingängen des Netzes verbunden sind;
- **rekurrente** Schicht (Backpropagation), eine **kompetitive** Schicht, bei der der Ausgang jedes Neurons mit genau einem Neuron der Eingangsschicht verbunden ist.

Einige Quellen nennen die Feedforward-Schicht als Hamming-Netz, das misst, wie sehr der Eingangsvektor dem Gewichtsvektor jedes Neurons ähnelt, und die rekurrente oder Backpropagation-Schicht wie MAXNET; ein neuronales Netz, das auf Wettbewerb basiert und als Teilnetz verwendet werden kann, um das Neuron auszuwählen, dessen Aktivierung am größten ist.

Im Hamming-Netz ist die Anzahl der Neuronen $S$ in der ersten (Feedforward-) Schicht gleich der Anzahl der Neuronen in der zweiten (Feedback-) Schicht und entspricht der Anzahl der Prototypmuster (in diesem Beispiel $S = 2$). Rekurrente Netze können ein zeitliches Verhalten aufweisen.

Bei jeder Eingabe ermittelt die Feedforward-Schicht über das Punktprodukt den Abstand zwischen dem Gewichtsvektor jedes Neurons, also dem Prototypvektor, und dem Eingabevektor, während die rekurrente Schicht, d.h. MAXNET, das Neuron mit dem größten Punktprodukt auswählt. Auf diese Weise wählt das gesamte Netz das Neuron, d.h. den Prototypvektor, dessen Gewichtsvektor dem Eingangsvektor am nächsten liegt, d.h. den Gewinner.

Auf diese Weise besteht das Ziel des Hamming-Netzes darin, zu entscheiden, welcher Prototyp-Vektor dem Eingangsvektor am ähnlichsten ist. Diese Entscheidung wird durch den Ausgang der rekurrenten Schicht angezeigt. In der rekurrenten Schicht gibt es ein Neuron für jedes Prototypmuster. Wenn die rekurrente Schicht konvergiert, gibt es nur noch ein Neuron mit einer Ausgabe ungleich Null. Dieses Neuron zeigt das Prototypmuster an, das dem Eingabevektor am ähnlichsten ist.

Die **Feedforward**-Schicht führt eine **Korrelation** oder ein inneres Produkt zwischen jedem der Prototypmuster und dem Eingabemuster durch. Dazu werden die Zeilen der Gewichtsmatrix in der Feedforward-Schicht, die durch die Verbindungsmatrix ${\mathbf{W}}^1$ der Größe $S\times R$ (hier $2\times 3$) repräsentiert wird, auf die Prototypenmuster $$\textbf{p}_{\textbf{1}}$$ und $$\textbf{p}_{\textbf{2}}$$ gesetzt. $R$ ist die Anzahl der Elemente im Eingabevektor (hier $R = 3$).

Für dieses anschauliche Beispiel würde dies bedeuten:

$$
\textbf{W}^{1} = \left[\matrix{ \textbf{p}_{1}^{T}\cr \textbf{p}_{2}^{T}} \right] = \left[\matrix{ 1 &-1& 1\cr -1 &-1 &-1} \right]
$$

  Anmerkung: Die hochgestellten Zahlen geben die Nummer der Schicht an.

Die Feedforward-Schicht verwendet eine lineare Übertragungsfunktion, und jedes Element des Bias-Vektors ist gleich $R$. Der Bias-Vektor würde also sein:

$$
\textbf{b}^{1} = \left[\matrix{ R\cr R} \right] = \left[\matrix{ 3\cr 3} \right] 
$$

Mit dieser Wahl für die Gewichtsmatrix und den Bias-Vektor ist die Ausgabe der Feedforward-Schicht gleich den Punktprodukten (auch innere Produkte genannt) jedes Prototypmusters mit der Eingabe, plus $R$.

$$
\textbf{a}^{1} = \textbf{W}^{1}\textbf{p}+ \textbf{b}^{1}=\left[\matrix{ \textbf{p}_{1}^{T}\cr \textbf{p}_{2}^{T}} \right]\textbf{p}+ \left[\matrix{ 3\cr 3} \right]  =\left[\matrix{ \textbf{p}_{1}^{T}\textbf{p}+3\cr \textbf{p}_{2}^{T}\textbf{p}+3} \right]
$$

Das liegt daran, dass bei zwei Vektoren gleicher Länge (Betrag oder Norm) ihr Punktprodukt am größten ist, wenn die Vektoren in dieselbe Richtung zeigen (der Kosinus des Winkels zwischen ihnen ist gleich $1$), und am kleinsten, wenn sie in entgegengesetzte Richtungen zeigen (der Kosinus des Winkels zwischen ihnen ist gleich $-1$). Um zu gewährleisten, dass die Ausgänge der Feedforward-Schicht niemals negativ sind, wird außerdem $R$ zum Punktprodukt addiert. Dies ist für das ordnungsgemäße Funktionieren der rekurrenten Schicht erforderlich.

Die Ausgabe ist hier eine $S\times 1$-Spaltenvektormatrix und kein Skalar, wie es bei dem Netz mit einem Neuron der Fall war.

Dieses Netz wird Hamming-Netz genannt, weil das Neuron in der Feedforward-Schicht mit der größten Ausgabe dem Prototypmuster entspricht, das dem Eingabemuster in der **Hamming-Distanz** am ähnlichsten ist. Die Hamming-Distanz ist definitionsgemäß der Abstand zwischen zwei binären (oder bipolaren) Vektoren gleicher Länge, der der Anzahl der Elemente zwischen den beiden Vektoren entspricht, die sich unterscheiden. Das Feedforward-Netz wählt das Prototypmuster (den Gewichtsvektor) aus, das eine minimale Hamming-Distanz ergibt (d. h. das Prototypmuster, das dem Eingabemuster in der Hamming-Distanz am ähnlichsten ist). Mit anderen Worten: Es wird gemessen, wie sehr der Eingangsvektor dem Gewichtsvektor jedes Neurons ähnelt.

Zum Beispiel ist der Hamming-Abstand zwischen den Vektoren $$\textbf{p}_{\textbf{1}} =\left[\matrix{ 1\cr -1\cr 1} \right]$$ und $$\textbf{p} = \left[\matrix{ 1\cr 1\cr 1} \right]$$ gleich $1$, da sie sich an einer Stelle unterscheiden. In ähnlicher Weise ist der Hamming-Abstand zwischen $$\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]$$ und $$\textbf{p} = \left[\matrix{ 1\cr 1\cr 1} \right]$$ gleich $3$, da sie sich an drei Stellen unterscheiden.

Die Ausgabe der Feedforward-Schicht wäre:

$$
\text{a}^{1} =
\left[
\left[\matrix{ 1 &-1& 1\cr -1 &-1 &-1} \right] \cdot \left[\matrix{1 \cr 1 \cr 1}\right]+ \left[\matrix{ 3\cr 3} \right]  \right]
$$
$$
= \left[\matrix{ 1\cr -3}\right] +\left[\matrix{ 3\cr 3}\right] = \left[\matrix{ 4\cr 0}
\right]
$$

könnte dies folgendermaßen geschrieben werden:

$$
\text{a}^{1} = \left[\matrix{ 4\cr 0} \right] = \left [\matrix{ 2*(3-1)\cr 2*(3-3)}
\right]
$$
$$
= 2 * \left [\matrix{ 3-1\cr 3-3}\right] = 2 * \left [\matrix{ R-1\cr R-3}
\right]
$$

Die Ausgänge der Feedforward-Schicht sind somit gleich $2R$ minus der doppelten Hamming-Distanz zwischen den Prototypmustern und dem Eingabemuster.

Die **rekurrente** Schicht des Hamming-Netzes ist eine so genannte **kompetitive** Schicht. Die Neuronen in dieser Schicht werden mit den Ausgaben der Feedforward-Schicht initialisiert, die die Korrelation zwischen den Prototyp-Mustern und dem Eingangsvektor angeben. Dann treten die Neuronen gegeneinander an, um einen Gewinner zu ermitteln. Nach Abschluss des Wettbewerbs hat nur ein Neuron (der Gewinner) in der Gruppe eine Ausgabe ungleich Null. Diese extremste Form des Wettbewerbs zwischen einer Gruppe von Neuronen wird Winner-Take-All genannt. Das siegreiche Neuron gibt an, welche Kategorie von Eingaben dem Netzwerk präsentiert wurde.

Die rekurrente Schicht hat $S$ Neuronen, die vollständig miteinander verbunden sind. Jedes Neuron ist mit jedem anderen Neuron in der Schicht verbunden, auch mit sich selbst. Die von den Neuronen verwendete Übertragungsfunktion ist die <code>poslin</code>-Übertragungsfunktion, eine positiv-lineare Funktion, die für positive Werte linear und für negative Werte null ist.

Die Gewichte der rekurrenten Schicht sind symmetrisch, fest und werden durch folgende Formel angegeben:

$$
w_{ij}= \left\{ \begin{array}{cl}
1 & : \ i =  j \\
-\epsilon & : \ i \neq  j
\end{array} \right.
$$

wobei $$\epsilon$$ eine vorgegebene positive Konstante ist. Sie muss positiv und kleiner als $1$ sein.  Die diagonalen Terme in der Gewichtsmatrix zeigen an, dass jedes Neuron mit sich selbst mit einem positiven Gewicht von $1$ verbunden ist, was Selbstförderung bedeutet. Die Terme außerhalb der Diagonalen, $$-\epsilon$$, sind negativ und stellen somit eine Hemmung dar.

In diesem anschaulichen Beispiel hat die Gewichtsmatrix die Form:

$$
\textbf{W}^{2}=\left[ \matrix{
1 &  -\epsilon \cr
 -\epsilon& 1} \right]
$$

Eine gute Wahl von $$\epsilon$$ wäre eine, die schnelle Konvergenz bietet.

Die Gleichungen, die den Wettbewerb beschreiben, sind:

$$
\textbf{a}^{2}(0) =\textbf{a}^{1}
$$

wobei $$\textbf{a}^{2}(0)$$, eine $S\times 1$-Spaltenvektormatrix, die Anfangsbedingung ist; die Ausgabe der rekurrenten Schicht (Schicht $2$) zum Zeitpunkt $t = 0$, die $$\text{a}^{1}$$ der Ausgabe der Feedforward-Schicht (Schicht $1$) entspricht. Dann werden die zukünftigen Ausgaben des Netzes aus den vorherigen Ausgaben berechnet:

$$
\textbf{a}^{2}(t+1) = \textbf{poslin}(\textbf{W}^{2}\textbf{a}^{2}(t))
$$

wobei $$\textbf{a}^{2}(t)$$, $S\times 1$ Spaltenvektormatrix, die Ausgabe der rekurrenten Schicht zum Zeitpunkt (oder Iteration) $t = 1, 2, 3...$ ist.

$$
\Rightarrow \textbf{a}^{2}(t+1) =  \textbf{poslin}\left(\textbf{n}^{2}(t+1)\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{
1 &  -\epsilon \cr
 -\epsilon& 1} \right]\textbf{a}^{2}(t)\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{
1 &  -\epsilon \cr -\epsilon& 1} \right] \cdot \left[ \matrix{a_{1}^{2}(t) \cr a_{2}^{2}(t)} \right]\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{a_{1}^{2}(t)   -\epsilon \ast a_{2}^{2}(t) \cr
 -\epsilon \ast a_{1}^{2}(t)+ a_{2}^{2}(t)} \right]\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{a_{1}^{2}(t)   -\epsilon \ast a_{2}^{2}(t) \cr
 a_{2}^{2}(t)-\epsilon \ast a_{1}^{2}(t)} \right]\right)
$$

Das bedeutet, dass bei jeder Iteration in der rekurrenten Schicht und für ein gegebenes Neuron $i = 1,...,S$ jedes Ausgabeelement $$a_{i}^{2}(t)$$ um den gleichen Anteil des anderen Neurons $j$ reduziert wird; d.h. $$-\epsilon \ast a_{j}^{2}(t)$$.

Im Allgemeinen ist die Nettoeingabe $$\text{n}_{i}^{2}(t)$$, die das Neuron zum Zeitpunkt $t$ in seine Aktivierungsfunktion erhält:

$$
\text{n}_{i}^{2}(t) = \text{a}_{i}^{2}(t-1) - \epsilon\sum_{j\neq i}^{S}a_{j}^{2}(t-1)
$$

und

$$
\text{a}_{i}^{2}(t) =  \textbf{poslin}\left(\text{n}_{i}^{2}(t)\right)
$$

Dabei wird davon ausgegangen, dass nur ein Neuron, nicht aber zwei oder mehr Neuronen, denselben maximalen Ausgabewert (d.h. seinen Aktivierungswert aufgrund der Aktivierungsfunktion) haben können. Da die Ausgänge (Aktivierungen) aufgrund der <code>poslin</code>-Aktivierungsfunktion alle nicht-negativ sind, ist es klar, dass für alle $i$: $$\text{n}_{i}^{2}(t)\le \text{a}_{i}^{2}(t-1)$$, und so wie die rekurrente Schicht iteriert, nehmen die Aktivierungswerte aller Neuronen ab. Je kleiner jedoch ihre Aktivierungen sind, desto stärker nehmen sie ab. Bei der Iteration der rekurrenten Schicht werden die Neuronen mit den kleinsten Nettoeingaben $$\text{n}_{i}^{2}(t)$$ zuerst ins Negative getrieben, d.h. das größere Element wird um weniger und das kleinere Element um mehr reduziert, so dass die Differenz zwischen groß und klein größer wird. Die Übertragungsfunktionen der Neuronen ergeben dann Nullwerte für ihre Aktivierungen. Sobald eine Aktivierung auf Null gesetzt wird, bleibt sie bei den folgenden Iterationen auf Null. Bis schließlich die Aktivierungen aller Neuronen bis auf eine, die des Gewinners, auf Null gesetzt werden. Die Aktivierung des Gewinners nimmt dann nicht mehr weiter ab. Die rekurrente Schicht bewirkt, dass alle Neuronenausgänge auf Null gesetzt werden, mit Ausnahme des Neurons mit dem größten Ausgabewert (der dem Prototypmuster entspricht, das der Eingabe in der Hamming-Distanz am nächsten ist).

Die Frage ist, wie groß der Wert für $$\epsilon$$ sein kann, um eine schnelle Konvergenz zu erreichen.
 - $\epsilon$ zu klein: braucht zu lange, um zu konvergieren (mehr Iterationen erforderlich)
 - $\epsilon$ zu groß: kann das gesamte Netzwerk unterdrücken (es kann kein Gewinner gefunden werden, da alle Aktivierungen in einem einzigen Schritt auf Null gefahren werden)

Die schnellste Konvergenz kann erreicht werden, wenn ein $\epsilon$ so gewählt werden kann, dass die Aktivierungen aller Neuronen außer dem Gewinnerneuron in einer Iteration auf Null gefahren werden. *Wenn bekannt* ist, dass z.B. das Neuron $k$ den größten Endoutput $$a_{k}^{2}$$ hat, dann wählt man $\epsilon$ etwas kleiner als $$\epsilon_{max}$$:

$$
\epsilon_{max} = \frac{a_{k}^{2}(t)}{\sum_{j\neq k}^{S}a_{j}^{2}(t)} = \frac{1}{\sum_{j\neq k}^{S}\frac{a_{j}^{2}(t)}{a_{k}^{2}(t)}}
$$

dann wird in einer *einzigen Iteration* (zum Zeitpunkt $t$) die Nettoeingabe $$\text{n}_{k}^{2}(t)$$ nur geringfügig größer als Null und daher wird ihre Aktivierung $$\text{a}_{k}^{2}(t)$$ durch die Übertragungsfunktion <code>poslin</code> nur geringfügig größer als Null sein. Das bedeutet, dass alle anderen $$n_{i}^{2}(t)$$ negativ werden und somit ihre Aktivierungswerte $$a_{i}^{2}(t)$$ zu Null werden. Es ist jedoch nicht bekannt, welches der Neuronen die größte Aktivierung hat, und somit ist auch nicht bekannt, wie groß $$\epsilon_{max}$$ ist. Deshalb wird $$\epsilon_{max}$$ durch eine kleinere Zahl ersetzt und die rekurrente Schicht wird einige Male iteriert, bevor sie konvergiert. Diese kleinere Zahl ergibt sich aus der obigen Gleichung, indem der Nenner durch eine größere Zahl ersetzt wird.

Anhand praktischer Beispiele konnte festgestellt werden, dass:

$$
\frac{a_{j}^{2}(0)}{a_{k}^{2}(0)}\le 1
$$

mit $$j = 1,..,S \neq k$$ und durch die Wahl des Falles $$ \frac{a_{j}^{2}(0)}{a_{k}^{2}(0)}= 1$$ wird der Nenner in der vorherigen Gleichung zu $$\sum_{j\neq k}^{S}\frac{a_{j}^{2}(0)}{a_{k}^{2}(0)} = S-1$$. Damit ist $$\epsilon$$ gewählt:

$$
\epsilon\lt \frac{1}{S-1}
$$

und dies führt zu einer etwas schnelleren Konvergenz, insbesondere wenn $S$ nicht zu groß ist.

Zur Veranschaulichung der Funktionsweise des Hamming-Netzes werden die beiden Prototyp-Muster betrachtet; **Typ A**, bei dem $$\textbf{p}_{\textbf{1}} = \left[\matrix{ 1\cr -1\cr 1} \right]$$ und **Typ B**, bei dem $$\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]$$, ein Eingabemuster $$\textbf{p} = \left[\matrix{ -1\cr 1\cr -1} \right]$$ und unter Verwendung einer linearen Übertragungsfunktion wäre die Ausgabe der Feedforward-Schicht:

$$
\text{a}^{1} =
\left[
\left[\matrix{ 1 &-1& 1\cr -1 &-1 &-1} \right] \cdot \left[\matrix{-1 \cr 1 \cr -1}\right]+ \left[\matrix{ 3\cr 3} \right]  \right]
$$
$$
= \left[\matrix{ -3\cr 1}\right] +\left[\matrix{ 3\cr 3}\right] = \left[\matrix{ 0\cr 4}
\right]
$$

die dann zur Ausgabebedingung für die rekurrente Schicht wird.

Die Gewichtsmatrix für die rekurrente Schicht wird durch die folgende Gleichung gegeben:

$$
\textbf{W}^{2}=\left[ \matrix{
1 &  -\epsilon \cr
 -\epsilon& 1} \right]
$$

wobei:

$$
\epsilon\lt  \frac{1}{S-1} \Rightarrow \epsilon\lt \frac{1}{2-1} \Rightarrow \epsilon\lt 1
$$

Jede Zahl für $$\epsilon$$, die kleiner als $1$ ist, führt also zu einer schnelleren Konvergenz, zum Beispiel $$\epsilon = 0,5$$.

Die erste Iteration $(t=1)$ der rekurrenten Schicht ergibt:

$$
\textbf{a}^{2}(1) =  \textbf{poslin}\left(\textbf{W}^{2}\textbf{a}^{2}(0)\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{
1 &  -0.5 \cr -0.5& 1} \right] \cdot \left[ \matrix{0 \cr 4} \right]\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{-2 \cr 4} \right] \right)= \left[ \matrix{0 \cr 4} \right]
$$

Die zweite Iteration $(t=2)$ ergibt:

$$
\textbf{a}^{2}(2) =  \textbf{poslin}\left(\textbf{W}^{2}\textbf{a}^{2}(1)\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{
1 &  -0.5 \cr -0.5& 1} \right] \cdot \left[ \matrix{0 \cr 4} \right]\right)
$$

$$
= \textbf{poslin}\left(\left[ \matrix{-2 \cr 4} \right] \right)= \left[ \matrix{0 \cr 4} \right]
$$

Da die Ausgänge der aufeinanderfolgenden Iterationen das gleiche Ergebnis liefern, ist das Netz konvergiert. Prototyp Nummer zwei, das **Typ B**-Paket, wird als die korrekte Übereinstimmung ausgewählt, da Neuron Nummer zwei die einzige Ausgabe ungleich Null hat. Dies ist die richtige Wahl, da die Hamming-Distanz zwischen dem Prototyp vom Typ A und dem Eingabemuster $3$ und die Hamming-Distanz zwischen dem Prototyp vom Typ B und dem Eingabemuster $1$ beträgt.

Dieser Entwurf eines Hamming-Netzwerks kann in MATLAB wie folgt kodiert werden:

{% include codes/nn-parcel-rod/m12.html %}

was zu der folgenden Ausgabe führt:

{% include codes/nn-parcel-rod/m13.html %}

<a id="subsubsection-i"></a>
**5. Hopfield Netzwerk**

Das Hopfield-Netz ist ein **rekurrentes Netz**, das in mancher Hinsicht der rekurrenten Schicht des Hamming-Netzes ähnelt, aber effektiv die Operationen beider Schichten des Hamming-Netzes ausführen kann.

Es besteht aus $S$ Neuronen, was der Anzahl der Elemente im Eingabevektor entspricht. Die Neuronen werden mit dem Eingabevektor $p$ initialisiert, der eine $Sx1$-Spaltenvektormatrix ist:

$$
\textbf{a}(0) =\textbf{p}
$$

dann iteriert das Netzwerk so lange, bis die Ausgabe $\textbf{a}(t)$, ebenfalls eine $Sx1$-Spaltenvektormatrix, konvergiert, was zu einer Ausgabe führt, die einer der Prototyp-Vektoren sein sollte.

$$
\textbf{a}^{2}(t+1) = \textbf{satlins}(\textbf{W}\textbf{a}(t)+\textbf{b})
$$

wobei <code>satlins</code> die Übertragungsfunktion ist. Es handelt sich um eine sättigende lineare Übertragungsfunktion; sie ist im Bereich $[-1, 1]$ linear und sättigt bei $1$ für Eingaben größer als $1$ und bei $-1$ für Eingaben kleiner als $-1$.

Im Gegensatz zum Hamming-Netz, bei dem das Neuron ungleich Null anzeigt, welches Prototyp-Muster ausgewählt wird, produziert das Hopfield-Netz an seinem Ausgang tatsächlich das ausgewählte Prototyp-Muster.

Das Verfahren zur Berechnung der Gewichtsmatrix und des Bias-Vektors für das Hopfield-Netz ist komplexer als für das Hamming-Netz, bei dem die Gewichte in der Feedforward-Schicht die Prototypmuster sind.

Für dieses anschauliche Beispiel werden die Gewichtsmatrix und der Bias-Vektor so bestimmt, dass dieses spezielle Mustererkennungsproblem gelöst werden kann. Zum Beispiel könnten die folgenden Gewichte und Bias verwendet werden:

$$
\textbf{W}=\left[ \matrix{
1.2 &  0 & 0\cr
 0& 0.2&  0 \cr
 0& 0&  1.2} \right], \ \textbf{b}=\left[ \matrix{
0 \cr
 -0.9 \cr
 0} \right]
$$

Die Netzwerkausgabe muss entweder gegen das Muster **Typ A**, $$\textbf{p}_{\textbf{1}} = \left[\matrix{ 1\cr -1\cr 1} \right]$$, oder gegen das Muster **Typ B**, $$\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]$$, konvergieren. In beiden Mustern ist das zweite Element $-1$. Der Unterschied zwischen den Mustern besteht im ersten und dritten Element. Unabhängig davon, welches Muster in das Netz eingegeben wird, muss daher das zweite Element des Ausgabemusters gegen $-1$ konvergieren, während das erste und das dritte Element entweder gegen $1$ oder $-1$ konvergieren, je nachdem, was näher am ersten bzw. dritten Element des Eingangsvektors liegt.

Die Funktionsgleichungen des Hopfield-Netzes lauten unter Verwendung der oben genannten Parameter wie folgt:

$$
\text{a}_{1}(t+1) = \textbf{satlins}(1.2\text{a}_{1}(t))
$$

$$
\text{a}_{2}(t+1) = \textbf{satlins}(0.2\text{a}_{2}(t)-0.9)
$$

$$
\text{a}_{3}(t+1) = \textbf{satlins}(1.2\text{a}_{3}(t))
$$

Das bedeutet, dass unabhängig von den Anfangswerten, $\text{a}_{i}(0)$, das erste und das dritte Element mit einer Zahl größer als $1$ multipliziert werden. Wenn also der Anfangswert dieses Elements negativ ist, wird es schließlich bei $-1$ in Sättigung gehen; andernfalls wird es bei $1$ in Sättigung gehen. Das zweite Element wird verringert, bis es bei $-1$ in Sättigung geht.

Betrachtet man wie zuvor das Eingabemuster des nicht ganz perfekten Pakets vom Typ B, $\textbf{p} = \left[\matrix{ -1\cr 1\cr -1} \right]$, um das Hopfield-Netz zu testen, so würden die Ausgaben für die ersten drei Iterationen lauten:

$$
\textbf{a}(0) = \left[\matrix{ -1\cr 1\cr -1} \right], \ \textbf{a}(1) = \left[\matrix{ -1\cr -0.7\cr -1} \right],
$$
$$
\textbf{a}(2) = \left[\matrix{ -1\cr -1\cr -1} \right], \ \textbf{a}(3) = \left[\matrix{ -1\cr -1\cr -1} \right]
$$

Das Netz konvergierte zum Parzellenmuster des Typs B, ebenso wie das Hamming-Netz und das Perzeptron, obwohl jedes Netz auf unterschiedliche Weise arbeitete. Das Perzeptron hatte einen einzigen Ausgang, der die Werte $-1$ (Typ B-Parzelle) oder $1$ (Typ A-Parzelle) annehmen konnte. Im Hamming-Netz zeigte das einzelne Neuron ungleich Null an, welches Prototyp-Muster die ähnlichste Übereinstimmung aufwies. Wenn das erste Neuron ungleich Null war, bedeutete dies eine Parzelle vom Typ A, und wenn das zweite Neuron ungleich Null war, bedeutete dies ein Muster vom Typ B. Im Hopfield-Netz erscheint das Prototyp-Muster selbst am Ausgang des Netzes.

Dieses Hopfield-Netzwerk kann in MATLAB wie folgt kodiert werden:

{% include codes/nn-parcel-rod/m14.html %}

was zu der folgenden Ausgabe führt:

{% include codes/nn-parcel-rod/m15.html %}

<a id="section-f"></a>
## Klassifizierung von linear trennbaren Daten mit einem Perzeptron

<a id="subsection-a"></a>
### Problembeschreibung

In diesem Beispiel gibt es zwei Datencluster mit jeweils $20$ Stichproben, die zu zwei Klassen gehören. Diese Cluster sind in einem zweidimensionalen Eingaberaum definiert. Die Klassen sind linear trennbar.

<a id="subsection-b"></a>
### Ziel

Konstruktion eines Perzeptrons für die Klassifizierung von zwei zufällig definierten Datenclustern.

<a id="subsection-a"></a>
### Schritte

<ol>
  <li><a href="#subsubsection-j">Definition von Eingabe- und Ausgabedaten</a></li>
  <li><a href="#subsubsection-k">Erstellung und Training des Perzeptrons</a></li>
  <li><a href="#subsubsection-l">Einzeichnen der Entscheidungsgrenze</a></li>
</ol>

<a id="subsubsection-j"></a>
**1. Definition von Eingabe- und Ausgabedaten**

Zunächst werden mit der MATLAB-Funktion <code>randn</code>, welche normalverteilte Zufallszahlen erzeugt, $20$ Stichprobenvektoren zweier verschiedener Klassen zufällig definiert. Den Stichproben der zweiten Klasse wird ein Offset von $5$ hinzugefügt, damit sie einen unterscheidbaren Abstand zu den Stichproben der ersten Klasse haben. Jede Klasse wird als $2$-mal-$20$-Matrix festgelegt und zu einer $2$-mal-$40$-Matrix $p$ zusammengefasst. Die Matrix $p$ stellt also die Eingaben für das Perzeptron dar: normalverteilte Zufallszahlen, eine $2$-mal-$40$ ($R$-mal-$Q$)-Matrix von $40$ Eingabevektoren mit jeweils zwei Elementen.

Um die Vektoren in der Matrix $p$ einer der beiden Klassen zuzuordnen, wird eine zweite Matrix, $t$, als $1$-mal-$40$ ($S$-mal-$Q$) Ausgabematrix definiert. Die ersten $20$-Elemente der $t$-Matrix werden mit dem Wert Null und die anderen $20$-Elemente mit dem Wert Eins belegt. Die Ausgabematrix $t$ besteht also aus $40$ Zielvektoren, die jeweils aus einem einzigen Element (entweder Null oder Eins) bestehen.

Um die Eingabe- und Zielvektoren des Perzeptrons darzustellen, wird die Funktion <code>plotpv</code> verwendet, die zwei Argumente benötigt: das erste ist die Eingabematrix und das zweite die Zielmatrix. Damit werden Spaltenvektoren in der Eingabematrix mit Markierungen auf der Grundlage der Ausgabematrix gezeichnet.

{% include codes/nn-parcel-rod/m16.html %}

Der obige Code stellt die Stichproben dar:

<center>
    <p>
    <figure id="figure10" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure10.png" alt="Figure 10">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 10: Die Eingabevektoren $(p_{1,i}, p_{2,i})$, markiert als zwei Klassen</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-k"></a>
**2. Erstellung und Training des Perzeptrons**

In MATLAB wird ein Einschicht-Perzeptron mit dem Befehl: <code>net = perceptron;</code> erstellt.

Das Perzeptron verwendet standardmäßig eine Hard-Limit-Übertragungsfunktion, <code>hardlim</code>.

Die Trainingsfunktion für Perzeptron ist standardmäßig auf <code>trainc</code> eingestellt, was ein zyklisches Gewichts-/Bias-Training ist, und wird durch <code>train</code> aufgerufen. <code>trainc</code> trainiert ein Netzwerk mit Gewichts- und Bias-Lernregeln mit inkrementellen Updates nach jeder Präsentation einer Eingabe. Die Eingaben werden in zyklischer Reihenfolge präsentiert. Das Training stoppt, wenn eine dieser Bedingungen erfüllt ist:

- Die maximale Anzahl von Epochen (Wiederholungen) ist erreicht.
- Die Leistung wird auf das Ziel minimiert.
- Die maximale Zeitspanne wird überschritten.

Zur Messung der Netzleistung wird standardmäßig die Funktion des mittleren absoluten Fehlers, <code>mae</code>, verwendet. Der Fehler wird durch Subtraktion des Ausgangs vom Ziel berechnet. Dann wird der mittlere absolute Fehler berechnet. Das Ziel ist die Minimierung der Leistung, d.h. des Fehlers.

{% include codes/nn-parcel-rod/m17.html %}

Als Ergebnis des obigen Codes wird die Trainingsaufzeichnung mit den Trainings- und Leistungsfunktionen und -parametern sowie dem Wert der besten Leistung (dem erreichten Mindestfehler) angezeigt.

<center>
    <p>
    <figure id="figure11" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure11.png" alt="Figure 11">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 11: Die Trainingsaufzeichnung des trainierten neuronalen Netzes</figcaption>
    </figure>
    </p>
</center>

<code>view(net)</code> öffnet ein Fenster, das das neuronale Netz (angegeben durch <code>net</code>) als grafisches Diagramm darstellt. Die Zahlen zeigen an, dass die Eingabevektoren zwei Elemente enthalten, das Netz aus einer Schicht mit einem einzigen Neuron besteht und eine Hard-Limit-Übertragungsfunktion verwendet, und die Ausgabe ein Einzelelementvektor ist.

<center>
    <p>
    <figure id="figure12" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure12.png" alt="Figure 12">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 12: Das grafische Diagramm des erstellten neuronalen Netzes</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-l"></a>
**3. Einzeichnen der Entscheidungsgrenze**

Nachdem das Netz trainiert wurde, wird im nächsten Schritt die Klassifizierungslinie auf dem zuvor gezeichneten Perzeptron-Vektorplot dargestellt. Dies geschieht mit der Funktion <code>plotpc</code>, die zwei Argumente als Eingabe benötigt:

- Die erste ist die $S$-mal-$R$-Gewichtsmatrix, <code>net.iw{1,1}</code>, die die endgültige Gewichtsmatrix nach dem Training ist. $$\left\{ 1,1 \right\}$$ bezeichnet die Gewichte für die Verbindung vom ersten Eingang zur ersten Schicht, 
- und das zweite Argument ist der $S$-mal-$1$ Bias-Vektor, <code>net.b{1}</code>, der der endgültige Bias-Vektor nach dem Training für die erste Schicht ist.

Dabei ist $S$ die Anzahl der Neuronen in der Schicht und $R$ die Anzahl der Elemente im Eingabevektor.

Schließlich wird die lineare Entscheidungsgrenze eingezeichnet, die die Datenpunkte, die zu den beiden Klassen gehören, voneinander trennt:

{% include codes/nn-parcel-rod/m18.html %}

<center>
    <p>
    <figure id="figure13" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure13.png" alt="Figure 13">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 13: Die lineare Entscheidungsgrenze, die die beiden Klassen trennt</figcaption>
    </figure>
    </p>
</center>

<a id="section-g"></a>
## Benutzerdefinierte neuronale Netze

<a id="subsection-a"></a>
### Problembeschreibung und Ziel

Dieses Beispiel zeigt, wie ein benutzerdefiniertes, untiefes neuronales Netz in MATLAB mit Hilfe der Netzwerkfunktion erstellt und angezeigt wird. Das zu erstellende Netz ist ein Feedforward-Netz, das aus zwei Schichten besteht. Es hat einen einzelnen Eingabevektor mit sechs Elementen und einen Ausgabevektor ("Zielausgabe") mit zwei Elementen. Nur die erste Schicht hat einen Bias. Ein Eingabegewicht verbindet die erste Schicht mit der Eingabe. Ein Schichtgewicht verbindet sich von der ersten Schicht aus mit der zweiten Schicht. Die zweite Schicht ist der Ausgang des Netzes.

<a id="subsection-b"></a>
### Schritte

<ol>
  <li><a href="#subsubsection-m">Definition der Eingaben und Ausgaben</a></li>
  <li><a href="#subsubsection-n">Definition und Anpassung des Netzes (Anzahl der Teilobjekte des Netzes)</a></li>
  <li><a href="#subsubsection-o">Festlegung der Topologie (Eigenschaften der Teilobjekte des Netzes) und der Übertragungsfunktion</a></li>
  <li><a href="#subsubsection-p">Konfigurieren des Netzwerks mit <code>configure</code></a></li>
  <li><a href="#subsubsection-q">Training des Netzes und Berechnung der Neuronenausgabe</a></li>
</ol>

<a id="subsubsection-m"></a>
**1. Definition der Eingaben und Ausgaben**

{% include codes/nn-parcel-rod/m19.html %}

Der obige Code erstellt die Eingabe- und Ausgabe- (Ziel-) Vektoren.

{% include codes/nn-parcel-rod/m25.html %}

<a id="subsubsection-n"></a>
**2. Definition und Anpassung des Netzes (Anzahl der Teilobjekte des Netzes)**

Um ein benutzerdefiniertes untiefes neuronales Netz mit einer Eingabe und zwei Schichten zu erstellen, wird der folgende Codeausschnitt verwendet. Die Anzahl der Eingaben bestimmt, wie viele Sätze von Vektoren das Netz als Eingabe erhält. Die Größe der einzelnen Eingaben (d. h. die Anzahl der Elemente in jedem Eingabevektor) wird durch die Eingabegröße bestimmt (in diesem Beispiel gibt es einen Eingabevektor, also <code>net.numInputs = 1</code> und die Eingabegröße ist <code>net.inputs{1}.size = 6</code>).

**Syntax:**

<code>net = network(numInputs,numLayers,biasConnect,inputConnect,layerConnect,outputConnect)</code>

- <code>numInputs</code>: Anzahl der Eingaben, die das Netz erhält (wie viele Sätze von Vektoren das Netz als Eingabe erhält)
- <code>numLayers</code>: Anzahl der Schichten, die das Netz hat (hier: zwei Schichten)
- <code>biasConnect</code>: <code>numLayers</code>-mal-$1$ Boolescher Vektor; diese Eigenschaft legt fest, welche Schichten Bias haben ($1$ bedeutet Vorhandensein und $0$ bedeutet Abwesenheit) (hier: die erste Schicht hat einen)
- <code>inputConnect</code>: <code>numLayers</code>-mal-<code>numInputs</code> Boolesche Matrize; diese Eigenschaft definiert, welche Schichten Gewichte haben, die von Eingaben stammen (hier: die erste Schicht hat eines)
- <code>layerConnect</code>: <code>numLayers</code>-mal-<code>numLayers</code> Boolesche Matrize; diese Eigenschaft definiert, welche Schichten Gewichte von anderen Schichten haben (hier: zweite Schicht hat ein Gewicht, das von der ersten Schicht zur zweiten Schicht kommt)
- <code>outputConnect</code>: $1$-mal-<code>numLayers</code> Boolescher Vektor; diese Eigenschaft legt fest, welche Schichten Netzausgaben erzeugen (hier: die zweite Schicht)

{% include codes/nn-parcel-rod/m20.html %}

Das Ergebnis ist eine grafische Darstellung der Struktur des festgelegten benutzerdefinierten neuronalen Netzes:

<center>
    <p>
    <figure id="figure14" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure14.png" alt="Figure 14">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 14: Die grafische Darstellung der Struktur des benutzerdefinierten neuronalen Netzes</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-o"></a>
**3. Festlegung der Topologie (Eigenschaften der Teilobjekte des Netzes) und der Übertragungsfunktion**

The next step is to define the number of neurons in each layer. In this case, $5$ neurons are assigned to the first layer, and none to the second layer. Then, logistic sigmoid transfer function, <code>logsig</code>, is assigned to the first layer. To the second layer, linear transfer function, <code>purelin</code>, is assigned by default.

{% include codes/nn-parcel-rod/m21.html %}

<center>
    <p>
    <figure id="figure15" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure15.png" alt="Figure 15">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 15: The graphical diagram of the defined custom neural network</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-p"></a>
**4. Configuring the network with configure**

Configuration is the process of setting network input and output sizes and ranges, input preprocessing settings and output postprocessing settings, and weight initialization settings to match input and target data.

The <code>configure</code> function configures network inputs and outputs to best match input and target data. It takes input data (here: <code>inputs</code>) and target data (here: <code>outputs</code>), and configures the network's inputs and outputs to match. in this example, the network is configured so that the outputs of the second layer learn to match the associated target vectors.

Configuration must happen before a network's weights and biases can be initialized. Unconfigured networks are automatically configured and initialized the first time train is called.

{% include codes/nn-parcel-rod/m22.html %}

<center>
    <p>
    <figure id="figure16" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure16.png" alt="Figure 16">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 16: The graphical diagram of the configured custom neural network</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-q"></a>
**5. Training the network and calculating neuron output**

After configuration, and before training, the network's weights and biases are initialized by calculating the network's output for the given input vector.

{% include codes/nn-parcel-rod/m23.html %}

The following is the network output before training:

{% include codes/nn-parcel-rod/m26.html %}

Initialization is followed by the training of the network with a suitable training function. In this case, Levenberg-Marquardt backpropagation (<code>trainlm</code>) is used as training function so that, given example input vector, the outputs of the second layer learn to match the associated target vector with minimal mean squared error (<code>mse</code>).

{% include codes/nn-parcel-rod/m24.html %}

The training record is displayed:

<center>
    <p>
    <figure id="figure17" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure17.png" alt="Figure 17">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 17: The training record of a custom neural network</figcaption>
    </figure>
    </p>
</center>

and the output of the trained network is the desired (target) vector:

{% include codes/nn-parcel-rod/m27.html %}

<a id="section-h"></a>
## Industrial Fault Diagnosis of Connecting Rods in Compressors

<a id="subsection-a"></a>
### Problem Description

A connecting rod in a compressor is an important factor to guarantee the reliability of a compressor. It connects the crankshaft to the piston and moves in a linear reciprocating motion along the center of the piston inside of the cylinder. It is subjected to the periodical changing load during the operation of the compressor.

In this example, cast connecting rods are considered. A common cause of failure in these rods is structural overloading, due to enormous tensile loads caused by greater inertial forces exerted on the rods. Another cause of rod failure is the generation of microcracks in the metal due to conentrated stresses because of imperfections on the rod, which ultimately leads to a fracture that causes the rod to break.

A data set from $2000$ connecting rod samples is prepared that includes the recorded periodical values, along $100$ intervals, of the changing load on a connecting rod and the respective quality condition of the rod, which in turn is divided into three classes: The first class includes the rods that remained undamaged ("OK" cases), second class includes rod failure cases due to "overload" and the third class includes rod failure cases due to "crack".

<a id="subsection-b"></a>
### Objective

The task is to detect, for any tested connecting rod, whether it is a defected rod (due to crack or overload) or not, from the collected data of measured periodical load values the tested rod has been carrying.

<a id="subsection-c"></a>
### Steps

To accomplish this task a multilayer perceptron is used and the following steps are implemented to preprocess and postprocess the data and to create and configure the network:

<ol>
  <li><a href="#subsubsection-r">Loading and plotting the data</a></li>
  <li><a href="#subsubsection-s">Preparing inputs: Data resampling</a></li>
  <li><a href="#subsubsection-t">Defining binary output coding: 0=OK, 1=Error</a></li>
  <li><a href="#subsubsection-u">Creating and training a multilayer perceptron</a></li>
  <li><a href="#subsubsection-v">Post-training analysis and evaluating network performance</a></li>
  <li><a href="#subsubsection-w">Application</a></li>
</ol>

<a id="subsubsection-r"></a>
**1. Loading and plotting the data**

First, all variables from the data set "data.mat" are loaded into the MATLAB workspace. To check the contents of the workspace; the names, sizes, and type of all the variables in the data set, the <code>whos</code> function is used. Then, the data is plotted in three separate graphs, <a href="#figure18">Figure 18</a>, <a href="#figure19">Figure 19</a> and <a href="#figure20">Figure 20</a>, in each one of them the data points belonging to only one of the three classes ("OK", "Overload", or "Crack") is highlighted in some specific color, while the other points are represented in cyan color.

{% include codes/nn-parcel-rod/m28.html %}

<center>
    <p>
    <figure id="figure18" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure18.png" alt="Figure 18">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 18: Data labeled "OK" are highlighted</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure19" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure19.png" alt="Figure 19">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 19: Data labeled "Overload" are highlighted</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure20" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure20.png" alt="Figure 20">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 20: Data labeled "Crack" are highlighted</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-s"></a>
**2. Preparing inputs: Data resampling**

In this case, using the full resolution of the time series data, is not necessary. Thus, to reduce the computational resources required for model training, downsampling of the input data is carried out, which allows training on a disproportionately low subset of the majority class examples. To do this, decimation, i.e. reducing the sampling frequency by a factor of $10$, is performed on the input data, which means, keeping only every tenth sample. <a href="#figure21">Figure 21</a>, <a href="#figure22">Figure 22</a> and <a href="#figure23">Figure 23</a> show the graphs of the resampled data points.

{% include codes/nn-parcel-rod/m29.html %}

<center>
    <p>
    <figure id="figure21" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure21.png" alt="Figure 21">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 21: Resampled data labeled "OK"</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure22" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure22.png" alt="Figure 22">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 22: Resampled data labeled "Overload"</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure23" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure23.png" alt="Figure 23">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 23: Resampled data labeled "Crack"</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-t"></a>
**3. Defining binary output coding: 0=OK, 1=Error**

After resampling the input data, the target data is changed to two classes, "OK" and "Error", by using a conditional statement, which loops through all the values of the cells inside the target data sheet one by one and returns a true or false state represented by the numbers $1$ or $0$, when the checked cell value is laregr than one ("Error" class) or not ("OK" class), respectively.

{% include codes/nn-parcel-rod/m30.html %}

<a id="subsubsection-u"></a>
**4. Creating and training a multilayer perceptron**

A feedforward network is created, by using MATLAB's feedforwardnet function, to map the input and output data. The <code>feedforwardnet</code> function generates a feedforward network consisting of a series of layers. The first layer has a connection from the network input. Each subsequent layer has a connection from the previous layer. The final layer produces the network's output. Size (number of neurons) of the hidden layers in the network is specified as a row vector. The length of the vector determines the number of hidden layers in the network. The input and output sizes are set to zero. The software adjusts the sizes of these during training according to the training data.

In this case, the created feedforward network consists of a single hidden layer of size $4$ (four neurons in the layer).

Then, the total data set is divided into three parts: training, validation and testing.

1. The training set is used to calculate gradients and to determine weight updates.
2. The validation set is used to stop training before overfitting occurs. The error on the validation set is monitored during the training process. The validation error normally decreases during the initial phase of training, as does the training set error. However, when the network begins to overfit the data, the error on the validation set typically begins to rise. The network weights and biases are saved at the minimum of the validation set error.
3. The test set is used to predict future performance of the network. The test set performance is the measure of network quality. If, after a network has been trained, the test set performance is not adequate, then there are usually four possible causes:
- the network has reached a local minimum,
- the network does not have enough neurons to fit the data,
- the network is overfitting, or
- the network is extrapolating.

The test set error is not used during training, but it is used to compare different models. It is also useful to plot the test set error during the training process. If the error on the test set reaches a minimum at a significantly different iteration number than the validation set error, this might indicate a poor division of the data set.

Typically, when dividing the data, approximately $70%$ is used for training, $15%$ for validation, and $15%$ for testing.

When the network weights and biases are initialized, the network is ready for training. MATLAB's <code>train</code> function is used for training the network. This function uses batch training (updating the weights after the presentation of the complete data set), to differentiate it from the incremental training (updating the weights after the presentation of each single training sample), which could be carried out by MATLAB's <code>adapt</code> function. The default training algorithm called by <code>train</code> is Levenberg-Marquardt <code>trainlm</code>. The training process requires a set of examples of proper network behavior,- network inputs <code>force</code> and target outputs <code>target</code>. The process of training involves tuning the values of the weights and biases of the network to optimize network performance, as defined by the network performance function. Typically one epoch of training is defined as a single presentation of all input vectors to the network. The network is then updated according to the results of all those presentations. The default performance function for feedforward networks is mean square error <code>mse</code>,- the average squared error between the network outputs $Y$ and the target outputs <code>target</code>.

During training, the progress is constantly updated in the training window. Of most interest are the performance, the magnitude of the gradient of performance and the number of validation checks. The magnitude of the gradient and the number of validation checks are used to terminate the training. The gradient will become very small as the training reaches a minimum of the performance. If the magnitude of the gradient is less than $1e-5$, the training will stop. The number of validation checks represents the number of successive iterations that the validation performance fails to decrease. If this number reaches $6$ (the default value), the training will stop.

{% include codes/nn-parcel-rod/m31.html %}

As a result, the training record is displayed, showing training and performance functions and parameters, and the value of the best performance (the minimum error reached). In this case, the number of validation checks reached $6$ (the default value), and as a result the training stopped.

<center>
    <p>
    <figure id="figure24" style='display: table; width: 50%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure24.png" alt="Figure 24">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 24: The training record</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-v"></a>
**5. Post-training analysis and evaluating network performance**

Before using a trained neural network, it should be analyzed to determine if the training was successful. There are many techniques for post-training analysis. Common ones could be obtained from the training window, where four plots are accessible: performance, training state, error histogram, and regression. The performance plot shows the value of the performance function versus the iteration number. It plots training, validation, and test performances. If there is no major problems with the training, then the error profiles for validation and test would be very similar. If the validation curve increases significantly, then it is possible that some overfitting might have occurred. The training state plot shows the progress of other training variables, such as the gradient magnitude, the number of validation checks, etc. The error histogram plot shows the distribution of the network errors. The regression plot shows a regression between network outputs and network targets. In a perfect training case, the network outputs and the targets would be exactly equal, but that is rarely the case in practice.

From the training record, performance graph, <a href="#figure25">Figure 25</a>, and error histogram, <a href="#figure26">Figure 26</a>, could be displayed. The performance graph shows that at epoch $10$ the best performance for the validation data set was reached and the training has stopped as the number of validation checks, where the validation performance fails to decrease reached $6$, and because continuing training beyond this point leads to overfitting. The performance value for the validation data set is the average of the squares of errors, and the error is the difference between the output of the network (the observed output) and the target output (the predicted output). Smaller error indicates that the outputs are very close to the target values. The error histogram shows the errors between the target values and output values after training a neural network. The more the error values are distributed closer to zero (the orange vertical line) the better is the model's performance.

<center>
    <p>
    <figure id="figure25" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure25.png" alt="Figure 25">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 25: The performance graph</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure26" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure26.png" alt="Figure 26">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 26: The error histogram</figcaption>
    </figure>
    </p>
</center>

After training, the obtained network outputs are divided into two classes by using a threshold value and a conditional statement. $0.5$ is the natural threshold that ensures that the given probability of having $1$ is greater than the probability of having $0$. That's why it's the default threshold value. Output values above the threshold are labeled $1$ and values below or equal to the threshold are labeled $0$.

{% include codes/nn-parcel-rod/m32.html %}

Finally the percentage of correct classifications could be calculated.

{% include codes/nn-parcel-rod/m33.html %}

and it equals to $99.7\%$:

{% include codes/nn-parcel-rod/m34.html %}

<a id="subsubsection-w"></a>
**6. Application**

After the network is trained and validated, the network object can be used to calculate the network response to any input; new data or from the loaded data set.

In the next code snippet a random connecting rod is selected from the data set (here:with index number $408$) and its quality is predicted correctly by the trained network (here: quality 0="OK"), as shown in <a href="#figure27">Figure 27</a>:

{% include codes/nn-parcel-rod/m35.html %}

{% include codes/nn-parcel-rod/m36.html %}

<center>
    <p>
    <figure id="figure27" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure27.png" alt="Figure 27">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 27: Randomly selected connecting rod data and its correctly predicted quality</figcaption>
    </figure>
    </p>
</center>