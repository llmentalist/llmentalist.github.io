---
title: "Building Agentic Workflows for Local LLMs"
date: 2026-04-10
tags:
  - post
layout: layout.njk
---

# Building Agentic Workflows for Local LLMs

*Coding agents and automation that run on your hardware. No cloud required.*

---

Hey there! I've been running local LLMs for a while now—you know, the usual: text generation, summarization, that kind of thing. But lately I've been pushing into something different: building *agentic* workflows. Not just chat. Not just one-shot prompts. I mean actual coding agents and automation workflows that operate on my machine, touching files, running commands, managing infrastructure.

All local. No API keys. No rate limits. No data leaving my machine.

If you've been using local models for basic tasks and wondering what the next level looks like, or if you're curious about building AI that actually *does* things on your behalf, this is it. Let's dive in.

---

## **The Frame: This Isn't Learning, It's Engineering**

Here's the thing people get wrong about agentic AI: they think the model needs to "learn" or "remember" things across sessions. But that's not how this works. The AI doesn't learn. The *environment* it operates in can grow.

When I say "agentic workflows," I mean AI that writes code, debugs errors, manages infrastructure, edits files, and executes commands—not just answers questions. Think less "chatbot" and more "autonomous coding assistant."

You're not teaching the model—you're building systems that externalize state so the model doesn't need to be stateful.

The limitation isn't intelligence. It's statefulness. And here's the fix: don't fight the statelessness, engineer around it.

And here's what makes this exciting: **you don't need frontier models for this.** You need focused, local models with good tooling. Build the environment right, and a 7B model running on your laptop will outperform Claude Sonnet 4.6 or o3 on your specific tasks.

---

## **Why Local Models for Agentic Workflows?**

Cloud services are convenient until they're not. API costs pile up. Rate limits hit you mid-task. Latency adds friction. Your data goes through someone else's servers. You're dependent on external infrastructure.

For simple LLM tasks? Maybe that's fine. But when you're building coding agents that need to iterate on files, run tests, manage deployments, debug production issues—that round-trip latency and API dependency becomes a real problem.

I've been consulting with companies trying to reduce their cloud AI bills, and the pattern is consistent: teams start with cloud APIs, costs spiral as usage grows, and suddenly "AI-assisted development" becomes a line item that finance questions every quarter.

But there's another issue that's been getting worse: **reliability**. AI companies have trash uptime. GitHub—which has an Enterprise Cloud SLA promising 99.9% uptime—dropped below 90% at one point in 2025. Ninety percent. That's 876 hours of potential downtime per year. Nearly 37 days offline annually.

In February 2026 alone, GitHub had 37 incidents. Actions went down. Copilot went down. Pull requests stopped working. Notifications delayed for hours. And this is *GitHub*—a company Microsoft owns, running on Azure infrastructure.

And it's not just GitHub. Anthropic had API outages in early 2026. OpenAI's had them. Every cloud AI provider has had them. I'm not picking on anyone—it's systemic to cloud infrastructure. When your coding agent is blocked mid-task waiting for an API that's down, it doesn't matter which company's API it is.

API costs, rate limits, reliability anxiety, data leaving your machine. Gone when you run locally.

When your coding agent depends on a cloud API that goes down mid-task, you're just… stuck. Waiting. Your local tools keep working. Your local models keep running.

But more importantly: **you control the stack.** You can tune the model for your domain. You can guarantee response time. You can build tools that integrate directly with your system instead of bridging through API abstractions.

The trade-off is simple: you invest time building the environment once, and you get reliability forever.

Plus, there's something deeply satisfying about running AI entirely on hardware you own. It feels more like real computing, you know?

---

## **The Problem: Context Compaction Destroys Planning**

After 3-4 turns, any LLM—cloud or local—has compressed earlier context. Plans fall apart. You end up re-explaining the same architectural decisions over and over. The AI regenerates solutions instead of building incrementally.

This is worse on smaller models with shorter context windows. You feel it faster.

But here's the key insight: **this is a fundamental limitation.** Design around it, don't prompt around it.

No amount of clever prompting will fix statefulness. You need to externalize the state itself.

---

## **The Solution: Three Layers of Externalized State**

### **1. Grounding (Tools)**

Not just abstraction—grounding in *reality*. When your local model calls `esxi_vm_list` and gets back live state, it's not reasoning from stale context or guessing. The tool result anchors it to current reality.

That's categorically different from "remembering" the VM list from 20 turns ago.

**Local advantage:** Your tools run on your machine. No API latency. No serialization overhead. Direct filesystem access, direct database queries, direct subprocess calls. The model and the tools share the same environment. It's *fast*.

### **2. Persistent Memory**

This is a layer between config files and AI working memory. Memory files let knowledge accumulate across sessions without re-explanation.

Session 1 discovers the vault password. Session 2 finds it in memory. The AI doesn't learn—but the environment grows.

**Local advantage:** Memory is just files on disk. No privacy concerns. No vendor lock-in. Version control with git. Backup with rsync. It's yours.

I keep mine in plain markdown files. Simple, readable, greppable. No databases, no complexity.

### **3. Reusable Tooling**

Scripts, libraries, CLI tools. Encode operations so the AI doesn't have to hold API shapes in context.

**Local advantage:** You're not bridging between your local environment and a cloud API. The model runs where your tools run. Integration is direct.

---

## **Model Selection for Agentic Work**

**You don't need 70B.** You need focused 7B-13B models fine-tuned for tool use.

Good candidates I've tested:

- **Mistral 7B Instruct** (solid tool calling, fast on consumer GPUs)
- **Llama 3.2 3B** (surprisingly capable, runs on CPU)
- **Qwen 2.5 Coder** (excellent for code-heavy workflows)
- **Phi-3 Mini** (tiny, fast, good for repetitive tasks)

Quantize to Q4 or Q5. You lose almost nothing for agentic tasks and gain massive speed improvements.

**Hardware reality:** RTX 3050, 4060, used Tesla cards from eBay—all fine. Even CPU-only works if you accept the latency. Mid-range laptop? 16GB RAM? You're good.

I run most of my experiments on a 4060. It's not fancy, but it gets the job done.

---

## **The Quiet Ones vs. The Loud Ones**

Here's something I've noticed: you don't see a lot of people talking about using local LLMs for agentic coding workflows. What you *do* see is people complaining that it doesn't work as well as cloud solutions.

And they're right! Out of the box, a local 7B model won't match Claude Code. Claude Code shows a clear intention to excellence. The infrastructure is all there: tool loop, file handling, context management, error recovery. The intention is right. It bundles a lot of what you'd have to build yourself for local models, and it does so thoughtfully.

It's completely understandable to look at Claude Code working out of the box and say, "Why would I bother with the local setup?"

But here's the thing: **the people who are successfully using local LLMs for this work aren't complaining about it.** They're quietly shipping. They're content with their cost savings over cloud providers. They understand how the technologies work—not deeply, just enough to grok the basics—and they're applying that knowledge to solve their problems.

You don't need a PhD in machine learning. You don't need to understand attention mechanisms or transformer architecture. You just need to understand:

- How the model receives context
- How tool calling works at a basic level
- How to externalize state so the model doesn't have to hold it
- How to debug when things go wrong

That's it. That's the barrier to entry.

The loud complaints come from people trying to use local models the same way they use cloud APIs—as a drop-in replacement with zero architectural changes. That doesn't work. The quiet productivity comes from people who understand the limitations and build around them.

It's a knowledge gap, not a capability gap.

---

## **Building Your Own Agentic Flow**

### **Don't Use Cursor Pointed at Ollama**

Look, I know the appeal. Cursor, Windsurf, Cline—they're all great tools. In early 2026, we've got Cursor with multi-file Composer mode, Windsurf shipping 5 parallel agents, Cline running as a free VS Code extension. They're powerful.

But if you're just pointing them at Ollama, you're still in the "chat with AI" paradigm. You're swapping one API for another. Without owning the tool loop, you're not externalizing state—you're just routing prompts differently.

**Build the loop yourself:**

1. Write the tool functions you need
2. Generate tool schemas (JSON or function signatures)
3. Run the model with tool definitions
4. Parse tool calls from model output
5. Execute tools, return results
6. Continue conversation with tool results

Use llama.cpp Python bindings, Ollama's API, or LangChain if you must—but understand the loop. Own it.

This is where you actually learn how the system works. Don't abstract it away before you understand it.

### **Build Tooling In-Context**

Build the tool while you're in the context that motivates it. Don't treat it as a separate investment.

The cost is low because you're already there. The payoff compounds. Session 1's throwaway script becomes Session 2's foundation.

### **Externalize Knowledge**

Don't rely on the AI to "remember." Put it in:

- **Tool functions** (live grounding)
- **Memory files** (cross-session persistence)
- **Config files** (static knowledge)
- **CLI wrappers** (reusable operations)

This is the entire system. It's not complicated. It's just disciplined.

---

## **What Local Models Actually Do**

The real value: **translating intent at arbitrary abstraction levels into code.**

Not typing speed. The model takes high-level intent and generates correct implementation without holding every detail in working memory—*if* you've externalized the details into tools, config, and memory.

Smaller models are worse at this than frontier models. But with good tooling, a 7B model on your laptop will beat Claude Sonnet 4.6 or o3 on your specific workflow because:

- Lower latency (local inference)
- Better context (your tools are built for your domain)
- No API failures
- No rate limits
- No data leaving your machine

**Good at:**

- Translating intent to code
- Applying known patterns
- Working with well-defined abstractions

**Bad at:**

- Multi-step plans across turns
- Stateful reasoning
- Operating from stale context

Accept the limitations. Design around them.

---

## **The Workflow**

1. Identify patterns in AI interactions
1. Build tools/abstractions for those patterns *while in that context*
1. Use AI at higher level of abstraction
1. Iterate

The difference between good and bad agentic coding: **the one doing it well is building systems that build systems so that they can eventually make the thing they want.**

It's turtles all the way down, but each turtle is a stable platform.

---

## **Case Study: oVirt, Then ESXi**

A client needed VM lifecycle automation. They were running oVirt—open-source, reasonable API, not a lot of tooling love in the ecosystem. I built it myself.

**A note on MCP servers:** There's an MCP server for this. I looked at it. When things break you want to own the error handling, not debug someone else's abstraction. Build it yourself.

The build went like this: started with inline Python—every operation was 20 lines, re-authing each time, hardcoded to specific hosts. Fine for one-off tasks. Terrible for an agent. So I extracted it to a CLI (`bin/ovirt`): same logic, just callable. Validated it with `vm list`, `vm status`. Then added tool schemas on top—operation functions were identical, just wrapped in JSON-RPC. About 60 lines of new code. Did a pass to remove hardcoded assumptions: cluster names, datastore paths, port. That took longer than the MCP wrapper.

The CLI was free. We needed those operations anyway. The agent surface cost almost nothing because the hard part was already done.

Six months later, same client. They were migrating to ESXi.

I sat down expecting the same effort. It wasn't. The vSphere API is different from oVirt's—different auth, different resource model, different endpoint shapes. But the *operations* were the same: list VMs, start, stop, snapshot, get status. I wrote a new API client (`bin/esxi`), swapped it in, and the tool schemas transferred almost unchanged. Done in an afternoon.

I didn't design the oVirt tooling to be reusable. I didn't set out to prove anything about abstractions. The second project just told me the first was good.

That's the signal. If substituting the platform is mechanical, the abstraction is real—the operations are genuinely separate from the API client. If it's painful, something bled through. You didn't find the right seam.

Building with an agent accelerates this feedback loop. You're forced to articulate the pattern clearly enough that the agent can execute it. That articulation pressure is the same thing that makes abstractions substitutable. You can't stay vague—the agent needs an actual interface. So good AI-assisted tooling and good abstractions end up being the same requirement, almost by accident.

---

## **Bottom Line**

Tools over weights. This isn't LLM-specific—it's just good engineering.

Solid findings end up as tools, not tribal knowledge. Good architecture reduces cognitive load—for humans and AI.

You're not prompting the AI to be smarter. You're engineering systems that let it work effectively within its limitations.

And you're doing it locally, on hardware you control, with models you can modify, without cloud dependencies.

That's sustainable. That's how you build something that lasts.

---

*Want to chat about local LLM workflows or share your own experiments? Hit me up on [Bluesky](https://bsky.app/profile/llmentalist.bsky.social) or [Mastodon](https://mastodon.social/@llmentalist)! I'd love to hear what you're building.* ✨

