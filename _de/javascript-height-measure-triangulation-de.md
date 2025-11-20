---
layout: single # archive

title: "JavaScript-Webanwendung zur Messung der Höhe eines Objekts"
subtitle: "mit Hilfe der Triangulation und des Orientierungssensors des Geräts"
excerpt: "Mobile App in JavaScript, um die ungefähre Höhe eines Objekts mit Hilfe des Triangulationsprinzips, des Orientierungssensors des Geräts und des Streams seiner Rückseitenkamera zu messen."
# myLink: /en/javascript-height-measure-triangulation/ # Custom Variable with JS use
lang_toggle_url: /en/javascript-height-measure-triangulation/ # Custom Variable Custom Variable without need for JS

# author_profile: true
last_modified_at: 2023-11-01
date: 2023-11-01
published: true
tagsen:
  - Triangulation
  - Orientierungssensor
  - Web-Applikation
  - JavaScript
  - Kamera
#categories:
  #- JavaScript-Programmierung
  #- Sensoren

toc: true
toc_label: "Inhaltsverzeichnis"
toc_icon: "book-open" #"cog"
toc_sticky: true

header:
  #image: /assets/img/javascript-height-measure-triangulation/Figure16A.gif
  teaser: /assets/img/javascript-height-measure-triangulation/Figure16A.gif
---  

<br>
In der Trigonometrie und Geometrie ist die Triangulation der Prozess der Bestimmung der Lage eines Punktes durch Bildung eines Dreiecks zu diesem Punkt von einem bekannten Punkt aus.

In diesem Artikel wird beschrieben, wie man mit Vanilla JavaScript eine Web-App erstellt, die die ungefähre Höhe eines Objekts misst, indem man das Smartphone auf die Oberseite des Objekts richtet (oder auf die Unterseite, falls die zu messende Höhe vom Boden bis zur Höhe des Smartphones reicht). Dazu entfernt sich der Nutzer in einem bestimmten Abstand von dem Objekt und richtet die Rückseitenkamera des Smartphones auf die Oberseite des Objekts, während er den Stream der Rückseitenkamera auf dem Bildschirm beobachtet. Die App misst den Winkel zur Oberseite (oder Unterseite) mithilfe des Orientierungssensors des Geräts, und da sie den Winkel und die Entfernung zum Objekt kennt, wird die ungefähre Höhe von der Smartphone-Ebene nach oben (oder nach unten zur Unterseite des Objekts) gemessen und auf dem Bildschirm angezeigt. Diese Methode wird als Triangulation bezeichnet.

Das Triangulationsprinzip wird in der Forstwirtschaft verwendet, um die Höhe eines Baumes mit einem Gerät namens Neigungsmesser zu messen, <a href="#figure1"> Abbildung 1</a>.

<center>
    <p>
    <figure id="figure1" style='display: table; width: 30%; heighth: 50%;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure1.jpg" alt="Figure 1">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 1: Neigungsmesser</figcaption>
    </figure>
    </p>
</center>

Der Neigungsmesser misst den Winkel zwischen einer horizontalen Linie und der Sichtlinie zur Baumkrone. Um die Höhe des Baumes zu messen, wird der horizontale Abstand zwischen dem Auge des Beobachters und dem Baum mit einem Maßband gemessen. Anschließend wird mit Hilfe des Triangulationsprinzips die Höhe des Baums berechnet, wie in <a href="#figure2">Abbildung 2</a> dargestellt.

<center>
    <p>
    <figure id="figure2" style='display: table'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure2-de.jpg" alt=" Abbildung 2">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 2: Berechnung der Höhe eines Objekts mit Hilfe des Triangulationsprinzips</figcaption>
    </figure>
    </p>
</center>

Die in diesem Artikel beschriebene Web-App verwendet dasselbe Triangulationsprinzip wie oben beschrieben, aber anstelle eines Neigungsmessers wird ein Smartphone zur Messung und Berechnung verwendet.


<a id="ziele"></a>
## ZIELE

Erstellung einer mobilen Webanwendung unter Verwendung der Programmiersprache JavaScript, um die ungefähre Höhe eines Objekts mit Hilfe des Triangulationsprinzips, des Orientierungssensors des Geräts und des Streams seiner Rückseitenkamera zu messen.


<a id="erworbene-fähigkeiten"></a>
## ERWORBENE FÄHIGKEITEN

<!-- no toc -->
- Programmieren einer mobilen Webanwendung in JavaScript, Debuggen und Gestalten der Anwendung.
- Interpretieren und Verwenden der Eingabedaten des Orientierungssensors eines Geräts.
- Zugriff auf den Stream der Rückseitenkamera eines Geräts.
- Anwendung des Triangulationsprinzips zur Messung.


<a id="kodierung"></a>
## KODIERUNG

Zunächst wird ein neues HTML-Dokument mit dem Namen <code>index.html</code> erstellt und ein Titel für die Seite vergeben (hier: "Höhenmessgerät"). Eine leere CSS-Datei <code>style.css</code> für die Stile und eine leere JavaScript-Datei <code>script.js</code> für die Logik werden mit dem Dokument <code>index.html</code> verknüpft.

Im <code>&lt;body&gt;</code>-Element des Dokuments wird ein neuer Bereich mit dem Namen <code>id="heightInfo"</code> hinzugefügt, der derzeit noch leer ist, aber später die Höhe des Objekts anzeigen wird, auf das er zeigt.

Ein <code>onload</code>-Ereignis wird innerhalb des <code>&lt;body&gt;</code>-Elements hinzugefügt, um eine JavaScript-Funktion <code>main()</code> auszuführen, sobald das Dokument geladen ist.

```html
<!-- index.html -->

<html>
    <head>
        <title>Tool zur Höhenmessung</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
    </head>
    <body onload="main()">
        <div id="heightInfo"></div>
    </body>
</html>
```

Dann wird die <code>main()</code> in der <code>script.js</code> definiert. Der Schlüssel zu dieser Anwendung ist das Herausfinden der Geräteausrichtung. Dazu wird ein Ereignis-Listener zum Fenster <code>window.addEventListener()</code> hinzugefügt, der auf das Ereignis <code>deviceorientation</code> wartet. Wenn sich diese Ausrichtung ändert, wird eine Callback-Funktion namens <code>onOrientationChange()</code> ausgelöst.

```js
/* script.js */

function main(){
    window.addEventListener("deviceorientation", onOrientationChange)
}

function onOrientationChange(event){
    
}
```

Die statische Methode <code>console.log()</code>, die eine Meldung an die Konsole ausgibt, wird verwendet, um die mit dem Ereignis verbundenen Informationen zu protokollieren. Ein Laptop oder ein PC sind jedoch nicht mit einem Orientierungssensor ausgestattet, der die Ausrichtung eines Geräts relativ zu einem orthogonalen Koordinatensystem $X$, $Y$ und $Z$ misst, so dass ein Kippen des Laptops oder PCs das Ereignis nicht auslösen kann. Wie man ein Gerät, das keinen Orientierungssensor hat, debuggt, wird im nächsten Abschnitt erklärt.


<a id=" debuggen"></a>
## DEBUGGEN

Zum Debuggen eines Geräts, das keinen Orientierungssensor hat, werden die Entwicklertools (DevTools) in der Webbrowser-App verwendet. Im Chrome-Browser können die Entwicklertools beispielsweise wie in <a href="#figure3">Abbildung 3</a> dargestellt aufgerufen werden.

<center>
    <p>
    <figure id="figure3" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure3.jpg" alt="Figure 3" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 3: Schritte zum Öffnen der Entwicklertools im Chrome-Browser</figcaption>
    </figure>
    </p>
</center>

Es öffnet sich ein Fenster innerhalb des Browsers, wie in <a href="#figure4">Abbildung 4</a> dargestellt. Dann drückt man auf "Weitere Werkzeuge", die drei vertikalen Punkte ganz links in der Registerkartenleiste im unteren Bereich, und wählt dann das Werkzeug "Sensoren" aus der angezeigten Liste aus, <a href="#figure5">Abbildung 5</a>. Es öffnet sich das Feld "Sensoren" (<a href="#figure6">Abbildung 6</a>), in dem die Geolokalisierung außer Kraft gesetzt, die Geräteausrichtung simuliert, die Berührung erzwungen und der Ruhezustand emuliert werden kann. In diesem Projekt wird nur der Abschnitt "Orientierung" verwendet.

<center>
    <p>
    <figure id="figure4" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure4.jpg" alt="Figure 4" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 4: Das Feld Entwicklertools, angezeigt im Chrome-Browser</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure5" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure5.jpg" alt="Figure 5" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 5: Auswahl des Werkzeugs "Sensoren" aus der Liste "Weitere Werkzeuge"</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure6" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure6.jpg" alt="Figure 6" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 6: Das Feld "Sensoren" wird im Fenster der Entwicklungswerkzeuge geöffnet</figcaption>
    </figure>
    </p>
</center>

Unter der Annahme eines kartesischen Koordinatensystems $X$, $Y$ und $Z$, wie in <a href="#figure7">Abbildung 7</a> dargestellt, liegt das Gerät flach auf einer ebenen Fläche, z. B. einem Tisch, und der Bildschirm zeigt nach oben.

<center>
    <p>
    <figure id="figure7" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure7.jpg" alt="Figure 7">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 7: Das kartesische Koordinatensystem X, Y und Z in der Spezifikation für die Geräteausrichtung</figcaption>
    </figure>
    </p>
</center>

Die Geräteausrichtung definiert drei Arten der Drehung, die wie folgt sind:

- $\alpha$ (alpha): Der Drehwinkel um die $Z$-Achse, <a href="#figure8">Abbildung 8</a>, reicht von $-180$ bis $180$ Grad oder $[-180°, 180°)$.
- $\beta$ (beta): Der Drehwinkel um die $X$-Achse, <a href="#figure9">Abbildung 9</a>, reicht von $-180$ bis $180$ Grad oder $[-180°, 180°)$.
- $\gamma$ (gamma): Der Drehwinkel um die $Y$-Achse, <a href="#figure10">Abbildung 10</a>, reicht von $-90$ bis $90$ Grad oder $[-90°, 90°)$.

<center>
    <p>
    <figure id="figure8" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure8.jpg" alt="Figure 8">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 8: Drehwinkel (&alpha;) des Geräts um die Z-Achse</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure9" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure9.jpg" alt="Figure 9">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 9: Drehwinkel (&beta;) des Geräts um die X-Achse</figcaption>
    </figure>
    </p>
</center>

<br>
<center>
    <p>
    <figure id="figure10" style='display: table; width: 60%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure10.jpg" alt="Figure 10">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 10: Drehwinkel (&gamma;) des Geräts um die Y-Achse</figcaption>
    </figure>
    </p>
</center>

Durch Einstellen einer benutzerdefinierten Ausrichtung für das virtuelle Gerät in den Abschnitten der Entwicklertools, entweder durch Ziehen des Bildes des Geräts oder durch Ändern der Werte von $\alpha$, $\beta$ und $\gamma$, ändert sich das Protokoll im Konsolenfeld entsprechend, wie in <a href="#figure11">Abbildung 11</a> gezeigt.

<center>
    <p>
    <figure id="figure11" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure11.jpg" alt="Figure 11" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 11: Das Protokoll der Konsole wird entsprechend der Ausrichtungsänderung des Geräts aktualisiert </figcaption>
    </figure>
    </p>
</center>

In diesem Projekt ist jedoch nur die Änderung des Wertes von $\beta$ erforderlich. Aus diesem Grund könnte in der Datei <code>script.js</code> das <code>console.log(event)</code> in <code>console.log(event.beta)</code> geändert werden, um sich auf den Wert von $\beta$ zu konzentrieren.

$\beta = 0$ Grad, wenn das Gerät flach auf einer ebenen Fläche wie einem Tisch liegt und der Bildschirm nach oben zeigt, und wenn sich das Gerät in einer vertikalen Position befindet und der Bildschirm dem Benutzer zugewandt ist, dann ist $\beta = 90$ Grad. Für dieses Projekt ist es jedoch erforderlich, dass $\beta = 0$ Grad ist, wenn sich das Gerät in einer vertikalen Position befindet und der Bildschirm dem Benutzer zugewandt ist, und $\beta = -270$ Grad, wenn das Gerät flach auf einer ebenen Fläche liegt und der Bildschirm nach unten zeigt; Bereich von $\beta$: $[-270°, 90°)$. Um dies zu erreichen, wird $90$ Grad vom $\beta$ abgezogen. Um die negativen Gradzahlen innerhalb des Bereichs zu verwerfen, wird ein <code>if</code> hinzugefügt, das prüft, ob $\beta$ kleiner als Null ist; in diesem Fall multipliziert es $\beta$ mit $-1$. Auf diese Weise wird der Bereich von $\beta$ zu: $[0°, 90°)$, wie im folgenden Code gezeigt:

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

Um diesen Winkel $\beta$ in Höhe umzurechnen, wird die Entfernung zum Objekt benötigt. Hierfür werden in der Datei <code>script.js</code> neue Variablen definiert: <code>distToObject</code>, ein zuvor vom Benutzer gemessener Wert, und <code>heightOfObject</code>, die Höhe des zu messenden Objekts, die durch die Triangulationsmethode wie folgt berechnet wird:

<code>const heightOfObject = Math.tan(angle*Math.PI/180)*distToObject;</code>

Der Winkel $\beta$ wird in Bogenmaß umgerechnet, indem er mit $\frac{\pi}{180}$ multipliziert wird.

Die Datei <code>script.js</code> sieht jetzt so aus, wenn man eine Entfernung von $20$ Metern zum Objekt berücksichtigt:

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

Um die Entfernung zum Objekt als Benutzereingabe in der App zu ermöglichen, wird ein Schieberegler mit einem Bereich zwischen $1$ bis $50$ Metern und einem Standardwert von $20$ Metern in die App eingefügt, indem er in der <code>index.html</code> kodiert wird. Dann wird dem Schieberegler mit Hilfe des <code>&lt;div&gt;</code>-Tags ein Infofeld hinzugefügt.

```html
<!-- index.html -->

<html>
    <head>
        <title>Tool zur Höhenmessung</title>
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

Um den Wert des Schiebereglers an das <code>distToObject</code> zu übergeben, wird in der Datei <code>script.js</code> die Methode <code>getElementById()</code> verwendet, um den Wert des Elements <code>mySlider</code> zurückzugeben:

<code>const distToObject = document.getElementById("mySlider").value;</code>

Um diesen Abstand auf dem Bildschirm auszudrucken, wird in <code>script.js</code> die Eigenschaft <code>innerHTML</code> der Methode <code>getElementById()</code> verwendet, um den HTML-Inhalt (inneres HTML) des Elements <code>myLabel</code> zurückzugeben, das eine bestimmte <code>id</code> im zuvor erstellten <code>&lt;div&gt;</code>-Container hat:

<code>document.getElementById("myLabel").innerHTML =
        "Distance to object: "+distToObject+" meters";</code>

<a href="#figure12">Abbildung 12</a> zeigt die aktuelle Ausgabeseite der Anwendung im Browser und im Bereich Entwicklertools.

<center>
    <p>
    <figure id="figure12" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure12.jpg" alt="Figure 12" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;">Abbildung 12: Der Schieberegler und das Infofeld auf der Ausgabeseite und im Bereich Entwicklertools</figcaption>
    </figure>
    </p>
</center>

Wenn man den Schieberegler in seiner aktuellen Position bewegt, wird der Wert darunter nicht aktualisiert. Dazu ist ein <code>oninput</code>-Ereignis erforderlich, das ausgelöst wird, wenn der Wert des Schiebereglers geändert wird. Dies ist hier jedoch nicht notwendig, da der Orientierungssensor in einem Gerät recht empfindlich ist und das Orientierungsereignis ständig ausgelöst wird und das Bewegen des Schiebereglers den Wert darunter ständig aktualisiert.

Im nächsten Abschnitt wird die Kameraeingabe von der Rückseitenkamera des Geräts hinzugefügt, die es dem Benutzer ermöglicht, das Gerät richtig auf die Oberseite (oder Unterseite) des Objekts auszurichten.


<a id="kamerastream"></a>
## KAMERA-STREAM

Eine neue Funktion wurde hinzugefügt: die Kameraeingabe von der Rückseitenkamera des Geräts, die es dem Benutzer ermöglicht, das Gerät an der Oberseite (oder Unterseite) des Objekts auszurichten. Dazu wird auf die Eigenschaft <code>navigator.mediaDevices</code> zugegriffen, die verschiedene Methoden für den Zugriff auf die Kamera, das Mikrofon und die Bildschirmfreigabe bietet, und die Methode <code>getUserMedia()</code> mit der auf <code>true</code> gesetzten Eigenschaft <code>video</code> aufgerufen.

Wenn <code>getUserMedia()</code> aufgerufen wird, gibt es ein Promise-Objekt <code>video:true</code> zurück. Dieses Promise-Objekt hat zwei Instanzmethoden: <code>then()</code> und <code>catch()</code>. Die <code>then()</code>-Methode nimmt zwei Argumente entgegen: Callback-Funktionen für die erfüllten (Erfolg) und abgelehnten (Fehler) Fälle des Promise. In diesem Fall wird nur eine Callback-Funktion verwendet, <code>function(signal) </code>, die für den erfüllten Fall des Promise gilt. Der Browser fragt den Benutzer nach der Erlaubnis, auf die Kamera des verfügbaren Geräts zuzugreifen (<a href="#figure13"> Abbildung 13</a>). Wenn der Benutzer die Erlaubnis erteilt, kann die erfüllte (erfolgreiche) Callback-Funktion, die Zugriff auf das Videosignal (**MediaStream**) hat, das Versprechen zurückgeben. Dieses Signal (**MediaStream**) wird an ein neu erstelltes <code>video</code>-Element mit der **id** <code>myVideo</code> übergeben, das ebenfalls in der <code>index.html</code> hinzugefügt wird: <code>&lt;video id="myVideo"&gt;</video></code>. Die Eigenschaft <code>srcObject</code> gibt das **MediaStream**-Objekt zurück und spielt (<code>play</code>) das Video ab.

Die <code>catch()</code>-Methode der Promise-Instanz sieht eine Funktion vor, die aufgerufen wird, wenn das Promise abgelehnt wird, hier: der Zugriff auf die zurückgegebenen Fehlerinformationen, <a href="#figure14"> Abbildung 14</a>.

<center>
    <p>
    <figure id="figure13" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure13.jpg" alt="Figure 13" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 13: Der Browser fordert den Benutzer auf, den Zugriff auf die Kamera des verfügbaren Geräts zu erlauben </figcaption>
    </figure>
    </p>
</center>

<center>
    <p>
    <figure id="figure14" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure14.jpg" alt="Figure 14" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 14: Die Erlaubnis zum Zugriff auf die Kamera des verfügbaren Geräts wird verweigert; Promise wird abgelehnt </figcaption>
    </figure>
    </p>
</center>

Das Aktualisieren der Seite zeigt nun das Video der Webcam, <a href="#figure15"> Abbildung 15</a>, die Werte erscheinen, wenn sich das Gerät bewegt (hier das virtuelle Telefon in den Entwicklertools).

<center>
    <p>
    <figure id="figure15" style='display: table; width: 75%; heighth: auto;'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure15.jpg" alt="Figure 15" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 15: Der Benutzer gibt die Erlaubnis zum Zugriff auf die Kamera. Die Kameraübertragung wird angezeigt (der graue Bereich ist mit Bäumen gefüllt)</figcaption>
    </figure>
    </p>
</center>

Der JavaScript-Code in der Datei (<code>script.js</code>) sieht wie folgt aus:

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

Der nächste Schritt ist die Gestaltung der Anwendung in der Datei <code>style.css</code>.


<a id=" gestaltung "></a>
## GESTALTUNG

Zunächst wird der <code>margin</code> des <code>body</code> auf Null gesetzt, die Elemente werden zentriert, der Overflow wird auf hidden gesetzt, um die Scrollbars zu entfernen, die <code>font-size</code> wird vergrößert, <code>font-family</code> wird auf 'Arial' gesetzt, seine Farbe <code>color</code> wird auf 'white' (weiß) gesetzt und dem Text werden doppelte schwarze Schatten hinzugefügt, um den Schatten zu verstärken.

```css
/* style.css */

body{
    margin:0;
    text-align:center;
    overflow:hidden;
}
```

Als nächstes wird das <code>video</code>-Objekt an der Mitte des <code>body</code> ausgerichtet, indem es absolut positioniert wird, d. h. es wird aus dem normalen Dokumentfluss entfernt, seine linke obere Ecke wird in die Mitte verschoben, indem links und oben auf $50\%$ des nächstgelegenen übergeordneten Containers, dem Body, gesetzt werden, und dann wird das Objekt um $50\%$ seiner Größe nach links und $50\%$ seiner Größe nach oben verschoben, wodurch es effektiv innerhalb des Bodys zentriert wird. Der z-index wird auf $-1$ gesetzt, damit überlappende Elemente mit größerem z-index dieses überdecken, d.h. damit andere Elemente über diesem erscheinen.

Dasselbe wird für das <code>heightInfo</code>-Objekt gemacht. Aber hier wird die Textfarbe auf rot und die Schriftart auf fett gesetzt, und im Gegensatz zum <code>video</code>-Objekt wird hier $100\%$ seiner Größe nach oben verschoben, so dass sein Boden in der Mitte des Bildschirms liegt. Dann wird ein $3px$ dicker weißer unterer Rand hinzugefügt, mit $100\%$ der Breite des <code>body</code>. Der Benutzer dieser Anwendung sollte diesen Rand an der Oberseite des zu messenden Objekts ausrichten.

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

Dann werden der Schieberegler und sein "Thumb" gestylt, wie im nächsten CSS-Codeblock gezeigt, der auch das endgültige Stylesheet ist (gespeichert in der Datei <code>style.css</code>). Der <code>::-webkit-slider-thumb</code>  ist ein CSS-"Pseudo-Element", das den "Thumb" darstellt, den der Benutzer in der "Rille" einer <code>&lt;input&gt;</code> von <code>type="range"</code> verschieben kann, um seinen numerischen Wert zu ändern.

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

Um das Layout für mobile Geräte zu optimieren, wird in der Datei <code>index.html</code> das <code>&lt;meta&gt;</code>-Tag "viewport" verwendet, um die Größe des Ansichtsfensters zu steuern, indem das Attribut <code>width</code> auf die Anzahl der Pixel der Gerätebreite gesetzt wird und das Attribut <code>user-scalable</code> auf <code>no</code> gesetzt wird, um das Ein- und Auszoomen zu deaktivieren. Dies geschieht durch Hinzufügen der folgenden Codezeile in die Datei:

<code>&#139;meta name="viewport" content="width=device-width, user-scalable=no"&#155;</code>

```html
<!-- index.html -->

<html>
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <title>Tool zur Höhenmessung</title>
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

Die Verwendung der Rückseitenkamera des Geräts wird auf folgende Weise festgelegt: Im <code>video</code>-Objekt innerhalb der JavaScript-Funktion <code>main()</code> in der Datei <code>script.js</code>, die an <code>getUserMedia()</code> übergeben wird, wird geändert von:

<code>navigator.mediaDevices.getUserMedia({video:true})</code>

zu:

<code>navigator.mediaDevices.getUserMedia({video:{
        facingMode: 'environment'
    }})</code>

Der <code>facingMode</code> ist auf den String-Wert <code>environment</code> gesetzt, was bedeutet, dass die Videoquelle vom Benutzer weg gerichtet ist und somit seine Umgebung betrachtet. Dies ist die Rückseitenkamera des Geräts.

Der endgültige JavaScript-Code in der Datei (<code>script.js</code>) sieht wie folgt:

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

In der nächsten GIF-Animation, <a href="#figure16"> Abbildung 16</a>, wird die resultierende App in Aktion gezeigt, wobei die Höhe einer Tür gemessen wird. Der Beobachter steht in einer Entfernung von $2$ Metern von der Tür, stellt das Smartphone so ein, dass der angezeigte Höhenwert $0$ beträgt, und neigt dann das Gerät, bis die vertikale Linie die Oberkante der Tür erreicht, wo eine Höhe von $0,6$ Metern angezeigt wird. Dann wird das Gerät nach unten gekippt, bis die vertikale Linie auf dem Bildschirm den unteren Rand der Tür erreicht, wo eine Höhe von $1,6$ Metern angezeigt wird. Die Höhe der Tür ergibt sich aus der Addition der beiden Ergebnisse, $0,6 + 1,6 = 2,2$ Meter.

<center>
    <p>
    <figure id="figure16" style='display: table'>
        <img src="/assets/img/javascript-height-measure-triangulation/Figure16.gif" alt="Figure 16" style="border: 1px solid #555;">
        <figcaption style="text-align: left; display: table-caption; caption-side: bottom; font-size: 75%; font-style: normal;"> Abbildung 16: Die App in Aktion, Messung der Höhe einer Tür </figcaption>
    </figure>
    </p>
</center>
