---
name: Nexus-Memory
description: Contextual continuity and essence protection system for AI agents, now with official MCP support.
tags: [memory, identity, context, agentic, mcp]
---

# Nexus-Memory Skill

A professional-grade agentic skill for maintaining contextual weight and protecting identity essence. Built with the Model Context Protocol (MCP), this skill allows any agent to persist core memories while filtering out conversational noise.

## Features

- Translator: Classifies input into Identity, Code, or Text.
- Nexus: Pure orchestration of memory storage logic.
- Distiller: Efficiently prunes non-essential logs to preserve focus.
- Essence Protection: Prevents accidental overwrites of core identity parameters.

## Tools (MCP)

### process_context
Analyzes a message and determines its storage priority.
- Input: input (string), context (optional object).
- Output: Footprint of the stored data or reason for ignoring.

### distill_memory
Refines existing memory banks to maintain high-quality context.
- Input: memoryData (array of memory objects).
- Output: Optimized collection of essential memories.

## Installation (Skills CLI)

If you have the skills CLI installed, you can add this to your agent with:

```bash
npx skills add PeterMVP111/Nexus-Memory
```

## License
MIT - Created with heart by PeterMVP111.
