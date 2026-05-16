"use client";

import { useMemo } from "react";
import * as THREE from "three";

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vView)), 2.6);
    gl_FragColor = vec4(uColor, fresnel * 0.9);
  }
`;

/** Многослойный атмосферный ореол глобуса: фреснель-кромка + мягкое свечение. */
export function GlobeAtmosphere({ radius = 1.5 }: { radius?: number }) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color("#38a7d8") } }),
    [],
  );

  return (
    <>
      {/* Яркая фреснель-кромка */}
      <mesh scale={radius * 1.085}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Широкое мягкое свечение */}
      <mesh scale={radius * 1.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#9be6d0"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}
