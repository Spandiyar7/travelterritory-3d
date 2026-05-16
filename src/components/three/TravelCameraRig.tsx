"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_STAGES, smoothstep } from "@/lib/three-helpers";
import { useSceneStore } from "@/lib/scroll-store";
import { useSceneFrozen } from "@/lib/useReducedMotion";

// Рабочие векторы на уровне модуля (компонент существует в единственном экземпляре).
const scratch = {
  pos: new THREE.Vector3(),
  posNext: new THREE.Vector3(),
  target: new THREE.Vector3(),
  targetNext: new THREE.Vector3(),
  lookAt: new THREE.Vector3(),
};

/**
 * Камера, ведущая зрителя через 8 скролл-стадий путешествия.
 * Позиция интерполируется по прогрессу скролла + лёгкий параллакс за курсором.
 */
export function TravelCameraRig() {
  const frozen = useSceneFrozen();

  useFrame((state) => {
    const { stage, pointerX, pointerY } = useSceneStore.getState();
    const maxIndex = CAMERA_STAGES.length - 1;
    const i = Math.min(maxIndex - 1, Math.max(0, Math.floor(stage)));
    const f = smoothstep(stage - i);

    scratch.pos.set(...CAMERA_STAGES[i].pos);
    scratch.posNext.set(...CAMERA_STAGES[i + 1].pos);
    scratch.pos.lerp(scratch.posNext, f);

    scratch.target.set(...CAMERA_STAGES[i].target);
    scratch.targetNext.set(...CAMERA_STAGES[i + 1].target);
    scratch.target.lerp(scratch.targetNext, f);

    if (!frozen) {
      scratch.pos.x += pointerX * 0.4;
      scratch.pos.y += -pointerY * 0.24;
    }

    const ease = frozen ? 1 : 0.1;
    state.camera.position.lerp(scratch.pos, ease);
    scratch.lookAt.lerp(scratch.target, ease);
    state.camera.lookAt(scratch.lookAt);
  });

  return null;
}
