---
layout: single # archive

title: Analyzing and Solving Stress and Deflection Problems, Analytically and Numerically, by Using MATLAB
excerpt: "Using symbolical and numerical MATLAB as a tool to analyze and solve stress and deflection problems through creating specific functions dealing with machine components design."
myLink: /de/mca-stress-deflection-de/ # Custom Variable
# author_profile: true
last_modified_at: 2024-01-01
date: 2024-01-01
published: true
tagsen:
  - MATLAB
  - Machine Component Analysis
  - Stress Analysis
  - Machine Component Design
  - Strength of Materials

toc: true
toc_label: "Table of contents"
toc_icon: "cog"
toc_sticky: true

header:
  image: /assets/img/mca-stress-deflection/Figure6.jpg
  teaser: assets/img/mca-stress-deflection/Figure6.jpg
---

<br>

<a id="problem1"></a>
## PROBLEM 1: Axial Stresses and Deformations

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


<a id="problem2"></a>
## PROBLEM 2: Bending and Shear Stresses

<a id="subsection-a"></a>
### Problem Description

A Lever $(1)$ with length $AC = l$ is fit on a tapered lever bar $(2)$ denoted by $AB$. The lever is subjected at its end to a horizontal force $F$, as shown in <a href="#figure4">Figure 4</a>. The lever bar has radius $r$ and length $d$.

For the numerical application the following values could be used:

<ul style='list-style-type: none'>
  <li>$F = 250 \hspace{1pt} N$</li>
  <li>$d = 200 \hspace{1pt} mm$</li>
  <li>$l = 250 \hspace{1pt} mm$</li>
  <li>$h = 50 \hspace{1pt} mm$</li>
  <li>$r = 9 \hspace{1pt} mm$</li>
</ul>

<center>
    <p>
    <figure id="figure4" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/mca-stress-deflection/Figure4.png" alt="Figure 4">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 4: Lever under loading</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-b"></a>
### Objectives

- Determining the normal and shear stresses of an element located on the free surface of lever bar $(2)$ at a distance $h$ from the hexagonal base (the element is parallel to the plane determined by the axes $x$, $y$).
- Constructing the Mohr's circle and determining the principal planes and stresses.

<a id="subsection-c"></a>
### Solution

The force $F$ causes bending moment (pure bending) and a torque (twisting moment) on the bar. Thus, bending induces bending stresses, which are normal stresses, and shear stresses distributed over the cross section.

The normal and shear stresses of a general element parallel to the plane determined by the axes $x$, $y$ located at a distance $h$ from the hexagonal base are $\sigma_{y}$ and $\tau_{yz}$ respectively.

**Bending Stresses**

$\sigma_{y}$ is the bending stress distribution over the bending height, for the case of pure bending:

$$
\sigma_{y}(z)=\frac{M_{b,x}}{I_{x}}\cdot z
$$

The different subscripts express that the bending stress in $y$ direction is distributed over the bending height defined here by the $z$ coordinate, and $x$ is the neutral axis.

- $M_{b,x}$ is the bending moment, it equals to:

$$
M_{b,x}=F\cdot (d-h)
$$

- $I_{x}$ is the area moment of inertia (also referred to as second moment of area). It is a geometrical property of a shape describing the distribution of points around an axis. In classical mechanics it is used as a measure of a body's resistance against bending. For a circular cross-section it equals to:

$$
I_{x} = \frac{\pi D^{4}}{64} = \frac{\pi r^{4}}{4}
$$

- The bending height $z$ is the perpendicular distance of a point along the cross-section of the bar from its neutral axis, and when calculating the maximum bending stress then $z$ equals to $r$, because it is where the bending stress is at its maximum value along the cross-section.

The bending stress equation shows that the bending stress increases linearly as the bending moment and the distance from the neutral axis increase, and it decreases as the area moment of inertia increases. The maximum stress occurs at the fibers furthest from the neutral axis. The term $\frac{z}{I_{x}}$ depends only on the geometry of the cross-section.

Thus, the maximum bending stress equals to:

$$
\sigma_{y}=\frac{M_{b,x}}{I_{x}}\cdot r
$$

**Shear Stresses**

Torsion is the twisting of an object, caused by a moment acting about the object's longitudinal axis. A moment which tends to cause twisting is called torque.

Torsion generates shear stresses and strains within the bar. Both shear strains and shear stresses increase linearly with the distance from the centre of the cross-section, with the maximum shear stress and shear strain occurring on the outer surface.

The maximum shear stress due to torsion for a circular cross-section is given by the equation:

$$
\tau = \frac{T_{y}\cdot r}{J_{p}}
$$

This means, shear stress is a function of
- the torque $T_{y}$,here: around the $y$ axis,
- the distance from the centre of the cross-section, here: equal to $r$; the distance to the edge, 
- and the polar moment of inertia $J_{p}$.

For a circular cross section, the polar moment of inertia is:

$$
J_{p} = \frac{\pi \cdot r^{4}}{2}
$$

The torque $T_{y}= F \cdot l$.

$$
\Rightarrow \tau = \frac{2F \cdot l}{\pi \cdot r^{3}}
$$

**Stress Transformation and Mohr's Circle**

Considering a 2D stress element, corresponding to a state of plane stress (for example the $xy$-plane), the four faces of the element are under normal stresses and shear stresses. Supposing that this element is cut by an oblique plane with a normal at an arbitrary angle $\phi$ counterclockwise from the $x$ axis, then the values of the normal and shear stresses could be calculated by using the *stress transformation equations*:

$$
\sigma = \frac{\sigma_{x}+\sigma_{y}}{2}+\frac{\sigma_{x}-\sigma_{y}}{2}\cdot cos(2\phi)+\tau_{xy}\cdot sin(2\phi)
$$

$$
\tau = \frac{\sigma_{x}-\sigma_{y}}{2}\cdot sin(2\phi)+\tau_{xy}\cdot cos(2\phi)
$$

Differentiating the first equation with respect to $\phi$ and setting the result equal to zero maximizes $\sigma$ and gives:

$$
tan(2\phi)=\frac{2\tau_{xy}}{\sigma_{x}-\sigma_{y}}
$$

This equation defines two particular values for the angle $2\phi$, one of which defines the *maximum normal stress* $\sigma_{1}$ and the other, the *minimum normal stress* $\sigma_{2}$. These two stresses are called the *principal stresses*, and their corresponding directions, the *principal directions*. The angle between the two principal directions is $90°$. This equation can be obtained from the seond equation of the stress transformation equations by seeting $\tau =0$, meaning that the perpendicular surfaces containing principal stresses have zero shear stresses.

An important thing to note is that angles in Mohr's circle are doubled compared to the stress element's rotation angle. For example, by observing Mohr's circle, there is a $180$ degree angle between the minimum and maximum principal stresses, whereas on the stress element the angle is $90$ degrees. This is why $2\phi$ notation is used on Mohr's circle. $\phi$ is the angle of rotation of the stress element, and $2\phi$ is the corresponding angle on Mohr's circle.

Formulas for the two principal stresses can be obtained by substituting the angle $2\phi$ in the first stress transformation equation:

$$
\sigma_{1}, \sigma_{2} =\frac{\sigma_{x}+\sigma_{y}}{2}\pm \sqrt{({\frac{\sigma_{x}-\sigma_{y}}{2})^{2}}+\tau_{xy}^{2}}
$$

In a similar manner, by differentiating the second stress transformation equation with respect to $\phi$ and setting the result equal to zero gives:

$$
tan(2\phi)=-\frac{\sigma_{x}-\sigma_{y}}{2\tau_{xy}}
$$

This defines the two values of $2\phi$ at which the *shear stress* $\tau$ reaches an *extreme value* (not maximum). The angle between the two surfaces containing the maximum shear stresses is $90°$.

Formulas for the two extreme-value shear stresses are obtained by substituting the angle $2\phi$ in the second stress transformation equation:

$$
\tau_{1}, \tau_{2} =\pm \sqrt{({\frac{\sigma_{x}-\sigma_{y}}{2})^{2}}+\tau_{xy}^{2}}
$$


<a id="subsubsection-a"></a>
#### Analytical solution

The MATLAB program starts with the declaration of variables as symbolic scalar variables by using <code>syms</code> function:

{% include codes/mca-stress-deflection/m17.html %}

Then, the normal and shear stresses are calculated in MATLAB with:

{% include codes/mca-stress-deflection/m18.html %}

This results in the following output:

{% include codes/mca-stress-deflection/m19.html %}

Then the element orientation and principal stresses are calculated in MATLAB with:

{% include codes/mca-stress-deflection/m20.html %}

For this, the user created function <code>mohr2D(sigma_x,sigma_y,tau,phi)</code> is required, to calculate:

<ul>
  <li>the maximum normal stress $\sigma_{1}$ (<code>sigma_max</code>) and minimum normal stress $\sigma_{2}$ (<code>sigma_min</code>). Mohr's circle crosses the horizontal axis at these two locations, as the shear stress is zero. These two values can also be calculated by taking the $x$ coordinate of the circle's center, and adding or subtracting the circle radius</li>
  <li>the radius (<code>radius</code>) of the Mohr's circle, which equals to $\sqrt{({\frac{\sigma_{x}-\sigma_{y}}{2})^{2}}+\tau_{xy}^{2}}$, which is also the value of the maximum shear stress</li>
  <li>the center (<code>center_circle</code>) of the Mohr's circle, which is at $(\frac{\sigma_{x}+\sigma_{y}}{2},0)$</li>
  <li>the angle $\phi$, named <code>phi</code> in the code, between the original stress element and the principal planes. $tan(2\phi)$ is named <code>phi_p</code> in the code.</li>
</ul>

This function is created by the following code:

{% include codes/mca-stress-deflection/m21.html %}

And the output of this code is:

{% include codes/mca-stress-deflection/m22.html %}

<a id="subsubsection-b"></a>
#### Numerical solution

For numerical calculations, the numerical data for the applied force $F$, the length of the lever $l$, the lever bar's radius $r$ and length $d$, and the distance $h$ of the element on the lever bar are introduced in MATLAB as input with the code:

{% include codes/mca-stress-deflection/m23.html %}

The numerical values for the equivalent force system; torque $T_{y}$, force $F$ and bending moment $M_{b,x}$, is calculated and printed in MATLAB with:

{% include codes/mca-stress-deflection/m24.html %}

resulting in:

{% include codes/mca-stress-deflection/m25.html %}

The numerical values for the stress orientation and principal stresses are calculated and displayed in MATLAB with:

{% include codes/mca-stress-deflection/m26.html %}

resulting in:

{% include codes/mca-stress-deflection/m27.html %}

<a id="subsubsection-c"></a>
#### Graphical representation

The graphical representation of the Mohr's circle (<a href="#figure5">Figure 5</a>) is obtained in MATLAB by calling the user created function <code>mohr2Ddraw</code>:

{% include codes/mca-stress-deflection/m28.html %}

<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/mca-stress-deflection/Figure5.png" alt="Figure 5">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 5: Mohr's circle</figcaption>
    </figure>
    </p>
</center>

The code for the <code>mohr2Ddraw</code> function is:

{% include codes/mca-stress-deflection/m29.html %}

