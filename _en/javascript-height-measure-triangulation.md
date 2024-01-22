---
layout: single # archive

title: JavaScript Web App to Measure Height of an Object by using Triangulation and the Orientation Sensor of the Device
excerpt: "Mobile web app in JavaScript, for measuring the approximate height of an object by using the triangulation principle, the orientation sensor of the device and the stream of its rear-facing camera."
# myLink: /de/geschichte/ # Custom Variable
# author_profile: true
last_modified_at: 2023-12-20
date: 2023-12-20
published: true
tags:
  - triangulation
  - orientation sensor
  - web app
  - JavaScript
  - camera

toc: true
toc_label: "Table of contents"
toc_icon: "cog"
toc_sticky: true

header:
  #image: /assets/img/javascript-height-measure-triangulation/Figure16A.gif
  teaser: /assets/img/javascript-height-measure-triangulation/Figure16A.gif
---

<br>
In trigonometry and geometry, triangulation is the process of determining the location of a point by forming a triangle to the point from a known point.

This article describes how to make a web app by using vanilla JavaScript that measures the approximate height of an object by pointing the smartphone to its top (or bottom, in case the height to be measured is from the ground to the smartphone's level). For that, the user moves a certain distance away from the object and points the rear-facing camera of the smartphone to the top of the object while observing the rear-facing camera's stream on the screen. The app measures the angle to the top (or bottom) by using the orientation sensor of the device, and, knowing the angle and the distance from the object, the approximate height from the smartphone's level upward (or downward to the bottom of the object) is measured and displayed on the screen. This method is called triangulation.

Triangulation principle is used in forestry to measure the height of a tree with a device called clinometer, <a href="#figure1">Figure 1</a>.

<center>
    <p>
    <figure id="figure1" style='display: table; width: 30%; heighth: 50%;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure1.jpg" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 1: Clinometer</figcaption>
    </figure>
    </p>
</center>

The clinometer measures the angle between a horizontal line and the line of sight to the top of the tree. To measure the height of the tree, the horizontal distance between the observer's eye and the tree is measured by a measuring tape. Then, by using the triangulation principle, the height of he tree is calculated, as illustrated in <a href="#figure2">Figure 2</a>.

<center>
    <p>
    <figure id="figure2" style='display: table'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure2.jpg" alt="Figure 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 2: Calculating the height of an object by using the triangulation principle</figcaption>
    </figure>
    </p>
</center>

The web app described in this article uses the same triangulation principle described above, but instead of a clinometer, a smartphone is used for measurement and calculation.

<br>
<a id="objectives"></a>
## OBJECTIVES

Building a mobile web app by using JavaScript programming language to measure the approximate height of an object by using the triangulation principle, the orientation sensor of the device and the stream of its rear-facing camera.

<br>
<a id="aquired-skills"></a>
## AQUIRED SKILLS

<!-- no toc -->
- Programming a mobile web app in JavaScript, debugging and styling it.
- Interpreting and using the input data from the orientation sensor in a device.
- Accessing the stream of the rear-facing camera of a device.
- Applying triangulation principle for measurement.

<br>
<a id="coding"></a>
## CODING

First a new HTML document, named <code>index.html</code>, is created and a title is given to the page (here: 'Height Measuring Tool'). An empty CSS file <code>style.css</code>, for the styles, and an empty JavaScript file <code>script.js</code>, for the logic, are linked to the document <code>index.html</code>.

In the document's <code>&lt;body&gt;</code> element a new division is added with the <code>id="heightInfo"</code>, which is currently empty, but eventually it will show the height of the object it is being pointed at.

An <code>onload</code> event is added within the <code>&lt;body&gt;</code> element to execute a JavaScript function <code>main()</code> once the document has loaded.

```html
<!-- index.html -->

<html>
    <head>
        <title>Height Measuring Tool</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
    </head>
    <body onload="main()">
        <div id="heightInfo"></div>
    </body>
</html>
```

Then the <code>main()</code> is defined in the <code>script.js</code>. The key to making this app is finding out the device orientation. This is done by adding an event listener to the window <code>window.addEventListener()</code>, which will listen for the device orientation event <code>deviceorientation</code>. When this orientation changes, it will trigger a callback function called <code>onOrientationChange()</code>.

```js
/* script.js */

function main(){
    window.addEventListener("deviceorientation", onOrientationChange)
}

function onOrientationChange(event){
    
}
```

The <code>console.log()</code> static method, which outputs a message to the console, is used to log the information associated with the event. However, a laptop or a PC are not equipped with an orientation sensor to measures the orientation of a device relative to an orthogonal coordinate frame $X$, $Y$ and $Z$, so, tilting the laptop or the PC won't trigger the event. How to debug a device, which doesn't have an orientation sensor is explained in the next section.

<br>
<a id="debugging"></a>
## DEBUGGING

To debug a device, which doesn't have an orientation sensor, the Developer Tools in the web browser app is used. For example, in the Chrome browser, the Developer Tools could be accessed as shown in <a href="#figure3">Figure 3</a>.

<center>
    <p>
    <figure id="figure3" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure3.jpg" alt="Figure 3" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 3: Steps to open the Developer Tools in the Chrome browser</figcaption>
    </figure>
    </p>
</center>

A window will open inside the browser as shown in <a href="#figure4">Figure 4</a>. Then, the 'More Tools', the three vertical dots at the far left of the tabs bar of the bottom section, is pressed followed by choosing the 'Sensors' tool from the displayed list, <a href="#figure5">Figure 5</a>. The 'Sensors' panel opens, <a href="#figure6">Figure 6</a>, which is used to override geolocation, simulate device orientation, force touch, and emulate idle state. For this project only the 'Orientation' section is used.

<center>
    <p>
    <figure id="figure4" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure4.jpg" alt="Figure 4" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 4: The Developer Tools panel, displayed in the Chrome browser</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure5.jpg" alt="Figure 5" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 5: Choosing the 'Sensors' tool from the 'More Tools' list</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure6.jpg" alt="Figure 6" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 6: The 'Sensors' panel open within development tools window</figcaption>
    </figure>
    </p>
</center>

Assuming a Cartesian coordinate system $X$, $Y$ and $Z$, as illustrated in <a href="#figure7">Figure 7</a>, where the device is flat on a level surface, like a table, with the screen facing up.

<center>
    <p>
    <figure id="figure7" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure7.jpg" alt="Figure 7">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 7: The Cartesian coordinate system X, Y and Z, in the Device Orientation specification</figcaption>
    </figure>
    </p>
</center>

Device orientation defines three types of rotation, which are are follows:

- $\alpha$ (alpha): The angle of rotation around the $Z$-axis, <a href="#figure8">Figure 8</a>, ranges from $-180$ to $180$ degrees or $[-180°, 180°)$.
- $\beta$ (beta): The angle of rotation around the $X$-axis, <a href="#figure9">Figure 9</a>, ranges from $-180$ to $180$ degrees or $[-180°, 180°)$.
- $\gamma$ (gamma): The angle of rotation around the $Y$-Axis, <a href="#figure10">Figure 10</a>, ranges from $-90$ to $90$ degrees or $[-90°, 90°)$.

<center>
    <p>
    <figure id="figure8" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure8.jpg" alt="Figure 8">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 8: Angle of rotation (&alpha;) of the device around the Z-axis</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure9" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure9.jpg" alt="Figure 9">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 9: Angle of rotation (&beta;) of the device around the X-axis</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure10" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure10.jpg" alt="Figure 10">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 10: Angle of rotation (&gamma;) of the device around the Y-axis</figcaption>
    </figure>
    </p>
</center>

By setting a custom orientation for the virtual device in the Developer Tools sections, either by dragging the device's image or, for precision, by changing the values of $\alpha$, $\beta$ and $\gamma$, the log in the console panel changes accordingly, as shown in <a href="#figure11">Figure 11</a>.

<center>
    <p>
    <figure id="figure11" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure11.jpg" alt="Figure 11" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 11: Console's log updates according to device's orientation changes</figcaption>
    </figure>
    </p>
</center>

However, in this project, only the changes in the value of $\beta$ is required. For that reason, in the file <code>script.js</code> the <code>console.log(event)</code> could be changed to <code>console.log(event.beta)</code> to focus on the value of $\beta$.

$\beta = 0$ degrees when the device is flat on a level surface, like a table and the screen facing up, and when the device is in a vertical position and the screen facing the user, then $\beta = 90$ degrees. However, for this project, it is necessary to have $\beta = 0$ degrees when the device is in a vertical position and the screen facing the user, and $\beta = -270$ degrees when the device is flat on a level surface and the screen facing down; range of $\beta$: $[-270°, 90°)$. To achieve this, $90$ degrees is substracted from the $\beta$. To change the negative degrees to positive ones within the range, an <code>if</code> is added, which tests whether $\beta$ is smaller than zero, in which case it multiplies $\beta$ with $-1$. In this way the range of $\beta$ becomes: $[0°, 90°)$, as shown in the following code:

```js
/* script.js */

function main(){
    window.addEventListener("deviceorientation", onOrientationChange)
}

function onOrientationChange(event){
    let angle = event.beta-90;
    if(angle<0){
        angle = -angle;
    }
    console.log(angle);
}
```

To convert this angle $\beta$ into height, the distance to the object is required. For this, in the <code>script.js</code> file, new variables are defined: <code>distToObject</code>, which is a previously measured value by the user, and <code>heightOfObject</code>, the height of the object to be measured, which is calculated by the triangulation method as follows:

<code>const heightOfObject = Math.tan(angle*Math.PI/180)*distToObject;</code>

The angle $\beta$ is converted into radians by multiplying it with $\frac{\pi}{180}$.

The <code>script.js</code> file looks now like this, considering a distance of $20$ meters to the object:

```js
/* script.js */

function main(){
    window.addEventListener("deviceorientation", onOrientationChange)
}

function onOrientationChange(event){
    let angle = event.beta-90;
    if(angle<0){
        angle = -angle;
    }

    const distToObject = 20;
    const heightOfObject = Math.tan(angle*Math.PI/180)*distToObject;
    document.getElementById("heightInfo").innerHTML =
        heightOfObject.toFixed(1)+" m (" +angle.toFixed(1)+"&deg;)";
}
```

To the distance to the object as user-input in the app, a slider, with range between $1$ to $50$ meters, and default value of $20$ meters, is added to the app by coding it into the <code>index.html</code>. Then an info field is added to the slider by using the <code>&lt;div&gt;</code> tag.

```html
<!-- index.html -->

<html>
    <head>
        <title>Height Measuring Tool</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
    </head>
    <body onload="main()">
        <input id="mySlider" type="range" min="1" max="50" value="20">
        <div id="myLabel"></div>
        <div id="heightInfo"></div>
    </body>
</html>
```

To pass the value of the slider to the <code>distToObject</code>, in the <code>script.js</code>, the <code>getElementById()</code> method is used to return the value of <code>mySlider</code> element:

<code>const distToObject = document.getElementById("mySlider").value;</code>

To print this distance on the screen, in the <code>script.js</code>, the <code>innerHTML</code> property of the <code>getElementById()</code> method is used to return the HTML content (inner HTML) of <code>myLabel</code> element, which has a specified <code>id</code> in previously made <code>&lt;div&gt;</code> container:

<code>document.getElementById("myLabel").innerHTML =
        "Distance to object: "+distToObject+" meters";</code>

<a href="#figure12">Figure 12</a> shows the current output page of the app in the browser and the Developer Tools panel.  

<center>
    <p>
    <figure id="figure12" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure12.jpg" alt="Figure 12" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 12: The slider and the info field in the output page and the Developer Tools panel</figcaption>
    </figure>
    </p>
</center>

Moving the slider in its current situation won't update the value under it, it requires an <code>oninput</code> event, which fires when the value of the slider element is changed. However, this is not necessary to do here, because the orientation sensor in a device is quite sensitive and the orientation event will be dispatched all the time and moving the slider will update the value under it all the time.

In the next section, the camera input from the rear-facing camera of the device is added, which allows the user to align the device to the top (or bottom) of the object properly.

<br>
<a id="camerastream"></a>
## CAMERA STREAM

A new feature is added; the camera input from the rear-facing camera of the device, which allows the user to align the device to the top (or bottom) of the object. This is done by accessing the <code>navigator.mediaDevices</code> property that offers various methods for accessing the camera, microphone as well as screen sharing, and invoking the <code>getUserMedia()</code> method with <code>video</code> property set to <code>true</code>.

When <code>getUserMedia()</code> is invoked, it returns a Promise object <code>video:true</code>. This Promise object has two instance methods; <code>then()</code> and <code>catch()</code>. The <code>then()</code> method takes two arguments: callback functions for the fulfilled (success) and rejected (error) cases of the Promise. In this case only one callback function is used, <code>function(signal)</code>, which is for the fulfilled case of the Promise. The browser prompts the User for permission to access the available device's camera, <a href="#figure13">Figure 13</a>. If the User gives the permission, then this allows the fulfilled (success) callback function that has access to the video signal (**MediaStream**) to retun the Promise. This signal (**MediaStream**) is passed to a newly-created <code>video</code> element, with **id** <code>myVideo</code>, which is added in the <code>index.html</code> too: <code>&lt;video id="myVideo"&gt;</video></code>. The <code>srcObject</code> property returns the **MediaStream** object and <code>play</code> the video.

The <code>catch()</code> method of Promise instance schedules a function to be called when the Promise is rejected, here: the access to the returned error information, <a href="#figure14">Figure 14</a>.

<center>
    <p>
    <figure id="figure13" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure13.jpg" alt="Figure 13" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 13: The browser prompts the User for permission to access the available device's camera</figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure14" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure14.jpg" alt="Figure 14" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 14: Permission to access the available device's camera is denied; Promise is rejected</figcaption>
    </figure>
    </p>
</center>

Refreshing the page now shows the video from the webcam, <a href="#figure15">Figure 15</a>, the values appear as the device moves (here the virtual phone in the Developer Tools).

<center>
    <p>
    <figure id="figure15" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure15.jpg" alt="Figure 15" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 15: The User gives the permission to access the camera. The camera feed appears (the gray area filled with trees)</figcaption>
    </figure>
    </p>
</center>

The JavaScript code in the (<code>script.js</code>) becomes as follows:

```js
/* script.js */

function main(){
    window.addEventListener("deviceorientation", onOrientationChange)

    navigator.mediaDevices.getUserMedia({video:true})
        .then(function(signal){
            const video=document.getElementById("myVideo");
            video.srcObject=signal;
            video.play();
        })
        .catch(function (err){
            alert(err);
        })
}

function onOrientationChange(event){
    let angle = event.beta-90;
    if(angle<0){
        angle = -angle;
    }

    const distToObject = document.getElementById("mySlider").value;
    document.getElementById("myLabel").innerHTML =
        "Distance to object: "+distToObject+" meters";
    const heightOfObject = Math.tan(angle*Math.PI/180)*distToObject;
    document.getElementById("heightInfo").innerHTML =
        heightOfObject.toFixed(1)+" m (" +angle.toFixed(1)+"&deg;)";
}
```

The next step is to style the app in the <code>style.css</code> file.

<br>
<a id="styling"></a>
## STYLING

To begin, the <code>margin</code> of the <code>body</code> is set to zero, the elements are centered, the overflow is set to hidden to remove the scrollbars, the <code>font-size</code> is enlarged, <code>font-family</code> set to 'Arial', its <code>color</code> is set to 'white' and double black shadows are added to the text, to make the shadow stronger.

```css
/* style.css */

body{
    margin:0;
    text-align:center;
    overflow:hidden;
}
```

Next, the <code>video</code> object is aligned to the center of the <code>body</code> by making it absolutely positioned, i.e. removing it from the normal document flow, moving it's top-left corner to the center by setting left and top to $50\%$ of the nearest parent container, the body, and then translating the object $50\%$ of its size to the left and $50\%$ of its size up, effectively centering it within the body. The z-index is set to $-1$ so that overlapping elements with larger z-index cover this one, i.e. so that other elements appear on top of this one.

The same is done for the <code>heightInfo</code> object. But here the text color is set to red and the font-weight to bold, and unlike <code>video</code> object, this one is translated $100\%$ of its size upward so that its bottom is in the middle of the screen. Then, $3px$ thick white bottom-border is added to it, with $100\%$ the width of the <code>body</code>. The user of this app should align this border with the top of the object to be measured.

```css
/* style.css */

body{
    margin:0;
    text-align:center;
    overflow:hidden;
    font-size:25px;
    font-family: Arial;
    color: white;
    text-shadow: 0  4px #000, 0  4px #000;
}

video{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;
}

#heightInfo{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    border-bottom: 3px solid white;
    width: 100%;
}
```

Then the slider and its thumb are styled, as shown in the next CSS code block, which is also the final style sheet (stored in the file <code>style.css</code>). The <code>::-webkit-slider-thumb</code> is a CSS 'pseudo-element' that represents the "thumb" that the user can move within the "groove" of an <code>&lt;input&gt;</code> of <code>type="range"</code> to alter its numerical value.

```css
/* style.css */

body{
    margin:0;
    text-align:center;
    overflow:hidden;
    font-size:25px;
    font-family: Arial;
    color: white;
    text-shadow: 0  4px #000, 0  4px #000;
}

#mySlider{
    appearance:none;
    width:90%;
    height:35px;
    background:#47f;
    margin-top:35px;
}

#mySlider::-webkit-slider-thumb{
    appearance: none;
    width:35px;
    height:35px;
    background:white;
}

video{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;
}

#heightInfo{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    border-bottom: 3px solid white;
    width: 100%;
}
```

To optimize the layout for mobile devices, in the <code>index.html</code> file the "viewport" <code>&lt;meta&gt;</code> tag is used to control the viewport's size by setting the <code>width</code> attribute to the number of pixels of the <code>device-width</code> and by setting the <code>user-scalable</code> attribute to <code>no</code> to disable zoom in and out actions. This is done by adding the following code line to the file:

<code>&#139;meta name="viewport" content="width=device-width, user-scalable=no"&#155;</code>

```html
<!-- index.html -->

<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <title>Height Measuring Tool</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
    </head>
    <body onload="main()">
        <input id="mySlider" type="range" min="1" max="50" value="20">
        <div id="myLabel"></div>
        <div id="heightInfo"></div>
        <video id="myVideo"></video>
    </body>
</html>
```

The use of the rear-facing camera of the device is specified in the following way: In the <code>video</code> object inside the JavaScript function <code>main()</code> in the <code>script.js</code> file, which is passed to <code>getUserMedia()</code>, is modified from:

<code>navigator.mediaDevices.getUserMedia({video:true})</code>

to:

<code>navigator.mediaDevices.getUserMedia({video:{
        facingMode: 'environment'
    }})</code>

The <code>facingMode</code> is set to the string value <code>environment</code>, which means that the video source is facing away from the user, thereby viewing their environment. This is the rear-facing camera of the device.

The final JavaScript code in the (<code>script.js</code>) is as follows:

```js
/* script.js */

function main(){
    window.addEventListener("deviceorientation", onOrientationChange)

    navigator.mediaDevices.getUserMedia({video:{
        facingMode: 'environment'
    }})
        .then(function(signal){
            const video=document.getElementById("myVideo");
            video.srcObject=signal;
            video.play();
        })
        .catch(function (err){
            alert(err);
        })
}

function onOrientationChange(event){
    let angle = event.beta-90;
    if(angle<0){
        angle = -angle;
    }

    const distToObject = document.getElementById("mySlider").value;
    document.getElementById("myLabel").innerHTML =
        "Distance to object: "+distToObject+" meters";
    const heightOfObject = Math.tan(angle*Math.PI/180)*distToObject;
    document.getElementById("heightInfo").innerHTML =
        heightOfObject.toFixed(1)+" m (" +angle.toFixed(1)+"&deg;)";
}
```

In the next GIF animation, <a href="#figure16">Figure 16</a>, the resulting app is shown in action, where a height of a door is being measured. The observer stands on a distance of $2$ meters from the door, adjusts the smartphone so that the displayed height value is $0$, then tilts the device till the vertical line reaches the top of the door, where a height of $0.6$ meters is displayed. Then the device is tilted downward till the vertical line on the screen reaches the bottom of the door, where a height of $1.6$ meters is displayed. The height of the door is the addition of the both results, $0.6 + 1.6 = 2.2$ meters.

<center>
    <p>
    <figure id="figure16" style='display: table'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure16.gif" alt="Figure 16" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Figure 16: The app in action, measuring the height of a door</figcaption>
    </figure>
    </p>
</center>
