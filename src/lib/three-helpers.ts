import * as THREE from "three";

/** Радиус 3D-глобуса сцены. */
export const GLOBE_RADIUS = 1.5;

/** Точка вылета — Алматы (демо-координаты для сцены). */
export const ALMATY = { lat: 43.2, lng: 76.9 };

/** Направления маршрутов из Алматы для авиалиний сцены. */
export const SCENE_ROUTE_TARGETS = [
  { lat: 36.9, lng: 31.0 }, // Турция
  { lat: 25.2, lng: 55.3 }, // ОАЭ
  { lat: 7.9, lng: 98.3 }, // Таиланд
  { lat: 3.2, lng: 73.2 }, // Мальдивы
  { lat: 27.9, lng: 34.3 }, // Египет
];

/** Переводит широту/долготу в точку на сфере заданного радиуса. */
export function latLngToVec3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Строит дугообразный маршрут между двумя точками на сфере. */
export function buildArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  lift = 1.36,
): THREE.QuadraticBezierCurve3 {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize().multiplyScalar(midLength * lift + 0.18);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

/** Распределяет count точек равномерно по сфере (спираль Фибоначчи). */
export function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * ring * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * ring * radius;
  }
  return positions;
}

/** Гладкая интерполяция в диапазоне 0..1. */
export function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/**
 * Вес активности объекта на диапазоне скролл-стадий [from..to]
 * с плавным затуханием по краям. Возвращает 0..1.
 */
export function bandWeight(
  stage: number,
  from: number,
  to: number,
  fade = 0.95,
): number {
  if (stage <= from - fade || stage >= to + fade) return 0;
  if (stage < from) return smoothstep((stage - (from - fade)) / fade);
  if (stage <= to) return 1;
  return smoothstep(1 - (stage - to) / fade);
}

/** Центры «континентов» — для абстрактного рисунка суши на дот-глобусе. */
const CONTINENT_CENTERS = [
  { lat: 8, lng: 21 },
  { lat: 50, lng: 14 },
  { lat: 46, lng: 92 },
  { lat: 44, lng: -100 },
  { lat: -12, lng: -58 },
  { lat: -25, lng: 134 },
];

/**
 * Делит точки сферы на «сушу» (яркие дотты) и «океан» (тусклые),
 * создавая узнаваемый, но абстрактный рисунок планеты без текстур.
 */
export function continentDots(count: number, radius: number) {
  const land: number[] = [];
  const ocean: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * ring;
    const z = Math.sin(theta) * ring;
    const lat = Math.asin(y) * (180 / Math.PI);
    const lng = Math.atan2(z, x) * (180 / Math.PI);
    const isLand = CONTINENT_CENTERS.some((c) => {
      const dLat = lat - c.lat;
      const dLng = ((lng - c.lng + 540) % 360) - 180;
      return (
        Math.hypot(dLat, dLng * Math.cos((lat * Math.PI) / 180)) < 30
      );
    });
    const target = isLand ? land : ocean;
    target.push(x * radius, y * radius, z * radius);
  }
  return { land: new Float32Array(land), ocean: new Float32Array(ocean) };
}

/** Камера-кейфреймы скролл-стадий: [позиция, цель взгляда]. */
export const CAMERA_STAGES: { pos: [number, number, number]; target: [number, number, number] }[] = [
  { pos: [0, 0.45, 7.4], target: [0, 0, 0] },
  { pos: [1.5, 0.15, 5.7], target: [0.35, 0, 0] },
  { pos: [-1.35, 0.65, 6.1], target: [-0.25, 0.1, 0] },
  { pos: [0, 0.2, 8.7], target: [0, 0, 0] },
  { pos: [2.05, 0.95, 6.0], target: [0.65, 0.2, 0] },
  { pos: [0, 1.5, 6.5], target: [0, -0.35, 0] },
  { pos: [-1.7, 0.4, 6.5], target: [-0.3, 0, 0] },
  { pos: [0, 0.35, 7.9], target: [0, 0, 0] },
];
