import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none transition-all duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#11865d,#13b389)] text-white shadow-[0_12px_34px_-12px_rgba(17,134,93,0.62)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(17,134,93,0.74)]",
  whatsapp:
    "bg-[linear-gradient(135deg,#10b981,#22c55e)] text-white shadow-[0_12px_34px_-12px_rgba(16,185,129,0.75)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(16,185,129,0.9)]",
  secondary:
    "glass text-cream hover:-translate-y-0.5 hover:border-turquoise/25 hover:bg-white/90",
  outline:
    "border border-turquoise/20 bg-white/45 text-cream hover:-translate-y-0.5 hover:border-turquoise/40 hover:bg-white/80",
  ghost: "text-cream/75 hover:bg-turquoise/8 hover:text-cream",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[0.8rem]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[0.95rem]",
};

/** Возвращает строку классов кнопки — переиспользуется в ссылках-CTA. */
export function buttonStyles({
  variant = "primary",
  size = "md",
}: { variant?: ButtonVariant; size?: ButtonSize } = {}): string {
  return cn(base, variants[variant], sizes[size]);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
