---
layout: single # archive

title: 'Artificial Neural Networks and its Application for Industrial Fault Diagnosis of Connecting Rods of Compressors: Introduction and Applications'
excerpt: "Creating neural networks by using MATLAB and applying it to solve technical problems like pattern recognition for correct sorting of parcels and classification for fault diagnosis of compressor connecting rods."
myLink: /de/nn-parcel-rod-de/ # Custom Variable
# author_profile: true
last_modified_at: 2024-01-15
date: 2024-01-15
published: true
tagsen:
  - MATLAB
  - Quality Assurance
  - Data Analysis
  - Neural Networks
  - Artificial Intelligence
  - Fault Diagnosis


toc: true
toc_label: "Table of contents"
toc_icon: "cog"
toc_sticky: true

header:
  #image: /assets/img/mca-stress-deflection/Figure6.jpg
  #teaser: assets/img/mca-stress-deflection/Figure6.jpg
---

<img align="right" width="25%" heighth="auto" src="/assets/img/work_in_progress.png" alt="Figure">

<br>
Creating neural networks by using MATLAB and applying it to solve technical problems like pattern recognition for correct sorting of parcels and classification for fault diagnosis of compressor connecting rods.

<a id="section-a"></a>
## Neuron Model and Transfer Functions

<a id="subsection-a"></a>
### 1. Neuron Model

The fundamental building block for neural networks is the single-input neuron illustrated in <a href="#figure1">Figure 1</a>. There are three functional operations in a neuron.
<ul>
  <li>First, the scalar input $p$ is multiplied by the scalar weight $w$ to form the scalar product $wp$. This process is called the weight function.</li>
  <li>Second, the weighted input $wp$ is added to the scalar bias $b$ (also called "offset"), which is like a weight but with a constant input of $1$, to form the net input $n$. This process is called the net input function.</li>
  <li>Finally, the net input $n$ is passed through the transfer function $f$ (also called "activation function"), which produces the scalar output $a$. This process is called the transfer function. Without specifying the transfer function the output of the neuron cannot be determined.</li>
</ul>

<center>
    <p>
    <figure id="figure1" style='display: table; width: 55%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure1.png" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 1: Single-input neuron</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-a"></a>
### 2. Transfer Functions

There are numerous commonly used activation functions. In the following code four activation functions are computed and plotted for a net input $n$:

<ol style="list-style: none;">
  <li>Hyperbolic tangent sigmoid transfer function: $$a=f\left(n\right)=\mathrm{tansig}\left(n\right)=\frac{2}{1+e^{-2n} }-1$$</li>
  <li>Exponential transfer function: $$a=f\left(n\right)=\frac{2}{1+e^{-n} }-1$$</li>
  <li>Hard-limit transfer function: $$a=f\left(n\right)=\mathrm{hardlim}\left(n\right)=\left\lbrace \begin{array}{ll}
1 & \mathrm{if}\;n\ge 0\\
0 & \mathrm{otherwise}
\end{array}\right.$$</li>
  <li>Linear transfer function: $$a=f\left(n\right)=\mathrm{purelin}\left(n\right)=n$$</li>
</ol>

where the net input $n=\mathbf{Wp}+b=2p+3$ when the weight $w$ on the single input $p$ is $2$ and the bias $b$ is $3$.

The exponential transfer function is normalized and offset from zero so that the output ranges from $−1$ to $1$.

The hyperbolic tangent sigmoid transfer function (<code>tansig</code> or <code>tanh</code>) and the exponential transfer function are very similar. They put bounds on the output. In this case, within the range $−3 ≤ n < 1$, where they return the function of the input. Outside those bounds, they return $-1$ or $1$.

The hard-limit transfer function (<code>hardlim</code>) returns $0$ if the value is less than a threshold value and $1$ if it is greater than or equal to that threshold, here $−1.5$.

The linear transfer function simply calculates the neuron's output by simply returning the value $n$ passed to it.

The following code computes and plots these four activation functions for a net input $n$:

{% include codes/nn-parcel-rod/m1.html %}

<center>
    <p>
    <figure id="figure2" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure2.png" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 2: Graphical representation of the activation functions</figcaption>
    </figure>
    </p>
</center>

The central idea of neural networks is adjusting the adjustable scalar parameters, $w$ and $b$, of the neuron so that the network exhibits some desired or interesting behavior. This procedure is referred to as perceptron learning rule or training algorithm.

<a id="section-b"></a>
## Multiple-Input Neuron

The simple neuron can be extended to handle inputs that are vectors. A neuron with a single Two-element input vector $(R=2)$ is shown in <a href="#figure1">Figure 3</a>, where the individual input elements $p_1$ and $p_2$ are multiplied by weights $w_{1,1}$ and $w_{1,2}$ of the neuron (here, there is one neuron) and the weighted values are fed to the summing junction. Their sum is simply $\textbf{Wp}$, the dot product, which is simply the sum of the componentwise products of the vector components, of the (single row) matrix $\textbf{W}$ and the vector $\textbf{p}$. The neuron has a bias (offset) $b$, which is summed with the weighted inputs to form the net input $n$. The net input $n$ is the argument of the transfer function $f$.

$$n=w_{1,1} \cdot p_1 +w_{1,2} \cdot p_2 +b$$

<center>
    <p>
    <figure id="figure3" style='display: table; width: 55%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure3.png" alt="Figure 3">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 3: Two-input neuron</figcaption>
    </figure>
    </p>
</center>

A decision boundary is determined by the input vectors for which the net input $n$ is zero.

$$n=w_{1,1} \cdot p_1 +w_{1,2} \cdot p_2 +b=0$$

This defines a boundary in the input space (feature space), a linear separator, dividing the input space into two parts. An input space comprises all potential sets of values for input. If the inner product of the weight matrix $\textbf{W}$ (a single row vector in this case) with the input vector $\textbf{p}$ is greater than or equal to $-b$, the output will be positive $(n>1)$, otherwise the output will be negative $(n<1)$. <a href="#figure4">Figure 4</a> illustrates this for the case where $b = -3$. The blue line in the figure, the linear separator,in three dimensions, it is called a plane or hyperplane, and it represents all points for which the net input $n$ is equal to zero and thus, in the input-output space, the outcome of transfer function $f$, in this case, the hyperbolic tangent sigmoid transfer function, is also zero. The shaded region contains all input vectors for which the output of the network will be closer or equal to $1$. The output will be closer or equal to $-1$ for all other input vectors (the unshaded region).

Basically, there are an infinite set of equations all of which represent the same separator, because multiplying both sides of the equation by any number won't affect the equality.

<center>
    <p>
    <figure id="figure4" style='display: table; width: 65%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure4.png" alt="Figure 4">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 4: Decision boundary for two-input perceptron</figcaption>
    </figure>
    </p>
</center>

The decision boundary, a hyperplane,  will always be orthogonal to the weight matrix, and the position of the boundary can be shifted by changing $b$. To clarify, from the definition of orthogonality in mathematics, two vectors are orthogonal in Euclidean space if and only if their dot product is zero, i.e. they make an angle of $90°$. Also, from the definition of hyperplane in geometry, a hyperplane is a subspace whose dimension is one less than that of its ambient space (surrounding space). So in a two dimensional space a hyperplane would be a line.

Considering an $n$-dimensional space, a plane is defined by the equation:

$$\left(w_1 p_1 \right)+\left(w_2 p_2 \right)+\left(w_3 p_3 \right)+\ldotp \ldotp \ldotp \left(w_n p_n \right)+b=0$$

$$\Rightarrow \mathit{\mathbf{w}}\cdot {\mathit{\mathbf{p}}}^T +b=0$$

where $\textbf{w}$ and $\textbf{p}$ are both length-$n$ vectors. $\textbf{w}$ is a vector orthogonal to the plane which contains the vector $\textbf{p}$ and $b$ is proportional to the perpendicular distance from the origin to the plane (the decision boundary). The constant of proportionality is the negative of the magnitude of the normal vector.

To summarize, in general, the goal of learning in a single output perceptron is to adjust the separating hyperplane (i.e., linear decision boundary) that divides an $n$-dimensional "input space," where $n$ is the number of net inputs, by modifying the weights and the bias until all the input vectors with target value $1$ are on one side of the hyperplane, and all the input vectors with target value $0$ or $-1$, depending on the activation function, are on the other side of the hyperplane. In a nework with multiple neurons, $\textbf{W}$ is a matrix consisting of a number of row vectors, each of which will be used in an equation similar to the above one. There will be one boundary for each row of $\textbf{W}$.

The key property of the single-neuron perceptron, therefore, is that it can separate input vectors into two categories. Because the boundary is linear, the single-layer perceptron can only be used to classify inputs that are linearly separable (can be separated by a linear boundary).

To define a network the following problem specifications are helpful:

<ol>
  <li>Number of network inputs = number of problem inputs</li>
  <li>Number of neurons in output layer = number of problem outputs</li>
  <li>Output layer transfer function choice at least partly determined by problem specification of the outputs</li>
</ol>

<a id="subsection-a"></a>
### Problem Description

Calculating the output of a simple neuron.

<a id="subsection-b"></a>
### Steps

<ol>
  <li><a href="#subsubsection-a">Defining neuron parameters</a></li>
  <li><a href="#subsubsection-b">Defining the input vector</a></li>
  <li><a href="#subsubsection-c">Calculating neuron output</a></li>
  <li><a href="#subsubsection-d">Plotting neuron output over the range of inputs</a></li>
</ol>

<a id="subsubsection-a"></a>
**1. Defining neuron parameters**

Considering a two-input perceptron with one neuron as shown in Figure 2 above and assigning the following values for the weights and bias as follows: 

{% include codes/nn-parcel-rod/m2.html %}

In the case of single neuron, the scalar net input $n$ to the tranfer function $f$, which produces the scalar neuron output $a$, is given by:

$$n=\ \mathit{\mathbf{p}}*\ {\mathit{\mathbf{W}}}^T +b={\left[\begin{array}{cc}
p_1  & p_2 
\end{array}\right]}\cdot {\left[\begin{array}{cc}
4  & -2 
\end{array}\right]^{T}} -3=4p_1 -2p_2 -3$$


<a id="subsubsection-b"></a>
**2. Defining the input vector**

{% include codes/nn-parcel-rod/m3.html %}


<a id="subsubsection-c"></a>
**3. Calculating neuron output**

The output of this network is determined by a transfer function, for example the hyperbolic tangent sigmoid transfer function <code>tansig</code>.

{% include codes/nn-parcel-rod/m4.html %}

{% include codes/nn-parcel-rod/m5.html %}

<a id="subsubsection-d"></a>
**4. Plotting neuron output over the range of inputs**

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
