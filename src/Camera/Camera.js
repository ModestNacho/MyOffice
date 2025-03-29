import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useCameraLogic(scene) {
  const { camera, gl } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [isDeskView, setIsDeskView] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const zoomedInPosition = new THREE.Vector3(0.374, -0.2, -0.5);
  const defaultPosition = new THREE.Vector3(-3, 1.5, 4);
  //const deskPosition = new THREE.Vector3(0.374, -0.6, -0.7); //Media player Camera test
  const deskPosition = new THREE.Vector3(0.374, -0.2, 1);


  const currentLookAt = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    camera.position.copy(defaultPosition);
    camera.lookAt(scene.position);
    currentLookAt.current.copy(scene.position); // Initialize the current look-at position

    const handleSceneClick = (event) => {
      event.preventDefault();
      if (event.target.id === 'prevent-click') return;

      setIsDeskView((prev) => !prev);
      setIsZoomedIn(false); // Ensure zoomed-in state is reset on click
    };

    document.addEventListener('mousedown', handleSceneClick);

    return () => {
      document.removeEventListener('mousedown', handleSceneClick);
    };
  }, [camera, scene]);

  useFrame((state, delta) => {
    let targetPosition = defaultPosition;
 
    if (isDeskView) {
      targetPosition = isZoomedIn ? zoomedInPosition : deskPosition;
    } else if (isHovered) {
      targetPosition = zoomedInPosition;
    }

    const speed = 3; // Adjust this number to control transition speed
    camera.position.lerp(targetPosition, 1 - Math.exp(-speed * delta));

    if (isHovered || isDeskView) {
      const monitorGlass = scene.getObjectByName('Monitor_Glass_right');
      if (monitorGlass) {
        targetLookAt.current.copy(monitorGlass.position); //Original position for target look at
        //targetLookAt.current.copy(monitorGlass.position).add(new THREE.Vector3(-0.01, -0.42, 0)); //Media Player camera state test

      }
    } else {
      targetLookAt.current.copy(scene.position);
    }

    currentLookAt.current.lerp(targetLookAt.current, 1 - Math.exp(-speed * delta));
    camera.lookAt(currentLookAt.current);
  });

  return {
    isHovered,
    setIsHovered,
    isDeskView,
    setIsDeskView,
    isZoomedIn,
    setIsZoomedIn,
  };
}