import { Compass, Home } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimatedRouteLine } from "@/components/motion/AnimatedRouteLine";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-32">
      <div aria-hidden className="absolute inset-0 bg-aurora" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative flex max-w-md flex-col items-center gap-5 text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise">
          <Compass className="size-8" />
        </span>
        <p className="font-display text-6xl font-extrabold text-gradient">404</p>
        <h1 className="font-display text-2xl font-extrabold text-cream">
          Маршрут не найден
        </h1>
        <p className="text-cream/65">
          Похоже, такой страницы нет. Вернёмся к началу путешествия и подберём
          вам тур.
        </p>
        <AnimatedRouteLine variant="arc" className="max-w-xs opacity-60" />
        <CTAButton href="/" variant="primary" size="lg">
          <Home className="size-4" />
          На главную
        </CTAButton>
      </div>
    </div>
  );
}
