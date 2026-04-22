---
title: "I Started Turning Off Claude"
date: 2026-04-21
tags:
  - post
layout: layout.njk
---

*and the infrastructure got faster*

---

I want to tell you about something that happened gradually and then all at once.

I first noticed it in my homelab — a small, rigid, well-understood environment where the boundaries are clear and the blast radius of a bad decision is just your own weekend. I'd built LLM tooling into the infrastructure: the model at the center of it less "a thing that generates text" and more "a user running tools." It reads intent. It selects from a graph of tools I built. It fills in parameters and fires calls. The deterministic pieces do the deterministic work.

And then half the tools were running on Qwen3.5. On my own hardware.

I didn't plan this. It just became obvious.

The same pattern transferred to production systems at work. Same architecture, higher stakes, same result. You know an abstraction is real when substituting the platform is mechanical. The homelab didn't tell me the design was clever. It told me the design was correct. Production confirmed it.

---

Here's something I've come to believe: **using LLM output directly makes your life harder than it needs to be.**

Not because LLMs are bad. Because of what "output" means in that sentence.

When the LLM's job is to produce a deliverable — a config file, a script, a report, an answer — you are trusting the text. And trusting LLM text is a specific kind of gamble. It's fluent. It's confident. It is sometimes subtly, invisibly wrong in ways that only become apparent later, at the worst possible moment. A hallucinated package name in generated infrastructure code is not a failed tool call. It's a broken deploy at 2am that you will debug by hand.

But when the LLM's job is to navigate a tool graph — pick the right call, fill in the right parameters, chain to the next step — the output is a structured API call. Structured API calls succeed or fail loudly. The error is immediate. The loop is tight. The model's job shrinks from "produce correct text" to "select and parameterize correctly," which is a much more tractable problem.

This is why a capable local model can do what a frontier model was doing. The complexity moved — into the tool definitions, into the surface area, into the design of the system. The model is a dispatcher. And dispatch is a solved problem.

---

There's a trap in this framing, though, that I think is worth being honest about.

**The tools still have to be usable by a human.**

Usable in the practical sense: I can sit down, write out the calls on a command line, and make the thing work without the LLM in the loop at all. If I can't do that, I haven't built a tool. I've built a dependency.

Current-generation LLMs can abstract *UI*. An LLM can take a task expressed in natural language and translate it into the right sequence of structured calls. That part works.

They cannot abstract *knowledge*. An LLM cannot give you the intuition for why a system behaves the way it does under pressure. It cannot replace the experience of having debugged the thing yourself at least once. It cannot tell you when a tool is being used correctly versus when it's producing a plausible-looking wrong answer, because that distinction requires understanding the domain.

And software runs in the real world. It moves money. It controls infrastructure. It gates access to medical records and processes insurance claims and schedules the thing that talks to the other thing that nobody fully understands anymore. When it fails — not hypothetically, but actually — the consequences land on people. Sometimes financially. Sometimes physically. The fluency of LLM output does not change this. If anything it makes it worse, because fluent and confident is exactly what a subtle bug looks like before you find it. LLMs are a new and particularly seductive way to not understand what you are building. They did not change the underlying problem. They just made it easier to pretend it does not exist.

The people who are going to hurt other people are the ones who skipped the knowledge step because the LLM made it feel optional. They will build systems they cannot debug. They will deploy them. The systems will fail — not if, when — and the failure will land on someone who had nothing to do with the decision to skip the hard part. That person will not care about the tool choices or the architecture or whether the UI was smooth. They will just experience the consequence.

What an LLM can genuinely take off your plate is the friction of *operating* a system once you understand it. That's real, and it's useful. It's just not the same thing as understanding the system.

---

Frontier models are for tasks where the quality of inference actually changes the outcome — novel problems, genuinely ambiguous decisions, the edges of what's known. Everything else is dispatch. Most of the work is dispatch.

Systems get more reliable when you narrow what you are asking the model to do. The cost savings follow from that — they are a consequence of building something that does not break, not a goal in themselves.

---

This blog has been about finding the right-sized tool for the job since the first post. For a lot of that work, the right-sized tool turns out to be a local model with a well-designed interface, not a frontier model with a chat box. I've watched people get hurt by systems that nobody fully understood, built on tools nobody could operate without the abstraction layer holding. I am trying to find — and describe — the thing that does not do that. Watching the theory hold is not just satisfying. It is a relief.

The work is understanding what you are building well enough that you could operate it without the LLM in the loop. That requirement is not new. LLMs did not introduce it and they cannot remove it.
