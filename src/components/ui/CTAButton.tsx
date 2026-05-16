import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./Button";

type LinkHref = ComponentProps<typeof Link>["href"];

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Открыть во внешней вкладке (WhatsApp, tel, mailto) */
  external?: boolean;
  "aria-label"?: string;
};

/**
 * Ссылка-кнопка. Внутренние маршруты рендерятся через next/link,
 * внешние (WhatsApp / tel / mailto) — через обычный <a>.
 */
export function CTAButton({
  href,
  children,
  variant,
  size,
  className,
  external,
  ...rest
}: CTAButtonProps) {
  const isExternal =
    external ||
    /^(https?:|tel:|mailto:)/.test(href) ||
    href.includes("wa.me");
  const classes = cn(buttonStyles({ variant, size }), className);

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as LinkHref} className={classes} {...rest}>
      {children}
    </Link>
  );
}
