import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { processInput } from "./flow/nexus.js";
import { distill } from "./flow/distiller.js";

// Create an MCP server
const server = new McpServer({
    name: "Nexus-Memory",
    version: "1.0.1",
});

// Register the 'process_context' tool
server.tool(
    "process_context",
  {
        input: z.string().describe("The message or data to process."),
        context: z.record(z.any()).optional().describe("Additional metadata or context."),
  },
    async ({ input, context }) => {
          const result = processInput(input, context);
          return {
                  content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
    }
  );

// Register the 'distill_memory' tool
server.tool(
    "distill_memory",
  {
        memoryData: z.array(z.any()).describe("The collection of memory items to filter."),
  },
    async ({ memoryData }) => {
          const result = distill(memoryData);
          return {
                  content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
    }
  );

// Start the server using stdio transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Nexus-Memory MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in MCP server:", error);
    process.exit(1);
});
