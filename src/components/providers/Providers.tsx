"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useLenis } from "@/lib/useLenis";
import { FreezeMotionProvider } from "@/components/motion/FreezeMotionProvider";

export function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useLenis();

  // На каждой навигации возвращаемся в начало страницы.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenisRef]);

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "user"}>
      <FreezeMotionProvider>{children}</FreezeMotionProvider>
    </MotionConfig>
  );
}
