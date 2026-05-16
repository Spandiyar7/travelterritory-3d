"use client";

import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Общие классы полей формы (используются также в Select и Textarea). */
export const fieldBaseClass =
  "w-full rounded-2xl border border-turquoise/15 bg-white/75 text-cream placeholder:text-cream/35 outline-none transition-colors duration-200 focus:border-turquoise/55 focus:bg-white";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, id, className, ...props }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-cream/80">
        {label}
      </label>
      <input
        id={fieldId}
        className={cn(fieldBaseClass, "h-12 px-4 text-[0.95rem]", className)}
        {...props}
      />
      {hint && <span className="text-xs text-cream/45">{hint}</span>}
    </div>
  );
}
