export const DEFAULT_CHAT_MODEL = "chat-model";

export const titleModel = {
  id: "title-model",
  name: "Claude Haiku",
  provider: "anthropic",
  description: "Fast model for title generation",
};

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  gatewayOrder?: string[];
  reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high";
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Claude Sonnet",
    provider: "anthropic",
    description: "Fast and capable model with tool use",
  },
];

export async function getCapabilities(): Promise<
  Record<string, ModelCapabilities>
> {
  return {
    "chat-model": { tools: true, vision: true, reasoning: false },
    "title-model": { tools: false, vision: false, reasoning: false },
  };
}

export const isDemo = false;

export type GatewayModelWithCapabilities = ChatModel & {
  capabilities: ModelCapabilities;
};

export async function getAllGatewayModels(): Promise<
  GatewayModelWithCapabilities[]
> {
  return chatModels.map((m) => ({
    ...m,
    capabilities: { tools: true, vision: true, reasoning: false },
  }));
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>,
);
