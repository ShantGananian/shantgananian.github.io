---
layout: archive-tags2
tagen: JavaScript
search: false
lang: en
---

<h1>#{{ page.tagen | replace: " ", "-" }}</h1>
<p>&nbsp;</p>

<h5 style='font-size:16px; margin:5px; padding:5px;'>
{% assign pages = site.documents | where: 'tagsen', 'JavaScript' %}
{% for page in pages %}
  <ul>
    <li>
      {{ page.date | date: "%b %d, %Y" }}: <a href="{{ page.url }}">{{ page.title }}</a> ({{ page.lang }})
    </li>
  </ul>
{% endfor %}
</h5>


