import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function DiscAnimation({ scene, isPlaying }) {
  const DiscRef = useRef();
  const rotationSpeedRef = useRef(0);

  useFrame(() => {
    const Disc = scene.getObjectByName('Disc');
    if (Disc) {
      if (isPlaying) {
        // Gradually increase rotation speed until it reaches 1.04 (slower acceleration)
        rotationSpeedRef.current = Math.min(1.04, rotationSpeedRef.current + 0.005);
      } else {
        // Gradually decrease rotation speed until it stops (slower deceleration)
        rotationSpeedRef.current = Math.max(0, rotationSpeedRef.current - 0.005);
      }
      Disc.rotation.y += rotationSpeedRef.current;
    }
  });

  return null;
}
