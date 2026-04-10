"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { useSearchParams } from "next/navigation";
import { suggestions } from "@/lib/constants";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "../ai-elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

const ticketSuggestions = [
  "Diagnose this ticket",
  "Resolution steps",
  "Draft a response",
  "Similar tickets",
];

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
};

function PureSuggestedActions({ chatId, sendMessage }: SuggestedActionsProps) {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const suggestedActions = ticketId ? ticketSuggestions : suggestions;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className="grid w-full grid-cols-2 gap-1.5"
        data-testid="suggested-actions"
      >
        {suggestedActions.map((suggestedAction, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            initial={{ opacity: 0, y: 8 }}
            key={suggestedAction}
            transition={{
              delay: 0.04 * index,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Suggestion
              className="h-auto w-full cursor-pointer rounded-lg border border-border bg-card px-3 py-2.5 text-center text-xs font-medium leading-tight text-muted-foreground shadow-[var(--shadow-card)] transition-all duration-150 hover:bg-accent hover:text-foreground hover:shadow-[var(--shadow-float)] active:scale-[0.97]"
              onClick={(suggestion) => {
                window.history.pushState(
                  {},
                  "",
                  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/chat/${chatId}`
                );
                sendMessage({
                  role: "user",
                  parts: [{ type: "text", text: suggestion }],
                });
              }}
              suggestion={suggestedAction}
            >
              {suggestedAction}
            </Suggestion>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }

    return true;
  }
);
