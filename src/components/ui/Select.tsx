"use client";

import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldBaseClass } from "./Input";

export type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  label,
  options,
  placeholder,
  id,
  className,
  ...props
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-cream/80">
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          className={cn(
            fieldBaseClass,
            "h-12 cursor-pointer appearance-none px-4 pr-11 text-[0.95rem]",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-midnight text-cream">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-midnight text-cream"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-cream/50"
        />
      </div>
    </div>
  );
}
