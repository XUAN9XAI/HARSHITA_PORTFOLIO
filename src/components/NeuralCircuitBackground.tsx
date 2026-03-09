import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 2.5;
const CURSOR_RADIUS = 3;

function NeuralNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2(999, 999));
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.001
      ),
      baseScale: 0.03 + Math.random() * 0.04,
    }));
  }, []);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    },
    []
  );

  // Attach global listener
  useMemo(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    const mouseWorld = new THREE.Vector3(
      mouse.current.x * viewport.width * 0.5,
      mouse.current.y * viewport.height * 0.5,
      0
    );

    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const node = nodes[i];
      node.position.add(node.velocity);

      // Boundary bounce
      if (Math.abs(node.position.x) > 5) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 4) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 2) node.velocity.z *= -1;

      // Cursor glow
      const distToCursor = node.position.distanceTo(mouseWorld);
      const cursorInfluence = Math.max(0, 1 - distToCursor / CURSOR_RADIUS);
      const scale = node.baseScale + cursorInfluence * 0.06;

      dummy.position.copy(node.position);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color();
      color.setHSL(0.43, 0.8, 0.3 + cursorInfluence * 0.5);
      meshRef.current.setColorAt(i, color);

      // Connections
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = node.position.distanceTo(nodes[j].position);
        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          linePositions.push(
            node.position.x, node.position.y, node.position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
          const c = new THREE.Color().setHSL(0.43, 0.7, 0.25 + alpha * 0.3);
          lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    const lineGeo = linesRef.current.geometry;
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0.8} toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} toneMapped={false} />
      </lineSegments>
    </>
  );
}

const NeuralCircuitBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <NeuralNodes />
      </Canvas>
    </div>
  );
};

export default NeuralCircuitBackground;
