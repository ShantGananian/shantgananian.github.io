---
layout: single # archive

title: 'Static Analyses of Components with Solid Elements'
subtitle: "via the Finite Element Simulation Method with SOLIDWORKS"
excerpt: "Application of truss structures in various forms are found all around. Static analyses of such structures are conducted to determine the internal forces, stresses and to evaluate the axial deformations."
# myLink: /de/fe-solidworks-components-solid-elements-de/ # Custom Variable with JS use
lang_toggle_url_de: /de/fe-solidworks-components-solid-elements-de/ # Custom Variable without need for JS

# author_profile: true
last_modified_at: 2023-11-20
date: 2023-11-20
published: false
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
toc_icon: "book-open" #"cog"
toc_sticky: true

header:
 # image: /assets/img/fe-solidworks-bar-truss/Figure30.png
 # teaser: /assets/img/fe-solidworks-bar-truss/Figure30.png
---

<br>

Solid elements are versatile elements for the simulation of arbitrary three-dimensional bodies. To explore these elements, the following two case studies are worked out by using SOLIDWORKS. The first is about analysis of a helical spring and the second is about analysis of spur gears. The featuresd topics are the use of mesh control, the setting up of global/local interactions between components, the significance of curvature-based meshes, and assessment of a contact stress, among other things.

Analysts are confronted with a wide range of simulation tasks where they have to decide the most appropriate element as part of the finite element simulation workflow. Choosing the right element has an enormous impact on the accuracy of the simulations. In the context of static analysis, the solid element remains one of the most flexible elements suitable for the analysis of various kinds of components. In practice, a set of solid elements can be used whenever the structure to be analyzed violates the limitations of structural elements such as beam/shell elements. Engineering components that can be sufficiently analyzed with solid elements ranges from simple to geometrically complex engineering structures and machinery. Examples of structures within the category of geometrically complex engineering components and machinery are machinist vise, T crane hook, crankshaft, pliers, impeller, heavy-duty lifting brackets.

Two popular categories of solid elements are widely used in finite element simulations (<a href="#figure1">Figure 1</a>):

1. the hexahedron-based solid elements – a 3D extension of the 2D quadrilateral elements that are also sometimes called brick elements;
2. the tetrahedron-based solid elements – a 3D extension of the 2D triangular elements.

<center>
    <p>
    <figure id="figure1" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-components-solid-elements/Figure1.png" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 1: An illustration of the shapes and nodes of hexahedral and tetrahedral elements</figcaption>
    </figure>
    </p>
</center>

In practice, in most cases, a collection of tetrahedral elements is suitable for the analysis of irregular solid bodies. However, in the absence of irregular features (such as corners, grooves, keyways, and so on), a collection of hexahedral elements will provide better accuracy and will often require less simulation runtime compared to tetrahedral elements.

In SOLIDWORKS simulation library two formulations of the tetrahedral solid element exist:

- The first-order ($4$-node) tetrahedral solid element (also referred to as a linear solid element)
- The second-order ($10$-node) tetrahedral solid element (also referred to as a parabolic solid element)

<a id="section-a"></a>
## PROBLEM 1: Static analysis of a helical spring

<a id="subsection-a"></a>
### Problem Description

Springs are known to store energy when deflected and return the same energy upon release from the deformed state. In this case study a helical compression spring, used in a spring-based weighing module, is simulated and analyzed as part of a sub-assembly. The performance of the module is intrinsically tied to the deformation of the compression helical spring. Thus, understanding the performance of the spring is a necessary engineering design task. The spring is to be made from an $ASTM316 stainless steel$ wire with a diameter of $10 \ mm$ and is flat at both ends. Other known design specifications foe the spring are the following:

- Total number of active coils $= 10$
- Number of inactive coils $= 4$
- Free length of the spring $= 500 \ mm$
- The outside diameter of the spring $= 100 \ mm$

<a id="subsection-b"></a>
### Objectives

The objective is to compute the deflection of the spring and the maximum shear stress in it when a load of $25 \ kg$ is placed on the load carrier. The load carrier weighs $500 \ g$, resulting in a pre-load of $5 \ N$.

<a id="subsection-c"></a>
### Solution

A systematic procedure to create and analyze the spring sub-assembly is carried out according to the following steps:

<ol>
  <li><a href="#subsubsection-a">Part A: Creating the model of the spring</a></li>
  <li><a href="#subsubsection-b">Part B: Creating the simulation study</a></li>
  <li><a href="#subsubsection-c">Part C: Meshing and post-processing of results</a></li>
</ol>

<a id="subsubsection-a"></a>
***Part A: Creating the model of the spring***

The the spring sub-assembly in the spring-based weighing system consists of three components that are used for the simulation, with the following major geometric dimensions:

- The ***helical spring*** with $100 \ mm$ outer diameter of the spring; $500 \ mm$ free length of the spring and $10 \ mm$ diameter of the spring's wire. 
- The ***spring support hub*** with $112 \ mm$ of internal diameter; $130 \ mm$ outer diameter and $10 \ mm$ depth.
- The ***load platen*** consisting of a solid bottom with $112 \ mm$ diameter and $20 \ mm$ height, and a top part with $95 \ mm$ outer diameter, $80 \ mm$ internal diameter and $20 \ mm$ depth.

***Creating the helix profile of the variable pitch spring***

The basis of the spring is the helix guide curve. This could be generated by specifying the following geometric details:

- A reference circle matching the diameter of the helix
- The height of the helix corresponding to the free length of the spring
- The pitch, which is the distance between two identical points along the axial
direction of the helix
- The revolution, which is the number of complete turns of the helix

First a reference circle of diameter $100 \ mm$ is sketched on the ***Top Plane***, then the ***Helix/Spiral*** property manager is launched to create the helix guide curve with the details shown in <a href="#figure2">Figure 2</a>. For this, the ***Variable pitch*** option (under ***Parameters***) is used. The first two coils and the last two coils are set to act as inactive coils.

<center>
    <p>
    <figure id="figure2" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/fe-solidworks-components-solid-elements/Figure2.png" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 2: An illustration of the shapes and nodes of hexahedral and tetrahedral elements</figcaption>
    </figure>
    </p>
</center>

Then the cross-section of the spring wire is added.

***Creating a new plane and the cross-section of the spring wire***

To create this cross-section of the wire a new plane.