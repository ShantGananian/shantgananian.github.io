---
layout: single # archive

title: Analytische und numerische Analyse und Lösung von Spannungs- und Biegungsproblemen mithilfe von MATLAB
excerpt: " "
myLink: /en/mca-stress-deflection/ # Custom Variable
# author_profile: true
last_modified_at: 2024-01-01
date: 2024-01-01
published: true
tagsen:
  - MATLAB
  - Maschinenbauteil-Analyse
  - Festigkeitsberechnung

toc: true
toc_label: "Inhaltsübersicht"
toc_icon: "cog"
toc_sticky: true

header:
  image: /assets/img/mca-stress-deflection/Figure3.png
  teaser: assets/img/mca-stress-deflection/Figure3.png
---

<img align="right" width="25%" heighth="auto" src="/assets/img/laufende-arbeiten.png" alt="Figure">



<br>


<a id="problem1"></a>
## PROBLEM 1

<a id="subsection-a"></a>
### Problem Description

A rigid plate $\mathit{B}$ is fastened to both bars $\mathit{A}$ and $\mathit{C}$, as shown is <a href="#figure1">Figure 1</a>. Bar $\mathit{C}$ is fastened to bar $\mathit{D}$, which has its end fastened to a rigid support. The end of bar $\mathit{A}$ is free. $l_{A}$, $l_{C}$, $l_{D}$ are the lengths of the bars $\mathit{A}$, $\mathit{C}$, and $\mathit{D}$ respectively, and their diameters are $d_{A}=d$, $d_{C}=d$, and $d_{D}=1.5d$. Load $F_{1}$ is applied to the rigid plate $\mathit{B}$ $($distributed uniformly around the circumference of the rigid plate $\mathit{B})$, and load $F_{2}$ is applied at the centroid of the end cross-section of bar $\mathit{B}$.

<center>
    <p>
    <figure id="figure1" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/mca-stress-deflection/Figure1.jpg" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 1: Axial bar under loading</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-b"></a>
### Objectives

Determinining the **axial stresses** in bars $\mathit{A}$, $\mathit{C}$, and $\mathit{D}$, **deformations** of the bars and **total deformation** of the system.

For the numerical application the following values could be used:

<ul style='list-style-type: none'>
  <li>$F_{1} = 64000 \hspace{1pt} N$</li>
  <li>$F_{2} = 192000 \hspace{1pt} N$</li>
  <li>$d = 45 \hspace{1pt} mm$</li>
  <li>$l_{A} = 170 \hspace{1pt} mm$</li>
  <li>$l_{C} = 144.5 \hspace{1pt} mm$</li>
  <li>$l_{D} = 255 \hspace{1pt} mm$</li>
  <li>Young’s modulus $E = 21\cdot10^4 \hspace{1pt} MPa$</li>
</ul>

<a id="subsection-c"></a>
### Solution

<a id="subsubsection-a"></a>
#### Analytical solution

The bar is divided into components, and the internal forces are calculated, passing sections through each component. Free-body diagrams are developed for portions of the bar, as shown in <a href="#figure2">Figure 2A</a>.

<center>
    <p>
    <figure id="figure2" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/mca-stress-deflection/Figure2.jpg" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 2: Free-body diagrams</figcaption>
    </figure>
    </p>
</center>

The free-body diagram of the system, namely bar $\mathit{D}$, bar $\mathit{C}$, plate $\mathit{B}$, and bar $\mathit{A}$, contains only one unknown force; the reaction force $\mathit{R}$ at the rigid support. From the equilibrium equation of the system, reaction $\mathit{R}$, or the reaction force of the rigid support on bar D, is:

$$
\sum_{}^{}\mathrm{F}_{x}^{A,B,C,D}=0 \Leftrightarrow R+F_{1}-F_{2}=0\Leftrightarrow R = F_{2}-F_{1}
$$

The MATLAB program starts with the declaration of variables as symbolic scalar variables by using <code>syms</code> function:

{% include codes/mca-stress-deflection/m1.html %}

Then, the internal forces are calculated for each portion of the bar. The equilibrium equation of the free-body diagram for bar $A$, in the interval $3–4$, <a href="#figure2">Figure 2B</a>,  gives the internal force $T_{34}$:

$$
\sum_{}^{}\mathrm{F}_{x}^{}=0 \Leftrightarrow T_{34}-F_{2}=0\Leftrightarrow T_{34}=F_{2}
$$

For the interval 1–3, <a href="#figure2">Figure 2C</a>, the equilibrium equation of the free-body diagram gives the internal force $T_{13}$:

$$
\sum_{}^{}\mathrm{F}_{x}^{}=0 \Leftrightarrow T_{13}+F_{1}-F_{2}=0\Leftrightarrow T_{13}=F_{2}-F_{1}
$$

The above obtained equilibrium equations are written in MATLAB as follows: 

{% include codes/mca-stress-deflection/m2.html %}

The cross-section areas of each bar $A$, $C$, and $D$ are calculated as follows:

<ul style='list-style-type: none'>
  <li>$A_{A}=\frac{\pi d_{A}^{2}}{4}$</li>
  <li>$A_{C}=\frac{\pi d_{C}^{2}}{4}$</li>
  <li>$A_{D}=\frac{\pi d_{D}^{2}}{4}$</li>
</ul>

In MATLAB, the cross-section areas are calculated and the results are printed with:

{% include codes/mca-stress-deflection/m3.html %}

The axial stresses on bars $A$, $C$, $D$, namely $\sigma_{A}$, $\sigma_{C}$, and $\sigma_{D}$, are calculated using:

<ul style='list-style-type: none'>
  <li>$\sigma_{A}=\sigma_{34}=\frac{T_{34}}{A_{A}}=\frac{F_{2}}{A_{A}}=\frac{4F_{2}}{\pi d_{A}^{2}}$</li>
  <li>$\sigma_{C}=\sigma_{23}=\frac{T_{13}}{A_{C}}=\frac{F_{2}-F_{1}}{A_{C}}=\frac{4(F_{2}-F_{1})}{\pi d_{C}^{2}}$</li>
  <li>$\sigma_{D}=\sigma_{12}=\frac{T_{13}}{A_{D}}=\frac{F_{2}-F_{1}}{A_{D}}=\frac{4(F_{2}-F_{1})}{\pi d_{D}^{2}}$</li>
</ul>

In MATLAB, the axial stresses are calculated with:

{% include codes/mca-stress-deflection/m4.html %}

Considering the followings:

<ul style='list-style-type: none'>
  <li><b>Hooke's law of elasticity</b>: $\sigma=E\epsilon$, that is, for small deformations, the stress is directly proportional to the strain (that produced it),</li>
  <li>and the <b>elastic strain</b> expression: $\epsilon=\frac{\delta}{l}$, where $l$ is the bar length, $\epsilon$ is the Greek symbol used to designate strain (dimensionless), $\delta$ is the total strain (or bar elongation),</li>
</ul>

  the axial displacements (i.e. the amount of elongation obtained by applying tensile load to a straight bar) of bars $C$, $D$ and the system are calculated from:

<ul style='list-style-type: none'>
  <li>$\delta_{12}=\frac{T_{13}l_{D}}{A_{D}E}=\frac{(F_{2}-F_{1})l_{D}}{A_{D}E}$; the axial displacement of bar $D$.</li> 
  <li>$\delta_{23}=\frac{T_{13}l_{C}}{A_{C}E}=\frac{(F_{2}-F_{1})l_{C}}{A_{C}E}$; the axial displacement of bar $C$.</li>
  <li>$\delta_{13}=\delta_{12}+\delta_{23}=\frac{T_{13}l_{D}}{A_{D}E}=\frac{(F_{2}-F_{1})l_{D}}{A_{D}E}+\frac{(F_{2}-F_{1})l_{C}}{A_{C}E}=\frac{(F_{2}-F_{1})}{E}\left( \frac{l_{D}}{A_{D}}+\frac{l_{C}}{A_{C}} \right)$; the axial displacement of bars $D$ and $C$.</li>
  <li>$\delta_{34}=\frac{T_{34}l_{A}}{A_{A}E}=\frac{F_{2}l_{A}}{A_{A}E}$; the axial displacement of bar $A$.</li>
  <li>$\delta_{14}=\delta_{13}+\delta_{34}=\frac{(F_{2}-F_{1})}{E}\left( \frac{l_{D}}{A_{D}}+\frac{l_{C}}{A_{C}} \right) +\frac{F_{2}l_{A}}{A_{A}E}$; the total axial displacement of the system.</li>
</ul>

In MATLAB, the axial displacement of the bars and system are calculated with:

{% include codes/mca-stress-deflection/m5.html %}

<a id="subsubsection-b"></a>
#### Numerical solution

To numerically calculate the axial stress and displacements, first the numerical data, given in the problem description, is introduced into the MATLAB code and then the symbolic variables are substituted with the numerical data. For the first part, two *cell arrays* are introduced. The string values (the symbolic variables) of the numerical data are put into cell array <code>lists</code> and their numerical values in cell array <code>listn</code>. For the second part, MATLAB's symbolic substitution function <code>subs</code> is used to replace the symbolic variables in <code>lists</code> with their respective values from the <code>listn</code>, then they are displayed on the screen.

{% include codes/mca-stress-deflection/m6.html %}

In a similar way the numerical values of each bar diameter are displayed and values of cross-section are calculated by using MATLAB's <code>eval</code> function then displayed: MATLAB with:

{% include codes/mca-stress-deflection/m7.html %}

The numerical values of each bar length are expressed in MATLAB by:

{% include codes/mca-stress-deflection/m8.html %}

Finally, the numerical values of the axial stresses are calculated and displayed in MATLAB with:

{% include codes/mca-stress-deflection/m9.html %}

and the results are:

{% include codes/mca-stress-deflection/m10.html %}

The numerical values of the axial displacement of the bars and the system are calculated in MATLAB with:

{% include codes/mca-stress-deflection/m11.html %}

and the results are:

{% include codes/mca-stress-deflection/m12.html %}

<a id="subsubsection-c"></a>
#### Diagrams

The force, stress and displacement diagrams (<a href="#figure3">Figure 3</a>) are obtained using the following MATLAB code:

{% include codes/mca-stress-deflection/m13.html %}

<center>
    <p>
    <figure id="figure3" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/mca-stress-deflection/Figure3.png" alt="Figure 3">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 3: Force, stress and displacement diagrams</figcaption>
    </figure>
    </p>
</center>

Three MATLAB functions are used to obtain the diagrams, namely: <code>ForceDdraw</code>, <code>StressDdraw</code> and <code>DisplacementDdraw</code>, by using the <code>line</code> function, which takes two input arguments. This function plots lines in the current axes by connecting the data in both input vectors (or matrices). In this case, both input arguments are vectors, where the first vector is the $x$-coordinates and the second vector the $y$-coordinates. Because both input vectors are of equal length, the <code>line</code> function plots a single line each time it is used. The codes for the three MATLAB functions are as follows:

<ul style='list-style-type: none'>
  <li>The MATLAB function <code>ForceDdraw</code> is:</li>

  {% include codes/mca-stress-deflection/m14.html %}

  <li>The MATLAB function <code>StressDdraw</code> is:</li>

  {% include codes/mca-stress-deflection/m15.html %}

  <li>The MATLAB function <code>DisplacementDdraw</code> is:</li>

  {% include codes/mca-stress-deflection/m16.html %}

</ul>
