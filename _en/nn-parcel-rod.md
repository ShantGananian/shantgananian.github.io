---
layout: single # archive

title: 'Artificial Neural Networks and its Application to Industrial Fault Diagnosis of Connecting Rods in Compressors: Introduction and Applications'
excerpt: "Creating neural networks by using MATLAB and applying it to solve technical problems such as pattern recognition for correct sorting of parcels and classification for fault diagnosis of compressor connecting rods."
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

The next lines of code shows the top view of the input-output space plot, <a href="#figure6">Figure 6</a>, which is the input-space, where the intersection of the decision boundary with the transfer function curves is a line, similar to the linear separator previously illustrated in <a href="#figure4">Figure 4</a>.

{% include codes/nn-parcel-rod/m7.html %}

<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure6.png" alt="Figure 6">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 6: Decision boundary as seen in the input-space (top view)</figcaption>
    </figure>
    </p>
</center>

<a id="section-c"></a>
## Multiple-Neuron Perceptron

As mentioned earlier, each neuron has a single decision boundary. A single-neuron perceptron can classify input vectors into two categories, as its output can be either $0$ or $1$. A multiple-neuron perceptron can classify inputs into many categories. Each category is represented by a different output vector. Since each element of the output vector can be either $0$ or $1$, there are a total of possible $2^S$ categories, where $S$ is the number of neurons. For a perceptron with multiple neurons the decision boundary for each neuron $i$ will be defined by:

$$_{i}\mathbf{w}^{T}\cdot \textbf{P} + \mathit{b}_{i}= 0$$

<a id="section-d"></a>
## Perceptron Learning Rule

By learning rule is meant a procedure (an algorithm) for modifying the weights and biases of a network. (This procedure is also referred to as a training algorithm). The purpose of the learning rule is to train the network to perform some task, like solving a classification problem. There are many types of neural network training algorithms (learning rules). They fall into three broad categories: supervised learning, unsupervised learning and reinforcement (or graded) learning.

In ***supervised learning***, the learning rule is provided with a set of examples (the training set) of proper network behavior (inputs and their target outputs):

$$\left\{ \textbf{p}_{1}, \textbf{t}_{1} \right\}, \left\{ \textbf{p}_{2}, \textbf{t}_{2} \right\}, ..., \left\{ \textbf{p}_{q}, \textbf{t}_{q} \right\},$$

where $\textbf{p}_q$ is an input to the network and $\textbf{t}_q$ is the corresponding correct (target) output. As the inputs are applied to the network, the network outputs are compared to the targets. The learning rule is then used to adjust the weights and biases of the network in order to move the network outputs closer to the targets.

***Reinforcement learning*** is similar to supervised learning, except that, instead of being provided with the correct output for each network input, the algorithm is only given a grade. The grade (or score) is a measure of the network performance over some sequence of inputs.

In ***unsupervised learning***, the weights and biases are modified in response to network inputs only. There are no target outputs available.

To begin the training and to construct the learning rules, some initial values are assigned for the network parameters (weights and biases). Then, the input vectors are presented to the network one by one. Each time the network doesn't return the correct value (the target output associated with the input), the weight vector is altered so that it points more toward the input vector. If the network returns the correct value, then there is no need to alter anything. In this way, a single expression is found that resembles a unified learning rule. For this, firs a new variable is defined, the perceptron error $e$:

$$e = t - a$$

where $e$ is the wrong output value (also called error). It equals to $0$ when the network returns the correct output $(t=a)$. In this way, the unified learning rule for multiple-neuron perceptrons in matrix notation is:

$$\textbf{W}^{new} =\textbf{W}^{old} + \textbf{e}\cdot \textbf{P}^{T}$$

and

$$\textbf{b}^{new} =\textbf{b}^{old} + \textbf{e}$$

Although the perceptron learning rule is simple, it is quite powerful. It will always converge to weights that accomplish the desired classification (assuming that such weights exist).

<a id="section-e"></a>
## An Illustrative Example 

The following example is to show how the architectures described in the previous sections can be used to solve a simple practical problem,- a pattern recognition problem, by using three different neural network architectures; a single-layer perceptron (feedforward network) with a symmetric hard-limit transfer function <code>hardlims</code>, a Hamming network (competitive network) and a Hopfield network (recurrent associative memory network).

<a id="subsection-a"></a>
### Problem Description

A central processing station has a parcel sorting machine that through scanning, volumetric and weighing technologies can identify and accurately profile parcels, as shown in <a href="#figure7">Figure 7</a>. When parcels reach a central processing station, various types of parcels may be mixed together. The goal is to sort the parcels according to type. There is a conveyer belt on which the parcel is loaded. This conveyer passes through a set of sensors, that measure three properties of the parcel: ***size***, ***shape*** and ***weight***. Considering that these sensors will output two values $1$ and $-1$. The size sensor will output a $1$ if the parcel is a medium size parcel and a $-1$ if it is a packet. The shape sensor will output a $1$ if the parcel is approximately round and a $-1$ if it is more rectangular. The weight sensor will output a $1$ if the parcel is more than $10$ kilograms and a $-1$ if the parcel is equal to or less than $10$ kilograms.

The three sensor outputs will then be input to a neural network. The purpose of the network is to decide which kind of parcel is on the conveyor, so that the parcel can be directed to the correct direction. To make the problem even simpler, it is assumed that there are only two types of parcels on the conveyor: **Type A** (medium size, rectangular, heavier than 10 kilograms) and **Type B** (packet, rectangular, equal or less than 10 kilograms).

<center>
    <p>
    <figure id="figure7" style='display: table; width: 100%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure7.png" alt="Figure 7">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 7: Parcel sorting machine</figcaption>
    </figure>
    </p>
</center>

<a id="subsection-b"></a>
### Objectives

<ol>
  <li><a href="#subsubsection-e">Designing a perceptron (feedforward network) to recognize patterns</a></li>
  <li><a href="#subsubsection-f">Finding and sketching a decision boundary for the perceptron network that will recognize these prototype patterns</a></li>
  <li><a href="#subsubsection-g">Finding weights and bias which will produce this decision boundary</a></li>
  <li><a href="#subsubsection-h">Designing a Hamming network (competitive network) to recognize these patterns</a></li>
  <li><a href="#subsubsection-i">Designing a Hopfield network (recurrent associative memory network) to recognize these patterns</a></li>
</ol>

<a id="subsection-c"></a>
### Solution

<a id="subsubsection-e"></a>
**1. Designing a perceptron (feedforward network) to recognize patterns**

As each parcel passes through the sensors it can be represented by a three-dimensional vector. The first element of the vector will represent size, the second element will represent shape and the third element will represent weight:

$$
\textbf{p} = \left[\matrix{ p_1\cr p_2\cr p_3} \right] = \left[\matrix{ size \cr shape \cr weight} \right]
$$

Therefore, a **Type A** prototype would be represented by the vector

$$
\textbf{p}_{\textbf{1}} = \left[\matrix{ 1\cr -1\cr 1} \right]
$$

and a **Type B** prototype would be represented by the vector

$$
\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]
$$

The neural network will receive one three-dimensional input vector for each parcel on the conveyer and must make a decision as to whether the parcel is of Type A $(\textbf{p}_1)$ or Type B $(\textbf{p}_2)$.

Because there are only two categories, we can use a single-neuron perceptron. The vector inputs are three-dimensional $(R=3)$, therefore the perceptron equation will be

$$
a = hardlims\left[ \left[\matrix{ w_{1,1} & w_{1,2} & w_{1,3}} \right] \cdot \left[\matrix{ p_1\cr p_2\cr p_3} \right]+b \right] 
$$

<a id="subsubsection-f"></a>
**2. Finding and sketching a decision boundary**

The bias and the elements of the weight matrix are chosen so that the perceptron will be able to distinguish between parcles of Type A and of Type B. For example, the perceptron is configured so that the output wil be $1$ when a Type A parcel is input and $-1$ when a Type B parcel is input. Using the concept illustrated earlier in <a href="#figure4">Figure 4</a>, there is a linear boundary that can separate Type A parcels and Type B parcels. The two prototype vectors are shown in the next two graphs, <a href="#figure8">Figure 8</a> and <a href="#figure9">Figure 9</a>. The figures show the linear boundary that divides these two vectors symmetrically, which is the $p_2, p_3$ plane.

In MATLAB:

{% include codes/nn-parcel-rod/m8.html %}

The MATLAB code for the user created function <code>viewProtypeVect</code>, used in the previous code to plot both views, is as follows:

{% include codes/nn-parcel-rod/m9.html %}

<center>
    <p>
    <figure id="figure8" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure8.png" alt="Figure 8">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 8: 3-D view of prototype vectors and decision boundary</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure9" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure9.png" alt="Figure 9">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 9: 2-D view of prototype vectors and decision boundary (top view)</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-g"></a>
**3. Finding weights and bias which will produce this decision boundary**

The $p_2, p_3$ plane, the decision boundary, can be described by the equation:

$$
p_1 =0
$$

or

$$
\left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ p_1\cr p_2\cr p_3} \right]+0 = 0 
$$

Therefore the weight matrix and bias will be

$$
\textbf{W} = \left[\matrix{ 1 & 0 & 0} \right] ,\quad b = 0
$$

The weight matrix is orthogonal to the decision boundary and points toward the region that contains the prototype pattern Type A for which we want the perceptron to produce an output of 1. The bias is 0 because the decision boundary passes through the origin.

Testing the operation of the perceptron pattern classifier shows that it classifies perfect Type A and Type B  correctly:

- Type A (medium size, rectangular, heavier than 10 kilograms) parcel:

$$
a = hardlims\left[ \left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ 1\cr -1\cr 1} \right]+0\right] = 1 \quad (Type A),
$$

- Type B (packet, rectangular, equal or less than 10 kilograms) parcel:

$$
a = hardlims\left[ \left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ -1\cr -1\cr -1} \right]+0\right] = -1 \quad (Type B).
$$

However, if a not-so-perfect Type B parcel was put into the classifier, for example a Type B  parcel, which is rather round shaped, is passed through the sensors. The input vector would then be

$$
\textbf{p} = \left[\matrix{ -1\cr 1\cr -1} \right]
$$

The response of the network would be

$$
a = hardlims\left[ \left[\matrix{ 1 & 0 & 0} \right] \cdot \left[\matrix{ -1\cr 1\cr -1} \right]+0\right] = -1 \quad (Type B).
$$

In fact, any input vector that is closer to the Type B prototype vector, rather than to the Type A prototype vector (in Euclidean distance), will be classified as an Type B (and vice versa).

In MATLAB, this perceptron design could be coded in the following way:

{% include codes/nn-parcel-rod/m10.html %}

which results in the following output:

{% include codes/nn-parcel-rod/m11.html %}

<a id="subsubsection-h"></a>
**4. Hamming Network**

The Hamming network was designed explicitly to solve binary pattern recognition problems; where each element of the input vector has only two possible values $1$ or $0$, as well as to solve a bipolar pttern recognition problem, as in this example, where the elements of the input vector have values of $1$ or $-1$. Hamming network is a clustering network. It is based on the use of fixed prototype (exemplar) vectors and a recurrent layer.

The Hamming network has two types of layers:

- **feedforward** layer, a **correlation** layer, where all of its neurons are connected to all of the network inputs;
- **recurrent** (backpropagation) layer, a **competitive** layer, where the output of each neuron is connected to exactly one neuron of the input layer.

Some sources name the feedforward layer as the Hamming network, which measures how much the input vector resembles the weight vector of each neuron, and the recurrent or backpropagation layer such as MAXNET; a neural network based on competition that can be used as a subnet to choose the neuron whose activation is the largest.

In the Hamming network the number of neurons $S$ in the first (feedforward) layer is the same as the number of neurons in the second (feedback) layer and it equals to the number of prototype patterns (in this example $S = 2$). Recurrent networks can exhibit temporal behavior.

Whenever an input is presented, the feedforward layer finds out the distance between the weight vector of each neuron, thus the prototype vector, and the input vector via the dot product, while the recurrent layer, i.e. MAXNET, selects the neuron with the greatest dot product. In this way, the whole network selects the neuron, i.e. the prototype vector, with its weight vector closest to the input vector, i.e. the winner.

In this way, the objective of the Hamming network is to decide which prototype vector is closest to the input vector. This decision is indicated by the output of the recurrent layer. There is one neuron in the recurrent layer for each prototype pattern. When the recurrent layer converges, there will be only one neuron with nonzero output. This neuron indicates the prototype pattern that is closest to the input vector.

The **feedforward** layer performs a **correlation**, or inner product, between each of the prototype patterns and the input pattern. For this, the rows of the weight matrix in the feedforward layer, represented by the connection matrix ${\mathbf{W}}^1$ of size $S\times R$ (here $2\times 3$), are set to the prototype patterns $$\textbf{p}_{\textbf{1}}$$ and $$\textbf{p}_{\textbf{1}}$$. $R$ is the number of elements in the input vector (here $R = 3$).

For this illustrative example this would mean:

$$
\textbf{W}^{1} = \left[\matrix{ \textbf{p}_{1}^{T}\cr \textbf{p}_{2}^{T}} \right] = \left[\matrix{ 1 &-1& 1\cr -1 &-1 &-1} \right]
$$

  Note: The superscripts indicate the layer number.

The feedforward layer uses a linear transfer function, and each element of the bias vector is equal to $R$. Thus, the bias vector would be:

$$
\textbf{b}^{1} = \left[\matrix{ R\cr R} \right] = \left[\matrix{ 3\cr 3} \right] 
$$

With these choices for the weight matrix and bias vector, the output of the feedforward layer are equal to the dot products (also called inner products) of each prototype pattern with the input, plus $R$.

$$
\textbf{a}^{1} = \textbf{W}^{1}\textbf{p}+ \textbf{b}^{1}=\left[\matrix{ \textbf{p}_{1}^{T}\cr \textbf{p}_{2}^{T}} \right]\textbf{p}+ \left[\matrix{ 3\cr 3} \right]  =\left[\matrix{ \textbf{p}_{1}^{T}\textbf{p}+3\cr \textbf{p}_{2}^{T}\textbf{p}+3} \right]
$$

This is because for two vectors of equal length (magnitude or norm), their dot product will be largest when the vectors point in the same direction (the cosine of the angle between them equals $1$), and will be smallest when they point in opposite directions (the cosine of the angle between them equals $-1$). In addition to that, to guarantee that the outputs of the feedforward layer are never negative, $R$ is added to the dot product. This is required for proper operation of the recurrent layer.

The output here is a $S\times 1$ column vector matrix and not a scalar as was the case in the single neuron network.

This network is called the Hamming network because the neuron in the feedforward layer with the largest output will correspond to the prototype pattern that is closest in **Hamming distance** to the input pattern. The Hamming distance by definition is the distance between two binary (or bipolar) vectors of equal length, which equals to the number of elements between the two vectors that are different. The feedforward network selects the prototype pattern (the weight vector) that produces a minimum Hamming distance (i.e. the prototype pattern that is closest in Hamming distance to the input pattern). Or in other words, it measures how much the input vector resembles the weight vector of each neuron.

For example, the Hamming distance between the vectors $$\textbf{p}_{\textbf{1}} =\left[\matrix{ 1\cr -1\cr 1} \right]$$ and $$\textbf{p} = \left[\matrix{ 1\cr 1\cr 1} \right]$$ equals to $1$, as they differ in one place. In a similar way, the Hamming distance between $$\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]$$ and $$\textbf{p} = \left[\matrix{ 1\cr 1\cr 1} \right]$$ is $3$, as they differ in three places.

The output of the feedforward layer would be:

$$
\text{a}^{1} =
\left[
\left[\matrix{ 1 &-1& 1\cr -1 &-1 &-1} \right] \cdot \left[\matrix{1 \cr 1 \cr 1}\right]+ \left[\matrix{ 3\cr 3} \right]  \right] = \left[\matrix{ 1\cr -3}\right] +\left[\matrix{ 3\cr 3}\right] = \left[\matrix{ 4\cr 0}
\right]
$$

this could be written in the following way:

$$
\text{a}^{1} = \left[\matrix{ 4\cr 0} \right] = \left [\matrix{ 2*(3-1)\cr 2*(3-3)}
\right]= 2 * \left [\matrix{ 3-1\cr 3-3}\right] = 2 * \left [\matrix{ R-1\cr R-3}
\right]
$$

thus, the outputs of the feedforward layer are equal to $2R$ minus twice the Hamming distances from the prototype patterns to the input pattern.

The **recurrent** layer of the Hamming network is what is known as a **competitive** layer. The neurons in this layer are initialized with the outputs of the feedforward layer, which indicate the correlation between the prototype patterns and the input vector. Then the neurons compete with each other to determine a winner. After the competition is completed, only one neuron (the winner) in the group will have a nonzero output. This most extreme form of competition among a group of neurons is called Winner-Take-All. The winning neuron indicates which category of input was presented to the network.

The recurrent lyer has $S$ neurons that are fully interconnected, each neuron is connected to every other neuron in the layer, including itself. The transfer function used by the neurons is the <code>poslin</code> transfer function, a positive-linear function, which is linear for positive values and zero for negative values.

The weights of the recurrent layer are symmetrical, fixed and are given by:

$$
w_{ij}= \left\{ \begin{array}{cl}
1 & : \ i =  j \\
-\epsilon & : \ i \neq  j
\end{array} \right.
$$

where $$\epsilon$$ is a predetermined positive constant. It has to be positive and smaller than $1$.  The diagonal terms in the weight matrix indicate that each neuron is connected to itself with a positive weight of $1$, representing self-promotion. The off-diagonal terms, $$-\epsilon$$, is negative and thus represent inhibition.

In this illustrative example the weight matrix has the form:

$$
\textbf{W}^{2}=\left[ \matrix{
1 &  -\epsilon \cr
 -\epsilon& 1} \right]
$$

A good choice of $$\epsilon$$ would be a one that provides fast convergence.

The equations that describe the competition are:

$$
\textbf{a}^{2}(0) =\textbf{a}^{1}
$$

where $$\textbf{a}^{2}(0)$$, $S\times 1$ column vector matrix, is the Initial Condition; the output of the recurrent layer (layer $2$) at time $t = 0$, which equals to $$\text{a}^{1}$$ the output of the feedforward layer (layer $1$). Then future outputs of the network are computed from previous outputs:

$$
\textbf{a}^{2}(t+1) = \textbf{poslin}(\textbf{W}^{2}\textbf{a}^{2}(t))
$$

where $$\textbf{a}^{2}(t)$$, $S\times 1$ column vector matrix, is the output of the recurrent layer at time (or iteration) $t = 1, 2, 3...$

$$
\Rightarrow \textbf{a}^{2}(t+1) =  \textbf{poslin}\left(\textbf{n}^{2}(t+1)\right)
\\
= \textbf{poslin}\left(\left[ \matrix{
1 &  -\epsilon \cr
 -\epsilon& 1} \right]\textbf{a}^{2}(t)\right)
\\
= \textbf{poslin}\left(\left[ \matrix{
1 &  -\epsilon \cr -\epsilon& 1} \right] \cdot \left[ \matrix{a_{1}^{2}(t) \cr a_{2}^{2}(t)} \right]\right)
\\
= \textbf{poslin}\left(\left[ \matrix{a_{1}^{2}(t)   -\epsilon \ast a_{2}^{2}(t) \cr
 -\epsilon \ast a_{1}^{2}(t)+ a_{2}^{2}(t)} \right]\right)
\\
= \textbf{poslin}\left(\left[ \matrix{a_{1}^{2}(t)   -\epsilon \ast a_{2}^{2}(t) \cr
 a_{2}^{2}(t)-\epsilon \ast a_{1}^{2}(t)} \right]\right)
$$

This means that with each iteration in the recurrent layer and for a given neuron $i = 1,...,S$, each ouput element $$a_{i}^{2}(t)$$ is reduced by the same fraction of the other neuron $j$; i.e. $$-\epsilon \ast a_{j}^{2}(t)$$.

In general, the net input $$\text{n}_{i}^{2}(t)$$ the neuron receives into its activation function at time $t$:

$$
\text{n}_{i}^{2}(t) = \text{a}_{i}^{2}(t-1) - \epsilon\sum_{j\neq i}^{S}a_{j}^{2}(t-1)
$$

and

$$
\text{a}_{i}^{2}(t) =  \textbf{poslin}\left(\text{n}_{i}^{2}(t)\right)
$$

Here it is assumed that only one neuron, not two or more neurons, can have the same maximal output value (i.e. its activation value due to the activation function). Since the outputs (activations) are all non-negative, due to the <code>poslin</code> activation function, it is clear that for all $i$: $$\text{n}_{i}^{2}(t)\le \text{a}_{i}^{2}(t-1)$$, and so as the recurrent layer iterates, values of activations of all neurons decrease. However, the smaller their activations are, the more they decrease fractionally. As the recurrent layer iterates, neurons with the smallest net input values $$\text{n}_{i}^{2}(t)$$ are driven to negative first; in other words, the larger element will be reduced by less, and the smaller element will be reduced by more, therefore the difference between large and small will be increased. The transfer functions of the neurons then yield zero values for their activations. Once an activation is driven to zero, it will remain at zero with subsequent iterations. Until eventually the activations of all the neurons except one, the winner, are driven to zero. The activation for the winner then ceases to decrease any further. The effect of the recurrent layer is to zero out all neuron outputs, except the one with the largest initial value (which corresponds to the prototype pattern that is closest in Hamming distance to the input).

The question is how large a value can be used for $$\epsilon$$ for fast convergence?
 - $\epsilon$ too small: takes too long to converge (more iterations required)
 - $\epsilon$ too big: may suppress the entire network (no winner can be found since all the activations are driven to zero in one single step)

The fastest convergence can be achieved if an $\epsilon$ can be chosen such that the activations of all neurons except the winning one are driven to zero in one iteration. *If* it was *known* that, for example, the neuron $k$ has the largest final output $$a_{k}^{2}$$, then by choosing $\epsilon$ to be slightly less than $$\epsilon_{max} $$:

$$
\epsilon_{max} = \frac{a_{k}^{2}(t)}{\sum_{j\neq k}^{S}a_{j}^{2}(t)} = \frac{1}{\sum_{j\neq k}^{S}\frac{a_{j}^{2}(t)}{a_{k}^{2}(t)}}
$$

then in a *single iteration* (at time $t$), the net input $$\text{n}_{k}^{2}(t)$$ becomes only slightly larger than zero and therefore its activation $$\text{a}_{k}^{2}(t)$$ by the transfer function <code>poslin</code> will be only slightly larger than zero. This means that all the other $$n_{i}^{2}(t)$$ become negative, and so their values of activations $$a_{i}^{2}(t)$$ become zero. However, it is unknown which of the neurons has the largest activation and thus it is unknown how large $$\epsilon_{max}$$ is. This is why $$\epsilon_{max}$$ is replaced by a smaller number and the recurrent layer is iterated a few times before convergence. This smaller number is obtained from the above equation by replacing the denominator with a larger number.

From practical examples it could be noticed that:

$$
\frac{a_{j}^{2}(0)}{a_{k}^{2}(0)}\le 1
$$

where $$j = 1,..,S \neq k$$ and by choosing the case $$ \frac{a_{j}^{2}(0)}{a_{k}^{2}(0)}= 1$$, the denominator in the previous equation becomes $$\sum_{j\neq k}^{S}\frac{a_{j}^{2}(0)}{a_{k}^{2}(0)} = S-1$$. Thus $$\epsilon$$ is chosen:

$$
\epsilon\lt \frac{1}{S-1}
$$

and this leads to a slightly faster convergence especially when $S$ is not too large.

To illustrate the operation of the Hamming network, considering the two prototype patterns; **Type A** where $$\textbf{p}_{\textbf{1}} = \left[\matrix{ 1\cr -1\cr 1} \right]$$ and **Type B** where $$\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]$$, an input pattern $$\textbf{p} = \left[\matrix{ -1\cr 1\cr -1} \right]$$ and using a linear transfer function, the output of the feedforward layer would be:

$$
\text{a}^{1} =
\left[
\left[\matrix{ 1 &-1& 1\cr -1 &-1 &-1} \right] \cdot \left[\matrix{-1 \cr 1 \cr -1}\right]+ \left[\matrix{ 3\cr 3} \right]  \right] = \left[\matrix{ -3\cr 1}\right] +\left[\matrix{ 3\cr 3}\right] = \left[\matrix{ 0\cr 4}
\right]
$$

which will then become the initial condition for the recurrent layer.

The weight matrix for the recurrent layer will be given by the equation:

$$
\textbf{W}^{2}=\left[ \matrix{
1 &  -\epsilon \cr
 -\epsilon& 1} \right]
$$

with:

$$
\epsilon\lt  \frac{1}{S-1} \Rightarrow \epsilon\lt \frac{1}{2-1} \Rightarrow \epsilon\lt 1
$$

so, any number for $$\epsilon$$ smaller than $1$ will lead to faster convergence, for example $$\epsilon = 0.5$$.

The first iteration $(t=1)$ of the recurrent layer produces:

$$
\textbf{a}^{2}(1) =  \textbf{poslin}\left(\textbf{W}^{2}\textbf{a}^{2}(0)\right)= \textbf{poslin}\left(\left[ \matrix{
1 &  -0.5 \cr -0.5& 1} \right] \cdot \left[ \matrix{0 \cr 4} \right]\right) = \textbf{poslin}\left(\left[ \matrix{-2 \cr 4} \right] \right)= \left[ \matrix{0 \cr 4} \right]
$$

The second iteration $(t=2)$ produces:

$$
\textbf{a}^{2}(2) =  \textbf{poslin}\left(\textbf{W}^{2}\textbf{a}^{2}(1)\right)= \textbf{poslin}\left(\left[ \matrix{
1 &  -0.5 \cr -0.5& 1} \right] \cdot \left[ \matrix{0 \cr 4} \right]\right) = \textbf{poslin}\left(\left[ \matrix{-2 \cr 4} \right] \right)= \left[ \matrix{0 \cr 4} \right]
$$

Since the outputs of successive iterations produce the same result, the network has converged. Prototype pattern number two, the **Type B** parcel, is chosen as the correct match, since neuron number two has the only nonzero output. This is the correct choice, since the Hamming distance from the Type A prototype to the input pattern is $3$, and the Hamming distance from the Type B prototype to the input pattern is $1$.

This Hamming network design could be coded in MATLAB in the following way:

{% include codes/nn-parcel-rod/m12.html %}

which results in the following output:

{% include codes/nn-parcel-rod/m13.html %}

<a id="subsubsection-i"></a>
**5. Hopfield Network**

Hopfield network is a **recurrent network** that is similar in some respects to the recurrent layer of the Hamming network, but which can effectively perform the operations of both layers of the Hamming network.

It consists of $S$ neurons, which is equal to the number of elements in the input vector. The neurons are initialized with the input vector $p$, which is an $Sx1$ column vector matrix

$$
\textbf{a}(0) =\textbf{p}
$$

then the network iterates until the output $\textbf{a}(t)$, also an $Sx1$ column vector matrix, converges, resulting in an output, which should be one of the prototype vectors.

$$
\textbf{a}^{2}(t+1) = \textbf{satlins}(\textbf{W}\textbf{a}(t)+\textbf{b})
$$

where <code>satlins</code> is the transfer function. It is a saturating linear transfer function; it is linear in the range $[-1, 1]$ and saturates at $1$ for inputs greater than $1$ and at $-1$ for inputs less than $-1$.

Unlike the Hamming network, where the nonzero neuron indicates which prototype pattern is chosen, the Hopfield network actually produces the selected prototype pattern at its output.

The procedure for computing the weight matrix and the bias vector for the Hopfield network is more complex than it is for the Hamming network, where the weights in the feedforward layer are the prototype patterns.

For the purpose of this illustrative example the weight matrix and the bias vector are determined in a way that can solve this particular pattern recognition problem. For example, the following weights and biases could be used:

$$
\textbf{W}=\left[ \matrix{
1.2 &  0 & 0\cr
 0& 0.2&  0 \cr
 0& 0&  1.2} \right], \ \textbf{b}=\left[ \matrix{
0 \cr
 -0.9 \cr
 0} \right]
$$

The network output must converge to either the **Type A** pattern, $$\textbf{p}_{\textbf{1}} = \left[\matrix{ 1\cr -1\cr 1} \right]$$, or the **Type B** pattern, $$\textbf{p}_{\textbf{2}} = \left[\matrix{ -1\cr -1\cr -1} \right]$$. In both patterns, the second element is $-1$. The difference between the patterns occurs in the first and third elements. Therefore, no matter what pattern is input to the network, the second element of the output pattern must converge to $-1$, and the first and third elements to go to either $1$ or $-1$, whichever is closer to the first and third elements of the input vector respectively.

The equations of operation of the Hopfield network, using the parameters given above, are:

$$
\text{a}_{1}(t+1) = \textbf{satlins}(1.2\text{a}_{1}(t))
\\
\text{a}_{2}(t+1) = \textbf{satlins}(0.2\text{a}_{2}(t)-0.9)
\\
\text{a}_{3}(t+1) = \textbf{satlins}(1.2\text{a}_{3}(t))
$$

This means that regardless of the initial values, $\text{a}_{i}(0)$, the first and third elements are multiplied by a number larger than $1$. Therefore, if the initial value of this element is negative, it will eventually saturate at $-1$; otherwise it will saturates at $1$. The second element will be dereased until it saturates at $-1$.

Like before, considering the input pattern of the not-so-perfect Type B parcel, $\textbf{p} = \left[\matrix{ -1\cr 1\cr -1} \right]$, to test the Hopfield network, the outputs for the first three iterations would be:

$$
\textbf{a}(0) = \left[\matrix{ -1\cr 1\cr -1} \right], \ \textbf{a}(1) = \left[\matrix{ -1\cr -0.7\cr -1} \right], \ \textbf{a}(2) = \left[\matrix{ -1\cr -1\cr -1} \right], \ \textbf{a}(3) = \left[\matrix{ -1\cr -1\cr -1} \right]
$$

The network has converged to the Type B parcel pattern, as did both the Hamming network and the perceptron, although each network operated in a different way. The perceptron had a single output, which could take on values of $-1$ (Type B parcel) or $1$ (Type A parcel). In the Hamming network the single nonzero neuron indicated which prototype pattern had the closest match. If the first neuron was nonzero, that indicated Type A parcel, and if the second neuron was nonzero, that indicated Type B pattern. In the Hopfield network the prototype pattern itself appears at the output of the network.

This Hopfield network design could be coded in MATLAB in the following way:

{% include codes/nn-parcel-rod/m14.html %}

which results in the following output:

{% include codes/nn-parcel-rod/m15.html %}

<a id="section-f"></a>
## Classification of Linearly Separable Data with a Perceptron

<a id="subsection-a"></a>
### Problem Description

In this example, there are two clusters of data, each with $20$ samples, that belong to two classes. These clusters are defined in a two-dimensional input space. The classes are linearly separable.

<a id="subsection-b"></a>
### Objective

To construct a perceptron for the classification of randomly defined two clusters of data.

<a id="subsection-a"></a>
### Steps

<ol>
  <li><a href="#subsubsection-j">Defineing input and output data</a></li>
  <li><a href="#subsubsection-k">Creating and training the perceptron</a></li>
  <li><a href="#subsubsection-l">Plotting the decision boundary</a></li>
</ol>

<a id="subsubsection-j"></a>
**1. Defining input and output data**

At first, $20$ sample vectors of two different classes are defined randomly by using the MATLAB function <code>randn</code>, which generates normally distributed random numbers. An offset of $5$ is added to the samples of the second class, to have them on distinguishable distance from the samples of the first class. Each class is set as $2$-by-$20$ matrix. and combined together to generate the $2$-by-$40$ matrix $p$. Thus, matrix $p$ represent the inputs to the perceptron; normally distributed random numbers, $2$-by-$40$ ($R$-by-$Q$) matrix of $40$ input vectors of two elements each.

To assign the vectors in the matrix $p$ to one of the two classes, a second matrix, $t$, is defined to be a $1$-by-$40$ ($S$-by-$Q$) output matrix. The elements of this matrix are marked with markers, zero and one.The first $20$ elements of the $t$ matrix are assigned to zero value and the other $20$ elements are assigned to one. Thus, the output matrix $t$ consists of $40$ target vectors, each made of a single element (either zero or one).

To plot the input and target vectors of the perceptron, the perceptron vector plot <code>plotpv</code> function is used, which takes two arguments, the first is the input matrix and the second is the target matrix. This plots column vectors in the input matrix with markers based on the output matrix.

{% include codes/nn-parcel-rod/m16.html %}

The above code plots the samples:

<center>
    <p>
    <figure id="figure10" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure10.png" alt="Figure 10">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 10: The input vectors, $(p_{1,i}, p_{2,i})$, marked as two classes</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-k"></a>
**2. Creating and training the perceptron**

In MATLAB, a single layer perceptron is created by the command: <code>net = perceptron;</code>.

The perceptron uses a hard-limit transfer function, <code>hardlim</code>, by default.

The training function for perceptron is set to <code>trainc</code> by default, which is cyclical order weight/bias training, and it is called by <code>train</code>. <code>trainc</code> trains a network with weight and bias learning rules with incremental updates after each presentation of an input. Inputs are presented in cyclic order. Training stops when any of these conditions is met:

- The maximum number of epochs (repetitions) is reached.
- Performance is minimized to the goal.
- The maximum amount of time is exceeded.

To measure the network performance, mean absolute error performance function, <code>mae</code>, is used by default. The error is calculated by subtracting the output from target. Then the mean absolute error is calculated. The goal is to minimize the performance, i.e. the error.

{% include codes/nn-parcel-rod/m17.html %}

Resulting from the above code, the training record is displayed, showing training and performance functions and parameters, and the value of the best performance (the minimum error reached).

<center>
    <p>
    <figure id="figure11" style='display: table; width: 40%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure11.png" alt="Figure 11">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 11: The training record of the trained neural network</figcaption>
    </figure>
    </p>
</center>

<code>view(net)</code> opens a window that shows the neural network (specified by <code>net</code>) as a graphical diagram. The numbers indicate that there are two elements in the input vectors, the network consists of one layer with a single neuron and using a hard-limit transfer function, and the output is a single element vector.

<center>
    <p>
    <figure id="figure12" style='display: table; width: 40%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure12.png" alt="Figure 12">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 12: The graphical diagram of the created neural network</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-l"></a>
**3. Plotting the decision boundary**

After the network is trained, the next step is to plot the classification line on the previously plotted perceptron vector plot. This is done by <code>plotpc</code> function, which takes two arguments as input:

- The first one is $S$-by-$R$ weight matrix, <code>net.iw{1,1}</code>, which is the final weight matrix after training. $$\left\{ 1,1 \right\}$$ indicates to the weights for the connection from the first input to the first layer, 
- and the second argument is $S$-by-$1$ bias vector, <code>net.b{1}</code>, which is the final bias vector after training, for the first layer. 

Here, $S$ is the number of neurons in layer and $R$ is the number of elements in input vector.

Finally, the linear decision boundary is plotted, separateing data points belonging to the two class lables:

<code>plotpc(net.iw{1,1},net.b{1});</code>

<center>
    <p>
    <figure id="figure13" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure13.png" alt="Figure 13">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 13: The linear decision boundary separating the two classes</figcaption>
    </figure>
    </p>
</center>

<a id="section-g"></a>
## Custom Neural Networks

<a id="subsection-a"></a>
### Problem Description and Objective

This example shows how to create and view a custom shallow neural network in MATLAB by using the network function. The network to be created is a feedforward network, consisting of two layers. It has a single input vector of six elements and an output vector (target output) of two elements. Only the first layer has a bias. An input weight connects to the first layer from the input. A layer weight connects to the second layer from the first layer. The second layer is the network output.

<a id="subsection-b"></a>
### Steps

<ol>
  <li><a href="#subsubsection-m">Defining the inputs and outputs</a></li>
  <li><a href="#subsubsection-n">Defining and customizing the network (number of network subobjects)</a></li>
  <li><a href="#subsubsection-o">Defining the topology (network subobject properties) and the transfer function</a></li>
  <li><a href="#subsubsection-p">Configuring the network with configure</a></li>
  <li><a href="#subsubsection-q">Training the network and calculating neuron output</a></li>
</ol>

<a id="subsubsection-m"></a>
**1. Defining the inputs and outputs**

{% include codes/nn-parcel-rod/m19.html %}

The above code creates the input and output (target) vectors.

{% include codes/nn-parcel-rod/m25.html %}

<a id="subsubsection-n"></a>
**2. Defining and customizing the network (number of network subobjects)**

To create a custom shallow neural network with one input and two layers, the next code snippet is used. The number of inputs defines how many sets of vectors the network receives as input. The size of each input (i.e., the number of elements in each input vector) is determined by the input size (in this example there is one input vector, so <code>net.numInputs = 1</code> and the input size is <code>net.inputs{1}.size = 6</code>).

**Syntax:**

<code>net = network(numInputs,numLayers,biasConnect,inputConnect,layerConnect,outputConnect)</code>

- <code>numInputs</code>: Number of inputs the network receives (how many sets of vectors the network receives as input)
- <code>numLayers</code>: Number of layers the network has (here: two layers)
- <code>biasConnect</code>: <code>numLayers</code>-by-$1$ Boolean vector; this property defines which layers have biases (1 is presence and 0 is absence) (here: the first layer has one)
- <code>inputConnect</code>: <code>numLayers</code>-by-<code>numInputs</code> Boolean matrix; this property defines which layers have weights coming from inputs (here: the first layer has one)
- <code>layerConnect</code>: <code>numLayers</code>-by-<code>numLayers</code> Boolean matrix; this property defines which layers have weights coming from other layers (here: second layer has a weight coming from first layer to second layer)
- <code>outputConnect</code>: $1$-by-<code>numLayers</code> Boolean vector; this property defines which layers generate network outputs (here: the second layer does)

{% include codes/nn-parcel-rod/m20.html %}

This results in a graphical diagram of the structure of the defined custom neural network:

<center>
    <p>
    <figure id="figure14" style='display: table; width: 40%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure14.png" alt="Figure 14">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 14: The graphical diagram of the structure of the custom neural network</figcaption>
    </figure>
    </p>
</center>

<a id="subsubsection-o"></a>
**3. Defining the topology (network subobject properties) and the transfer function**

The next step is to define the number of neurons in each layer. In this case, $5$ neurons are assigned to the first layer, and none to the second layer. Then, logistic sigmoid transfer function, <code>logsig</code>, is assigned to the first layer. To the second layer, linear transfer function, <code>purelin</code>, is assigned by default.

{% include codes/nn-parcel-rod/m21.html %}

<center>
    <p>
    <figure id="figure15" style='display: table; width: 40%; heighth: auto;'>
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
    <figure id="figure16" style='display: table; width: 40%; heighth: auto;'>
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
    <figure id="figure17" style='display: table; width: 40%; heighth: auto;'>
        <img src="/assets/img/nn-parcel-rod/Figure17.png" alt="Figure 17">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 17: The training record of a custom neural network</figcaption>
    </figure>
    </p>
</center>

and the output of the trained network is the desired (target) vector:

{% include codes/nn-parcel-rod/m27.html %}

<a id="section-h"></a>
## Industrial Fault Diagnosis of Connecting Rods in Compressors

