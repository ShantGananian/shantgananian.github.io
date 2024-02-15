---
layout: single # archive

title: 'Static Analyses of Bars and Trusses via the Finite Element Simulation Method with SOLIDWORKS'
excerpt: ""
myLink: /de/fe-solidworks-bar-truss-de/ # Custom Variable
# author_profile: true
last_modified_at: 2024-02-13
date: 2024-02-13
published: true
tagsen:
  - SOLIDWORKS
  - Finite Element Analysis
  - Simulation
  - Computer-Aided Engineering
  - Computer-Aided Design
  - Stress Analysis
  - Strength of materials

toc: true
toc_label: "Table of contents"
toc_icon: "cog"
toc_sticky: true

header:
  #image: /assets/img/nn-parcel-rod/Figure28.jpg
  #teaser: /assets/img/nn-parcel-rod/Figure28.jpg
---

<img align="right" width="25%" heighth="auto" src="/assets/img/work_in_progress.png" alt="Figure">


<br>

Application of truss structures in various forms are found all around. Typically, they are featured prominently in the design of cranes, truss booms, telecommunication towers, masts, electric pylons, roofs, bridges, and so on.

From an engineering performance analysis point of view, static analyses of bars and trusses are conducted with the following objectives:

- Determining the internal forces and consequently the stresses that developed in the members
- Evaluating the axial deformation, the members experienced upon loading

The following technical points are frequently considered for the computer analysis of trusses:

- The members of a truss are straight and have uniform cross-sections.
- The ends of an individual member of the truss are connected to the ends of other members at joints via frictionless pins. In practical scenarios, such joints may be formed by rivets/bolts/ball and socket joints or via welding to a gusset plate.
- Forces and supports are applied only at the joints of a truss.

<a id="section-a"></a>
## Strategies for the analysis of trusses

This section describes the *structural details* and the *modeling strategies* for the simulation of truss structures. It also highlights the major features of the ***truss element*** within the SOLIDWORKS Simulation library.

<a id="subsection-a"></a>
### Structural details

Irrespective of what form a truss may have, a consistent set of parameters is employed for its analyses. The following technical information are needed before venturing into the analysis:

- The dimensions of the truss:
    - The details of the cross-section
    - The geometric length of each member
    - The orientation angles of the members
- The material properties of the truss members
- The loads applied to specific joints of the truss
- The support provided to the truss to prevent rigid body motion

<a id="subsection-b"></a>
### Modeling strategy

When analyzing truss structures via the finite element simulation method, a basic strategy is to take a structure such as that in <a href="#figure1">Figure 1 (a)</a>, split it into its constituent members (<a href="#figure1">Figure 1 (b)</a>), and then treat each member as a truss element. Thus, in the end, a whole structure formed from the assembly of different members is represented by the collective behavior of individual truss elements.

<center>
    <p>
    <figure id="figure1" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure1.png" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 1: Simple truss structure</figcaption>
    </figure>
    </p>
</center>

The major steps in the static analysis of trusses are:

1. Modeling the ***skeletal structure*** (skeletal arrangement) of the truss or a collection of bars within the ***SOLIDWORKS modeling environment***.
2. Conversion of the skeletal structure into a ***weldment profile*** within the ***SOLIDWORKS modeling environment***, transforming the weldment model into a finite element model (within the ***SOLIDWORKS Simulation window***).
3. Running the analysis to obtain the results (within the ***SOLIDWORKS Simulation window***).

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

To do this, ***Structural Member*** command is used from the Weldments toolbar and in the Structural Member PropertyManager window the following options are selected:

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

On completing the above mentioned, the FeatureManager tree will appear with some additional items, like the item <code>Cut list (41)</code> showing that there are a total of $41$ weldment items that make up the crane structure, and the item <code>Pipe</code>, which is the main branch of the collection of extruded bodies representing the $41$ structural parts of the crane.

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

It is assumed that each member of the crane is made of the same material. To apply the material to the members, the material database is launched and, in this case, 'alloy steel', located in the subfolder 'Steel' is selected.

The left side of the 'Material Dialog Box', <a href="#figure7">Figure 7</a>, contains a tree of available material types and materials, i.e. material database, which is a multilevel directory. At the top of the tree is ***SOLIDWORKS Materials*** main folder, followed by subfolders, each containing materials belonging to the same family. In the properties tab, the names of material properties are either in black, blue, or red font color. In general, the material property names in red are the ones that are necessary for static analyses. A material failure criterion (***Max von Mises Stress***) and ***Linear Elastic Isotropic*** material model are pre-defined for the selected material.

A material is called isotropic if its properties do not vary with direction. Isotropic materials have identical elastic modulus, Poisson's ratio, coefficient of thermal expansion, thermal conductivity, etc. in all directions.

<center>
    <p>
    <figure id="figure7" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-bar-truss/Figure7.png" alt="Figure 7">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 7: Displaying the material dialog box and choosing a material</figcaption>
    </figure>
    </p>
</center>

$\quad$ ***3. Changing from a beam element to a truss element***

By default, SOLIDWORKS Simulation treats a structural member that is created using the weldment tool as a ***beam element*** during the analysis. However, in this case, a ***truss element*** is required. The difference is that a beam element resists axial, bending, and torsional loads, while a truss element can resist axial loads only. Therefore, all the structural members, that are under the subfolders in the 'Cut list' folder in the 'FeatureManager Design Tree' are converted from beams to trusses by editing their definition from beam to truss in the 'Edit Definition' option.


<a id="subsubsection-d"></a>
***Part D – Scrutinizing the results***

