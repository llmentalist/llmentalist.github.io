---
title: Home
layout: layout.njk
---

<h1>👋 Hi ✨ Welcome to the LLMentalist! 📝</h1>
<div class="post-list">
{%- for post in collections.post -%}
  <div class="mb-4 post-preview p-3 rounded shadow-sm bg-white">
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    <p>{{ post.templateContent | firstParagraph | safe }}</p>
  </div>
{%- endfor -%}
</div>
