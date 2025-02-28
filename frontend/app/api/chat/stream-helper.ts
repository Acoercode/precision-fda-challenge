import { StreamData } from "ai";
import {
  CallbackManager,
  Metadata,
  NodeWithScore,
  ToolCall,
  ToolOutput,
} from "llamaindex";

// Append image data annotation
export function appendImageData(data: StreamData, imageUrl?: string) {
  if (!imageUrl) return;
  data.appendMessageAnnotation({
    type: "image",
    data: { url: imageUrl },
  });
}

// Append source data annotation
export function appendSourceData(
  data: StreamData,
  sourceNodes?: NodeWithScore<Metadata>[],
) {
  if (!sourceNodes?.length) return;
  data.appendMessageAnnotation({
    type: "sources",
    data: {
      nodes: sourceNodes.map((node) => ({
        ...node.node.toMutableJSON(),
        id: node.node.id_,
        score: node.score ?? null,
      })),
    },
  });
}

// Append event data annotation
export function appendEventData(data: StreamData, title?: string) {
  if (!title) return;
  data.appendMessageAnnotation({
    type: "events",
    data: { title },
  });
}

// Append tool data annotation
export function appendToolData(
  data: StreamData,
  toolCall: ToolCall,
  toolOutput: ToolOutput,
) {
  data.appendMessageAnnotation({
    type: "tools",
    data: {
      toolCall: {
        id: toolCall.id,
        name: toolCall.name,
        input: toolCall.input,
      },
      toolOutput: {
        output: toolOutput.output,
        isError: toolOutput.isError,
      },
    },
  });
}

// New: Append AI response status annotation
export function appendAIResponseStatus(data: StreamData, isComplete: boolean) {
  data.appendMessageAnnotation({
    type: "response-status",
    data: {
      status: isComplete ? "complete" : "incomplete",
      timestamp: new Date().toISOString(),
    },
  });
}

// Create the callback manager with AI response status
export function createCallbackManager(stream: StreamData) {
  const callbackManager = new CallbackManager();

  callbackManager.on("retrieve", (data) => {
    const { nodes, query } = data.detail;
    appendEventData(stream, `Retrieving context for query: '${query}'`);
    appendEventData(
      stream,
      `Retrieved ${nodes.length} sources to use as context for the query`,
    );
  });

  callbackManager.on("llm-tool-call", (event) => {
    const { name, input } = event.detail.payload.toolCall;
    const inputString = Object.entries(input)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    appendEventData(
      stream,
      `Using tool: '${name}' with inputs: '${inputString}'`,
    );
  });

  callbackManager.on("llm-tool-result", (event) => {
    const { toolCall, toolResult } = event.detail.payload;
    appendToolData(stream, toolCall, toolResult);
  });

  callbackManager.on("llm-end", (event) => {
    let isComplete = true;
    const incompleteResponseContent = [
      "The provide information does not include",
      "The provided information does not specify",
      "unable to provide",
      "I don't have direct access",
      "The context provided does not include",
    ];
    const response = event.detail.payload.response.message;
    // @ts-ignore
    if (
      incompleteResponseContent.some((phrase) =>
          //@ts-ignore
        response.content.includes(phrase),
      )
    ) {
      isComplete = false;
    }
    appendAIResponseStatus(stream, isComplete); // Append the status
  });

  return callbackManager;
}
