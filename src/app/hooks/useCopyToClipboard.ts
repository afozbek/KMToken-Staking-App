"use client";

import { useCallback } from "react";
import { useToast } from "./useToast";

export const useCopyToClipboard = () => {
  const toast = useToast();

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (typeof window === "undefined") return;

      try {
        await navigator.clipboard.writeText(text);
        toast.success("Text copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy text to clipboard");
        console.error(err);
      }
    },
    [toast]
  );

  return copyToClipboard;
};
