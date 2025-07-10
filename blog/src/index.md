---
title: Home
layout: layout.njk
---

<h1>Welcome to your 11ty Blog!</h1>
<ul>
{%- for post in collections.post -%}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a><br>
    <p>{{ post.templateContent | firstParagraph | safe }}</p>
  </li>
{%- endfor -%}
</ul>
