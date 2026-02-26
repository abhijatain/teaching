"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyFinalCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex-1">
        Final code for this lesson — copy into{" "}
        <code className="text-xs bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded">
          matches.py
        </code>
      </span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
        aria-label="Copy code to clipboard"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy Code"}
      </button>
    </div>
  );
}
