"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TourRequestForm } from "@/components/tours/TourRequestForm";

type TourRequestModalProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** Кнопка + модальное окно с формой подбора тура. */
export function TourRequestModal({
  label = "Подобрать тур",
  variant = "primary",
  size = "md",
  className,
}: TourRequestModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        <Sparkles className="size-4" />
        {label}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Заявка на подбор тура"
      >
        <TourRequestForm embedded />
      </Modal>
    </>
  );
}
