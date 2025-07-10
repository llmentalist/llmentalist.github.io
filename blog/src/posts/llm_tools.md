---
title: "Creating an AI Assistant with Python: A Simple Guide" 
date: 2025-07-07
layout: layout.njk
tags: post
---

# Creating an AI Assistant with Python: A Simple Guide  

---

## What Is an AI Agent?  
Imagine you're building a **virtual assistant** that can help you with tasks like summarizing text or brainstorming ideas. This guide shows you how to create a simple AI agent that works with a **large language model (LLM)** like GPT to perform these tasks.  

The agent acts like a bridge between you and the AI: it asks the AI to pick a specific action, then runs that action when the AI chooses.  

---

> **Note:** This example uses the OpenAI API for simplicity, but the same principles apply if you use a locally run language model (such as Llama.cpp, Ollama, or other open-source LLMs). With the right Python client, you can swap out the API call and still get the same core functionality, often with similar results and more control over your data and costs.

---

## Step 1: Define the Commands the AI Can Use  
The AI needs to know exactly what it can do. Start by listing the **commands** (like "summarize" or "generate ideas") and what they do.  

**Example Commands:**  
- **summarize**: Generate a short summary of text.  
- **generate_ideas**: Come up with creative ideas.  
- **backup_database**: Back up the production database (use with caution).  
- **exit**: End the conversation.  

---

This methodology, where the AI is limited to a small, explicit set of actions and must choose from them, is absolutely necessary for sensitive functions like database backups. By requiring the AI to select only from pre-approved commands, you reduce the risk of accidental or unauthorized operations, and can add extra safeguards (like confirmation prompts or logging) for high-impact actions.

```python
# Step 1: Define the commands
commands = [
    {"name": "summarize", "description": "Summarize the text you provide"},
    {"name": "generate_ideas", "description": "Propose creative ideas based on your input"},
    {"name": "backup_database", "description": "Back up the production database (use with caution)"},
    {"name": "exit", "description": "End the conversation"}
]
```

**Why This Matters:**  
By limiting the AI to a few clear commands, you avoid confusion and ensure it knows what to do.  

---

## Step 2: Link Commands to Real Actions  
Now, connect each command to a **function** that actually does something. For example, the "summarize" command runs a function that cuts text into a short summary.  

```python
# Step 2: Define functions for each command
def summarize_text(text):
    return "Summary: " + text[:50] + "..."

def generate_ideas(prompt):
    return "Ideas: 1. " + prompt + " 2. " + prompt + " 3. " + prompt

def backup_database():
    # WARNING: This is a placeholder for a sensitive operation.
    # In a real system, this should require extra confirmation and logging.
    return "Database backup started! (Simulated)"

def exit():
    return "Goodbye!"
```

**Pro Tip:**  
Avoid using `eval()` for math operations. Instead, use safe logic or external libraries if needed.  

---

## Step 3: Ask the AI to Choose a Command  
The AI needs to pick one command. If it's unsure, the agent asks for clarification.  

```python
import openai
import os

# Step 3: Ask the AI to pick a command
def get_ai_choice():
    prompt = "Choose one of these actions:\n" + "\n".join(
        f"- {cmd['name']}: {cmd['description']}" for cmd in commands
    )
    openai.api_key = os.getenv("OPENAI_API_KEY")
    while True:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant that must choose one valid command name from a list."},
                {"role": "user", "content": prompt}
            ]
        )
        ai_reply = response.choices[0].message["content"].strip().lower()
        if any(cmd["name"] in ai_reply for cmd in commands):
            return ai_reply
        else:
            print("LLM response unclear. Asking again.")
```

**How It Works:**  
The agent keeps asking the AI until it picks a command. If the AI says something like "do math," the agent clarifies by listing the available commands.  

---

## Step 4: Run the Chosen Action  
Once the AI picks a command, the agent runs the corresponding function.  

```python
# Step 4: Execute the chosen action
def main():
    user_input = input("Your request: ")
    chosen_command = get_ai_choice()
    
    # Find the function to run
    for cmd in commands:
        if cmd["name"] in chosen_command.lower():
            if cmd["name"] == "summarize":
                result = summarize_text(user_input)
            elif cmd["name"] == "generate_ideas":
                result = generate_ideas(user_input)
            elif cmd["name"] == "backup_database":
                result = backup_database()
            elif cmd["name"] == "exit":
                result = exit()
            print(result)
            return
    
    print("Invalid command. Exiting.")

if __name__ == "__main__":
    main()
```

---

## Putting It All Together  
Here’s the full code in one place:  

```python
import openai
import os

# Step 1: Define the commands
commands = [
    {"name": "summarize", "description": "Summarize the text you provide"},
    {"name": "generate_ideas", "description": "Propose creative ideas based on your input"},
    {"name": "backup_database", "description": "Back up the production database (use with caution)"},
    {"name": "exit", "description": "End the conversation"}
]

# Step 2: Define functions for each command
def summarize_text(text):
    return "Summary: " + text[:50] + "..."

def generate_ideas(prompt):
    return "Ideas: 1. " + prompt + " 2. " + prompt + " 3. " + prompt

def backup_database():
    # WARNING: This is a placeholder for a sensitive operation.
    # In a real system, this should require extra confirmation and logging.
    return "Database backup started! (Simulated)"

def exit():
    return "Goodbye!"

# Step 3: Ask the AI to pick a command
def get_ai_choice():
    prompt = "Choose one of these actions:\n" + "\n".join(
        f"- {cmd['name']}: {cmd['description']}" for cmd in commands
    )
    openai.api_key = os.getenv("OPENAI_API_KEY")
    while True:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant that must choose one valid command name from a list."},
                {"role": "user", "content": prompt}
            ]
        )
        ai_reply = response.choices[0].message["content"].strip().lower()
        if any(cmd["name"] in ai_reply for cmd in commands):
            return ai_reply
        else:
            print("LLM response unclear. Asking again.")

# Step 4: Execute the chosen action
def main():
    user_input = input("Your request: ")
    chosen_command = get_ai_choice()
    
    # Find the function to run
    for cmd in commands:
        if cmd["name"] in chosen_command.lower():
            if cmd["name"] == "summarize":
                result = summarize_text(user_input)
            elif cmd["name"] == "generate_ideas":
                result = generate_ideas(user_input)
            elif cmd["name"] == "backup_database":
                result = backup_database()
            elif cmd["name"] == "exit":
                result = exit()
            print(result)
            return
    
    print("Invalid command. Exiting.")

if __name__ == "__main__":
    main()
```

---


## Building Bridges: The Power of Simple AI Design  

This approach isn’t about building complex systems or chasing cutting-edge features—it’s about creating tools that_serve_ people. By focusing on clarity, structure, and intentional design, you empower the AI to act as a thoughtful partner rather than a wildcard.  

The beauty of this method lies in its adaptability. Whether you’re automating workflows, sparking creativity, or solving niche problems, the same principles apply: define clear goals, link them to actionable steps, and let the AI guide the process. The result is a system that feels intuitive, secure, and deeply human.  

Remember, the goal isn’t to replace judgment but to_amplify_ it. A well-designed AI agent should feel like a trusted collaborator—one that helps you think faster, work smarter, and turn ideas into impact.  

So go forth and build something that doesn’t just work, but *feels right*. The world is full of problems waiting for your touch. 🌟