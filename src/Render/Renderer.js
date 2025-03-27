import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';

export function useRenderer(scene) {
  const texture = useTexture('./assets/BakedTexture(StickyNote).jpg');
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;

  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });

  const monitorGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
  
  });

  const pcGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    transmission: 1,
    thickness: 0.1,
    ior: 1.4,
  });

  const emissiveMaterialOrange = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0xffa500,
    emissiveIntensity: 1.5,
  });

  const emissiveMaterialGreen = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0x00ff00,
    emissiveIntensity: 1.5,
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'Monitor_Glass_right') {
          child.material = monitorGlassMaterial;
        } else if (child.name === 'PC_Glass') {
          child.material = pcGlassMaterial;
        } else if (child.name === 'PC006' || child.name === 'Keeb_Light_right') {
          child.material = emissiveMaterialOrange;
        } else if (child.name === 'PC008' || child.name === 'Keeb_Light_left') {
          child.material = emissiveMaterialGreen;
        } else {
          child.material = textureMaterial;
        }
      }
    });
  }, [scene]);
}
