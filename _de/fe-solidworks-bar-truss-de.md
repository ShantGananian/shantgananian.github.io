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
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 1: Simple truss structure</figcaption>
    </figure>
    </p>
</center>

Die wichtigsten Schritte bei der statischen Analyse von Fachwerken sind:

1. Modellierung der ***Skelettstruktur*** (Skelettanordnung) des Fachwerks oder einer Sammlung von Stäben in der ***SOLIDWORKS Modellierungsumgebung***.
2. Umwandlung der Skelettstruktur in ein ***Schweißkonstruktionsprofil*** in der ***SOLIDWORKS-Modellierungsumgebung***, wobei das Schweißkonstruktionsmodell in ein Finite-Elemente-Modell umgewandelt wird (im ***SOLIDWORKS-Simulations-Fenster***).
3. Durchführung der Analyse, um die Ergebnisse zu erhalten (im ***SOLIDWORKS Simulation-Fenster***).

<a id="section-b"></a>
## PROBLEM 1: Conducting static analysis on a crane

<a id="subsection-a"></a>
### Problem Description

Analyzing the structural performance of a crane used in the spatial positioning of heavy objects on a mega building construction site. A 2D representation of the crane to be analyzed is shown in <a href="#figure2">Figure 2</a>, The crane is subjected to $1500 \ kN$ and $2000 \ kN$ weights at points $R$ and $W$, respectively.

Considering that the members of the crane are derived from tubular alloy steel with its Young's modulus, $E$, to be $210 \ GPa$. The members have the same cross-sectional detail characterized by external and internal diameters $200 \ mm$ and $80 \ mm$, respectively.

<center>
    <p>
    <figure id="figure2" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure2.png" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 2: 2D schematic of the crane</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-b"></a>
### Objectives

Answering the following questions by using SOLIDWORKS simulation:

- What is the maximum resultant deformation of the truss upon the application of the loads?
- What is the distribution of the factor of safety of the members of the crane upon loading?
- What is the internal force/stress that developed in the member $IH$?

<a id="subsection-c"></a>
### Solution

<ol>
  <li><a href="#subsubsection-a">Part A – Creating the sketch of the geometric model</a></li>
  <li><a href="#subsubsection-b">Part B – Converting the skeletal model into a structural profile</a></li>
  <li><a href="#subsubsection-c">Part C – Creating the Simulation study</a></li>
  <li><a href="#subsubsection-d">Part D – Scrutinizing the results</a></li>
</ol>

<a id="subsubsection-a"></a>
***Part A – Creating the sketch of the geometric model***

First, a model of the crane structure (skeletal sketch of the model) is created by sketching the lines describing the geometry of the crane with the <code>line</code> sketching tool. The unit of measurement used is the ***MMGS (millimeter, gram, and second)*** system of units. The completed sketch looks like the screenshot shown in <a href="#figure3">Figure 3</a>.

This created sketch is just a series of lines with no volume property. As such, it cannot be used for structural analyses. In the next step, the sketched line-based model is converted into a structural model with a volume property.


<center>
    <p>
    <figure id="figure3" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure3.png" alt="Figure 3">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 3: A line-based geometric model of the crane</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-b"></a>
***Part B – Converting the skeletal model into a structural profile***

The next step is to convert the line sketches created in the preceding section into a structural model using a special functionality in SOLIDWORKS called the ***weldments*** tool, which facilitates the transformation of lines with no volume properties into structural members with volume properties that are suitable for realistic engineering simulation. This is done by prescribing the cross-sectional details for the sketched lines.

To do this, ***Structural Member*** command is used from the Weldments toolbar and in the Structural
Member property manager window the following options are selected:

- Standard: iso
- Type: pipe
- Size: $33.7 \times 4.0$, – which refers to a tube with an external diameter of $33.7 \ mm$ and a thickness of $4 \ mm$.

Then, six groups of lines are selected (without applying corner treatment). The series of lines to be selected for each group are illustrated in <a href="#figure4">Figure 4 (a-f)</a>.

<center>
    <p>
    <figure id="figure4" style='display: table; width: 100%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure4.png" alt="Figure 4">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 4: Path segments for the weldment profiles</figcaption>
    </figure>
    </p>
</center>

On completing the above mentioned, the Feature Manager tree will appear with some additional items, like the item <code>Cut list (41)</code> showing that there are a total of $41$ weldment items that make up the crane structure, and the item <code>Pipe</code>, which is the main branch of the collection of extruded bodies representing the $41$ structural parts of the crane.

The employed cross-section from the weldment library is not the same as that stated in the problem description. Thus, to change the dimension of this cross-section, the <code>Sketch</code> in the item <code>Pipe</code> in the Feature Manager tree is edited from <a href="#figure5">Figure 5a</a> to the desired dimensions, shown in <a href="#figure5">Figure 5b</a>.

<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure5.png" alt="Figure 5">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 5: (a) The original cross-section of the tube; (b) the updated cross-section</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-c"></a>
***Part C – Creating the Simulation study***

In this section, static analysis is performed on the crane structure. For this, after activating the simulation tab and creating a new study, the material for the members is specified, the truss element, fixtures/loads are applied, and finally, the meshing process is initiated.

$\quad$ ***1. Activating the Simulation tab and creating a new study***

In this step, after activating the 'Simulation' tab, a new study is created, named "Crane Analysis", and the static analysis option is selected in the 'General Simulation' properties in the 'PropertyManager' panel. As a result, the 'Simulation' study tree is launched, joints are imposed at the connection points between the members of the truss, as well as 'Simulation' commands become available, as shown in <a href="#figure6">Figure 6</a>.

<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure6.png" alt="Figure 6">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 6: Appearance of joints in the model with the 'Simulation' study tree</figcaption>
    </figure>
    </p>
</center>

$\quad$ ***2. Adding a material property***

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

