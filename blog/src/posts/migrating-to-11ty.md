---
title: "Migrating from Obsidian to 11ty" 
date: 2025-07-09
layout: layout.njk
tags: post
---
# Migrating from Obsidian to 11ty

For quite some time, I've been wanting to turn my Obsidian notes into blog posts. The idea of transforming those markdown files into a live site felt like a natural next step, and I thought it would be easy, after all, it's all markdown! But as with most things, the journey had its twists. Here’s how I navigated the challenges and why I’m now loving 11ty.  

---

### **The LLM’s Template Confusion**  
The first hurdle was getting the LLM to understand 11y’s templating. I’d trained it on markdown and basic templating syntax, but it initially suggested Handlebars or Jinja syntax instead of Nunjucks.

I had to manually adjust the templates, ensuring all tags matched Nunjucks’ expectations. It was a bit of a headache, but once I confirmed the syntax, the LLM became a reliable helper for generating dynamic content. It only took one or two nudges to get it working correctly. No external documentation needed! Except when I had to look up how to make images work. nd I still haven't gotten it to work with separate CSS files. 🫢

---

### **The Luxon Dilemma**  
Next, I ran into an issue with Luxon, the date library 11ty uses. The LLM suggested using it for formatting dates, but the build kept failing with errors about incorrect method calls. I realized the problem was a version mismatch: my Node.js version was too old to support the Luxon version I had installed.  

Switching to Node.js 24 fixed the issue. It was a minor fix, but it taught me to always check dependencies’ compatibility. Sometimes, the LLM can’t see the forest for the trees, especially when it comes to environment constraints. 

---

### **Why I’m Hooked on 11ty**  
11ty’s simplicity and flexibility have won me over. It’s lightweight, fast, and adaptable; perfect for someone who wants to focus on content over infrastructure. Plus, the ability to sync Obsidian notes into a live site is a dream.  

I’m already thinking about building a tool to automate this process. Imagine a script that pulls markdown files from Obsidian, converts them to 11ty-compatible templates, and pushes them to a repo. It would save hours of manual work and keep my content fresh.  

---

### **The Road Ahead**  
This project has been a reminder that LLMs are tools, not magic. They can help, but understanding the underlying systems is still key. With 11ty, I’ve found a balance between automation and control; a perfect fit for my workflow.  

I’m excited to explore how Obsidian and 11ty can work together. Maybe one day, I’ll have a sync tool that makes this process effortless. Until then, I’ll keep building, learning, and enjoying the ride. 