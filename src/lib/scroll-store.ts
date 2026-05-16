import { create } from "zustand";

/** Количество скролл-стадий главной страницы. */
export const STAGE_COUNT = 8;

/** Названия стадий — для HUD и навигации по сцене. */
export const STAGE_NAMES = [
  "Главная",
  "Страны",
  "Горящие туры",
  "Подбор тура",
  "Почему мы",
  "Как это работает",
  "Отзывы",
  "Заявка",
] as const;

interface SceneScrollState {
  /** Прогресс скролла по всей странице, 0..1 */
  progress: number;
  /** Текущая стадия как float 0..STAGE_COUNT-1 — для плавных переходов сцены */
  stage: number;
  /** Нормализованный указатель -1..1 (для параллакса камеры) */
  pointerX: number;
  pointerY: number;
  setProgress: (p: number) => void;
  setPointer: (x: number, y: number) => void;
}

/**
 * Глобальное состояние скролл-сцены. 3D-мир читает его в useFrame
 * через getState() — без ре-рендеров React.
 */
export const useSceneStore = create<SceneScrollState>((set) => ({
  progress: 0,
  stage: 0,
  pointerX: 0,
  pointerY: 0,
  setProgress: (p) => {
    const clamped = Math.min(1, Math.max(0, p));
    set({ progress: clamped, stage: clamped * (STAGE_COUNT - 1) });
  },
  setPointer: (x, y) => set({ pointerX: x, pointerY: y }),
}));
