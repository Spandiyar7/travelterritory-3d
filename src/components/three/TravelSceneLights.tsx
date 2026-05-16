/** Атмосферное освещение глобальной 3D-сцены (без удалённых HDR-карт). */
export function TravelSceneLights() {
  return (
    <>
      <hemisphereLight args={["#f7fffb", "#c8eadf", 1.45]} />
      <ambientLight intensity={0.5} />
      {/* Тёплый ключевой свет — «солнце» */}
      <directionalLight position={[5, 6, 4]} intensity={2.7} color="#fff1da" />
      {/* Холодная подсветка-контур */}
      <pointLight
        position={[-6.5, -1.5, -4]}
        intensity={60}
        color="#38a7d8"
        distance={24}
      />
      {/* Тёплый акцент заката */}
      <pointLight
        position={[5, -3, 5]}
        intensity={38}
        color="#f97316"
        distance={22}
      />
      {/* Мягкий верхний свет */}
      <pointLight
        position={[0, 6, 2]}
        intensity={22}
        color="#bfe3ff"
        distance={20}
      />
    </>
  );
}
