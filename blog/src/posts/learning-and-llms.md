---
title: "A Long Journey: From the jQuery to LLMs" 
date: 2025-07-01
layout: layout.njk
tags: post
---
## Or, Why the Fundamentals Matter More Than Ever 
Let’s cut through the hype. A lot of the chatter around LLMs acts like they’re just another layer of abstraction, like a compiler or interpreter, hiding complexity. But here’s the truth: LLMs aren’t abstractions. They’re automations. And they need a developer who _gets_ the problem, the data, and the edge cases _even more_ than a compiler or interpreter does.

Think of it this way: a compiler translates code into machine language, but it doesn’t _understand_ what the code is trying to achieve. An LLM doesn’t just translate—it _generates_ a solution. But if you hand it a messy dataset or a vague prompt, it’ll spit out code that works… or code that _almost_ works. The difference? A developer who knows how to ask the right questions.

LLMs are tools, not magic. They amplify your skills, but they don’t replace the need to _think_ through the problem. That’s where the real power lies.

## **The 2010s: The Rise of Modern Web Development**
I started programming in 2012 (At the ripe old age of eight! My dad was learning it so he taught me too), when JavaScript was becoming the backbone of the web. Frameworks like React and Node.js were still in their infancy, and mobile development tools like React Native were just gaining traction. This era felt like a golden age of experimentation. There were no “best practices,” just a lot of trial and error.

### **Early Experiences: JavaScript and the Web**
I wrote my first "Hello, World!" in JavaScript, embedding it in an HTML file. The web was clunky. Pages would lag, and browsers had limited support for dynamic content. But it felt magical. I learned to build static pages with HTML and CSS, then moved into dynamic apps using jQuery. By 2015, I was diving into React, where I built a simple to-do list app.

**Example:** The app used vanilla JavaScript to manage state, manipulated the DOM with `document.getElementById`, and stored tasks in a global array. It wasn’t elegant, but it taught me the value of separation of concerns and how to avoid “spaghetti code.”

### **The Shift to Mobile and Modern Tools**
By 2016, I began experimenting with React Native. I built a weather app that fetched data from an API and displayed it on both iOS. The cross-platform approach saved time, but I quickly realized the limitations of JavaScript for native UI. That’s when I started learning TypeScript, which helped me catch type errors and write more maintainable code.

**Key Takeaway:** The 2010s were a time of rapid change. Frameworks evolved quickly, but the core principles, like problem-solving, debugging, and understanding data flow, remained constant.

## **The 2020s: Embracing LLMs and Modern Practices**
In 2022, I started exploring LLMs like GPT-3. I was skeptical at first: would they replace the years of hard work I’d invested? But I quickly realized they were a **tool**, not a shortcut.

### **How I Use LLMs Today**
- **Code Generation:** I use LLMs to draft boilerplate code, like API endpoints or database migrations. For example, I once asked for a Python script to parse CSV files, and the model generated a script that worked with minimal tweaks.
- **Debugging:** They help me spot syntax errors or suggest alternative approaches. Once, I asked for help debugging a Flask app that wasn’t handling POST requests correctly. The model pointed out a missing `request.get_json()` call.
- **Learning:** I ask them to explain complex concepts. When I struggled with SQL joins, I asked for a simple analogy: “Imagine two tables as two spreadsheets. A JOIN is like combining them by matching rows.”

**Catch:** I always double-check the output. LLMs can generate code that’s syntactically correct but logically flawed. For example, a model-generated Python script once used `==` to compare strings instead of `is`, causing unexpected behavior. My years of hands-on coding let me catch those mistakes.

## **Why Fundamentals Still Matter**
LLMs are amazing, but they’re not infallible. They can’t explain _why_ a `JOIN` is necessary in SQL or _why_ a `try/catch` block is essential in Python.

### **A Case Study: Building a Web App**
In 2023, I built a blog app using Flask and PostgreSQL. The LLM helped me structure the database schema and write queries, but I had to _understand_ the relationships between tables to avoid data inconsistencies. For example, when designing a `Post` and `User` table, I needed to ensure the `Post` table had a foreign key to the `User` table. Without that foundational knowledge, the LLM’s suggestions would have led to a fragile system.

## **The Balance: Learn First, Then Optimize**
My philosophy hasn’t changed: **Learn the fundamentals first, then use LLMs to enhance your work.**

- **Master the basics** (Python, SQL, algorithms) before relying on tools.
- **Use LLMs to accelerate** tasks, but never let them replace your understanding.
- **Stay curious**—LLMs are just one tool in a growing toolkit.

## **Final Thoughts**
Programming has always been about problem-solving. LLMs are a new chapter in that story, but they’re not the end of the journey. My early days with JavaScript taught me that the web is a layered system. LLMs are just another layer—powerful, but not a shortcut.

So, while I’ve been coding since the 2010s, I’m excited to see how LLMs will shape the future. But I’ll always remember: the foundation matters. 🌟
