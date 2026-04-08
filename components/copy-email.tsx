"use client";

import { useEffect, useState } from "react";

const EMAIL = "contact@ascendmarketing.xyz";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const onCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = EMAIL;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      aria-label={`Copy ${EMAIL}`}
      className={`copy-email${copied ? " is-copied" : ""}`}
      onClick={onCopy}
      type="button"
    >
      <span>{EMAIL}</span>
      <span aria-live="polite" className="copy-email-status">
        {copied ? "Copied" : "Click to copy"}
      </span>
    </button>
  );
}
