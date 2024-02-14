---
layout: single # archive

title: 'Statische Analysen von Stäben und Fachwerken mittels der Finite-Elemente-Simulationsmethode mit SOLIDWORKS'
excerpt: ""
myLink: /en/fe-solidworks-bar-truss/ # Custom Variable
# author_profile: true
last_modified_at: 2024-02-13
date: 2024-02-13
published: true
tagsen:
  - SOLIDWORKS
  - Finite Elemente Analysen
  - Simulation
  - Rechnergestützte Entwicklung
  - Rechnergestützte Konstruktion
  - Spannungsanalyse
  - Festigkeitslehre


toc: true
toc_label: "Inhaltsverzeichnis"
toc_icon: "cog"
toc_sticky: true

header:
  #image: /assets/img/nn-parcel-rod/Figure28.jpg
  #teaser: /assets/img/nn-parcel-rod/Figure28.jpg
---

<img align="right" width="25%" heighth="auto" src="/assets/img/laufende-arbeiten.png" alt="Figure">

<br>

Fachwerkkonstruktionen werden in verschiedenen Formen überall eingesetzt. Typischerweise werden sie bei der Konstruktion von Kränen, Fachwerkauslegern, Fernmeldetürmen, Masten, Strommasten, Dächern, Brücken usw. eingesetzt.

Aus der Sicht der technischen Leistungsanalyse werden statische Analysen von Stäben und Fachwerken mit folgenden Zielen durchgeführt:

- Bestimmung der Schnittgrößen und damit der Spannungen, die sich in den Stäben entwickeln.
- Bewertung der axialen Verformung, die die Stäbe bei Belastung erfahren.

Die folgenden technischen Punkte werden bei der Rechneranalyse von Fachwerkträgern häufig berücksichtigt:

- Die Stäbe eines Fachwerks sind gerade und haben gleichmäßige Querschnitte.
- Die Enden eines einzelnen Stabes des Fachwerks sind mit den Enden anderer Stäbe über reibungsfreie Stifte verbunden. In der Praxis können solche Verbindungen durch Nieten/Schrauben/Kugelgelenke oder durch Schweißen an ein Knotenblech hergestellt werden.
- Kräfte und Stützen werden nur an den Verbindungsstellen eines Fachwerks eingeleitet.

<a id="section-a"></a>
## Strategien für die Analyse von Fachwerkträgern

In diesem Abschnitt werden die *strukturellen Details* und die *Modellierungsstrategien* für die Simulation von Fachwerkstrukturen beschrieben. Außerdem werden die wichtigsten Merkmale des ***Fachwerkelements*** innerhalb der SOLIDWORKS Simulation Bibliothek hervorgehoben.

<a id="subsection-a"></a>
### Strukturelle Einzelheiten

Unabhängig davon, welche Form ein Fachwerk hat, wird ein einheitlicher Satz von Parametern für seine Analysen verwendet. Die folgenden technischen Informationen werden benötigt, bevor man sich an die Analyse wagt:

- Die Abmessungen des Fachwerks:
    - Die Details des Querschnitts
    - Die geometrische Länge der einzelnen Stäbe
    - Die Orientierungswinkel der Stäbe
- Die Materialeigenschaften der Fachwerkstäbe
- die Lasten, die auf bestimmte Verbindungen des Fachwerks wirken
- die Abstützung des Fachwerks zur Vermeidung von Starrkörperbewegungen

<a id="subsection-b"></a>
### Modellierungsstrategie

Bei der Analyse von Fachwerkstrukturen mit Hilfe der Finite-Elemente-Simulationsmethode besteht eine grundlegende Strategie darin, eine Struktur wie die in <a href="#figure1">Abbildung 1 (a)</a> dargestellte zu nehmen, sie in ihre einzelnen Elemente zu zerlegen (<a href="#figure1">Abbildung 1 (b)</a>) und dann jedes Element als Fachwerkelement zu behandeln. Auf diese Weise wird ein ganzes Tragwerk, das sich aus verschiedenen Stäben zusammensetzt, durch das kollektive Verhalten der einzelnen Fachwerkelemente dargestellt.

<center>
    <p>
    <figure id="figure1" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure1.png" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 1: Einfache Fachwerkstruktur</figcaption>
    </figure>
    </p>
</center>

Die wichtigsten Schritte bei der statischen Analyse von Fachwerken sind:

1. Modellierung der ***Skelettstruktur*** (Skelettanordnung) des Fachwerks oder einer Sammlung von Stäben in der ***SOLIDWORKS Modellierungsumgebung***.
2. Umwandlung der Skelettstruktur in ein ***Schweißkonstruktionsprofil*** in der ***SOLIDWORKS-Modellierungsumgebung***, wobei das Schweißkonstruktionsmodell in ein Finite-Elemente-Modell umgewandelt wird (im ***SOLIDWORKS-Simulations-Fenster***).
3. Durchführung der Analyse, um die Ergebnisse zu erhalten (im ***SOLIDWORKS Simulation-Fenster***).

<a id="section-b"></a>
## PROBLEM 1: Durchführung einer statischen Analyse für einen Kran

<a id="subsection-a"></a>
### Problembeschreibung

Analyse der strukturellen Leistung eines Krans, der für die räumliche Positionierung schwerer Objekte auf einer Mega-Baustelle verwendet wird. Eine 2D-Darstellung des zu untersuchenden Krans ist in <a href="#figure2">Abbildung 2</a> dargestellt. Der Kran wird an den Punkten $R$ und $W$ mit Gewichten von $1500 \ kN$ bzw. $2000 \ kN$ belastet.

Es wird angenommen, dass die Teile des Krans aus legiertem Stahlrohr mit einem Elastizitätsmodul $E$ von $210 \ GPa$ bestehen. Die Stäbe haben den gleichen Querschnitt mit einem Außen- und Innendurchmesser von $200 \ mm$ bzw. $80 \ mm$.

<center>
    <p>
    <figure id="figure2" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure2.png" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 2: 2D-Darstellung des Krans</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-b"></a>
### Ziele

Beantwortung der folgenden Fragen mit Hilfe der SOLIDWORKS-Simulation:

- Wie groß ist die maximale resultierende Verformung des Fachwerks bei der Einwirkung der Lasten?
- Wie ist die Verteilung des Sicherheitsfaktors der Stäbe des Krans bei Belastung?
- Wie hoch ist die innere Kraft/Spannung, die sich im Stab $IH$ entwickelt?

<a id="subsection-c"></a>
### Lösung

<ol>
  <li><a href="#subsubsection-a">Teil A - Erstellung der Skizze des geometrischen Modells</a></li>
  <li><a href="#subsubsection-b">Teil B - Umwandlung des Strukturskelettmodells in ein Strukturprofil</a></li>
  <li><a href="#subsubsection-c">Teil C - Erstellung der Simulationsstudie</a></li>
  <li><a href="#subsubsection-d">Teil D - Prüfung der Ergebnisse</a></li>
</ol>

<a id="subsubsection-a"></a>
***Teil A - Erstellung der Skizze des geometrischen Modells***

Zunächst wird ein Modell der Kranstruktur (Skelettskizze des Modells) erstellt, indem die Linien, die die Geometrie des Krans beschreiben, mit dem Skizzierwerkzeug <code>Linie</code> skizziert werden. Die verwendete Maßeinheit ist das ***MMGS (Millimeter, Gramm und Sekunde)***-Einheitensystem. Die fertige Skizze sieht aus wie der Screenshot in <a href="#figure3">Abbildung 3</a>.

Diese erstellte Skizze ist nur eine Reihe von Linien ohne Volumeneigenschaften. Als solche kann sie nicht für Strukturanalysen verwendet werden. Im nächsten Schritt wird das skizzierte linienbasierte Modell in ein Strukturmodell mit Volumeneigenschaft umgewandelt.

<center>
    <p>
    <figure id="figure3" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure3.png" alt="Figure 3">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 3: Ein linienbasiertes geometrisches Modell des Krans</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-b"></a>
***Teil B - Umwandlung des Strukturskelettmodells in ein Strukturprofil***

Der nächste Schritt besteht darin, die im vorangegangenen Abschnitt erstellten Linienskizzen in ein Strukturmodell umzuwandeln. Dies geschieht mit Hilfe einer speziellen Funktion in SOLIDWORKS, dem Werkzeug ***Schweißkonstruktionen***, das die Umwandlung von Linien ohne Volumeneigenschaften in Strukturelemente mit Volumeneigenschaften ermöglicht, die für eine realistische technische Simulation geeignet sind. Dies geschieht durch Vorgabe der Querschnittsdetails für die skizzierten Linien.

Dazu wird der Befehl ***Strukturbauteil*** aus der Symbolleiste Schweißkonstruktionen verwendet und im Fenster PropertyManager des Strukturbauteils werden die folgenden Optionen ausgewählt:

- Norm: iso
- Typ: Rohr
- Größe: $33,7 \times 4,0$, - was sich auf ein Rohr mit einem Außendurchmesser von $33,7 \ mm$ und einer Dicke von $4 \ mm$ bezieht.

Dann werden sechs Gruppen von Linien ausgewählt (ohne Anwendung der Eckenbehandlung). Die für jede Gruppe auszuwählenden Linienreihen sind in <a href="#figure4">Abbildung 4 (a-f)</a> dargestellt.

<center>
    <p>
    <figure id="figure4" style='display: table; width: 100%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure4.png" alt="Figure 4">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 4: Pfadsegmente für die Schweißnahtkonstruktions-Profile</figcaption>
    </figure>
    </p>
</center>

Nach Abschluss der oben genannten Schritte erscheint der FeatureManager mit einigen zusätzlichen Elementen, wie z. B. dem Element <code>Zuschnittliste (41)</code>, das anzeigt, dass es insgesamt $41$ Schweißteile gibt, aus denen die Kranstruktur besteht, und dem Element <code>Rohr</code>, das der Hauptzweig der Sammlung von extrudierten Körpern ist, die die $41$ Strukturteile des Krans darstellen.

Der verwendete Querschnitt aus der Schweißkonstruktionsbibliothek entspricht nicht dem, der in der Problembeschreibung angegeben ist. Um die Abmessungen dieses Querschnitts zu ändern, wird die <code>Skizze</code> im Element <code>Rohr</code> im FeatureManager von <a href="#figure5">Abbildung 5a</a> auf die gewünschten Abmessungen (<a href="#figure5">Abbildung 5b</a>) geändert.

<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure5.png" alt="Figure 5">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 5: (a) Der ursprüngliche Querschnitt des Rohrs; (b) der aktualisierte Querschnitt</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-c"></a>
***Teil C - Erstellung der Simulationsstudie***

In diesem Abschnitt wird eine statische Analyse der Kranstruktur durchgeführt. Dazu werden nach dem Aktivieren der Simulationsregisterkarte und dem Anlegen einer neuen Studie das Material für die Bauteile spezifiziert, das Stabelement, die Einspannungen/Lasten angewandt und schließlich der Vernetzungsprozess eingeleitet.

$\quad$ ***1. Aktivierung der Registerkarte Simulation und Erstellung einer neuen Studie***

In diesem Schritt wird nach dem Aktivieren der Registerkarte "Simulation" eine neue Studie mit dem Namen "Crane Analysis" (Krananalyse) erstellt und die Option "Statische Analyse" in den Eigenschaften von "Allgemeine Simulation" im Bereich "PropertyManager" ausgewählt. Daraufhin wird die Studien-Baumstruktur "Simulation" gestartet, Verbindungen werden an den Verbindungspunkten zwischen den Stäben des Fachwerks eingefügt und die Simulation-Befehle werden verfügbar, wie in <a href="#figure6">Abbildung 6</a> dargestellt.

<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure6.png" alt="Figure 6">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 6: Darstellung der Verbindungen im Modell mit der Studien-Baumstruktur "Simulation"</figcaption>
    </figure>
    </p>
</center>

$\quad$ ***2. Hinzufügung  einer Materialeigenschaft***

It is assumed that each member of the crane is made of the same material. To apply the material to the members, the material database is launched and, in this case, 'alloy steel', located in the sub-folder 'Steel' is selected.

The left side of the 'Material Dialog Box', <a href="#figure7">Figure 7</a>, contains a tree of available material types and materials, i.e. material database, which is a multilevel directory. At the top of the tree is ***SOLIDWORKS Materials*** main folder, followed by sub-folders, each containing materials belonging to the same family. In the properties tab, the names of material properties are either in black, blue, or red font color. In general, the material property names in red are the ones that are necessary for static analyses. A material failure criterion (***Max von Mises Stress***) and ***Linear Elastic Isotropic*** material model are pre-defined for the selected material.

<center>
    <p>
    <figure id="figure7" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure7.png" alt="Figure 7">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 7: Displaying the material dialog box and choosing a material</figcaption>
    </figure>
    </p>
</center>

$\quad$ ***3. Changing from a beam element to a truss element***

By default, SOLIDWORKS Simulation treats a structural member that is created using the weldment tool as a ***beam element*** during the analysis. However, in this case, a ***truss element*** is required. Therefore, all the structural members, that are under the sub-folders in the 'Cut list' folder in the 'FeatureManager Design Tree' are converted from beams to trusses.


<a id="subsubsection-d"></a>
***Part D – Scrutinizing the results***

