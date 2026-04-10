import { anthropic } from "@ai-sdk/anthropic";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";

const ralliedProvider = customProvider({
  languageModels: {
    "chat-model": anthropic("claude-sonnet-4-20250514"),
    "title-model": anthropic("claude-haiku-4-5-20251001"),
  },
});

export const myProvider = isTestEnvironment
  ? (() => {
      const { chatModel, titleModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": titleModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }
  // Use our custom provider for known models, fall back to chat-model
  try {
    return ralliedProvider.languageModel(modelId);
  } catch {
    return ralliedProvider.languageModel("chat-model");
  }
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return ralliedProvider.languageModel("title-model");
}
