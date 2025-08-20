import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';

export function useRenderer(scene) {
  // Create and memoize the texture
  const texture = useTexture('./assets/BakedTexture(StickyNote).jpg');
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;

  // Memoize all materials so they're only created once
  const materials = useMemo(() => ({
    texture: new THREE.MeshStandardMaterial({
      map: texture,
    }),
    monitorGlass: new THREE.MeshPhysicalMaterial({
      color: 0x000000,
    }),
    pcGlass: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transmission: 1,
      thickness: 0.1,
      ior: 1.4,
    }),
    emissiveOrange: new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xffa500,
      emissiveIntensity: 1.5,
    }),
    emissiveGreen: new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x00ff00,
      emissiveIntensity: 1.5,
    }),
  }), [texture]); // Only recreate if texture changes

  // Reference to store mesh references
  const meshRefs = useRef({});

  useEffect(() => {
    // Do scene traversal once and store mesh references
    scene.traverse((child) => {
      if (child.isMesh) {
        meshRefs.current[child.name] = child;
        // Apply materials using the memoized versions
        if (child.name === 'Monitor_Glass_right') {
          child.material = materials.monitorGlass;
        } else if (child.name === 'PC_Glass') {
          child.material = materials.pcGlass;
        } else if (child.name === 'PC006' || child.name === 'Keeb_Light_right') {
          child.material = materials.emissiveOrange;
        } else if (child.name === 'PC008' || child.name === 'Keeb_Light_left') {
          child.material = materials.emissiveGreen;
        } else {
          child.material = materials.texture;
        }
      }
    });
  }, [scene, materials]); // Only re-run if scene or materials change
}
