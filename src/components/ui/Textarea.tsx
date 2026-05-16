"use client";

import { useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { fieldBaseClass } from "./Input";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function Textarea({
  label,
  hint,
  id,
  className,
  rows = 4,
  ...props
}: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-cream/80">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        className={cn(
          fieldBaseClass,
          "resize-y px-4 py-3 text-[0.95rem] leading-relaxed",
          className,
        )}
        {...props}
      />
      {hint && <span className="text-xs text-cream/45">{hint}</span>}
    </div>
  );
}
