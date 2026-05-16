import { create } from "zustand";

/**
 * Глобальное состояние режима визуального QA и управления анимацией.
 * Флаги выставляются из URL (?qa=1, ?motion=off, ?scene=freeze)
 * и из системной настройки prefers-reduced-motion.
 */
export interface QaState {
  /** ?qa=1 — режим инспекции: всё статично, сцена в хорошем кадре */
  qa: boolean;
  /** ?motion=off ИЛИ prefers-reduced-motion */
  motionOff: boolean;
  /** ?scene=freeze — заморозить только 3D-сцену */
  freezeScene: boolean;
  /** true после инициализации на клиенте */
  ready: boolean;
  apply: (
    next: Partial<Pick<QaState, "qa" | "motionOff" | "freezeScene">>,
  ) => void;
}

export const useQaStore = create<QaState>((set) => ({
  qa: false,
  motionOff: false,
  freezeScene: false,
  ready: false,
  apply: (next) => set({ ...next, ready: true }),
}));
