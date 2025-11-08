import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
// คุณอาจต้องติดตั้ง OrbitControls หากต้องการหมุนโมเดลในพรีวิว
// import { OrbitControls } from "@react-three/drei";

// กำหนด Props ที่จะรับค่าจาก Component แม่
interface NameTag3DProps {
  name: string;
  color: string;
}

// คอมโพเนนต์ Nametag 3D
export function NameTag3D({ name, color }: NameTag3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { scene } = useThree();

  // ตั้งค่าพื้นหลังเป็นสีขาวในซีน 3D
  useEffect(() => {
    scene.background = new THREE.Color(0xffffff);
  }, [scene]);

  // ตัวอย่างการทำให้หมุนอัตโนมัติ (uncomment หากต้องการ)
  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += 0.005;
  //   }
  // });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* 1. ตัวป้ายชื่อ (Badge) - ขนาด 4x1.5x0.2 */}
      <boxGeometry args={[4, 1.5, 0.2]} />
      {/* MeshPhysicalMaterial สำหรับ Material ที่ดูสมจริง (เช่น โลหะ/พลาสติก) */}
      <meshPhysicalMaterial
        color={color} // ใช้สีจาก props
        metalness={0.8}
        roughness={0.2}
      />

      {/* 2. ข้อความ Nametag (ใช้ Drei's Text component) */}
      <Text
        position={[0, 0, 0.11]} // เลื่อนข้อความมาด้านหน้าเล็กน้อย
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </mesh>
  );
}

// คอมโพเนนต์ Scene Wrapper ที่ใส่ไฟและ Controls
export function SceneWrapper(props: NameTag3DProps) {
  return (
    <>
      {/* แสงสว่างหลัก */}
      <directionalLight position={[5, 5, 5]} intensity={3} />
      {/* แสงสว่างเสริม */}
      <ambientLight intensity={1} />

      {/* OrbitControls ทำให้ผู้ใช้สามารถหมุนฉาก 3D ได้ (ต้องติดตั้ง @react-three/drei ก่อน) */}
      {/* <OrbitControls enablePan={false} enableZoom={true} /> */}

      <NameTag3D {...props} />
    </>
  );
}
