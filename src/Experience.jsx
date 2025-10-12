import React from 'react';
import { useGLTF, Html, Stats, Sparkles } from '@react-three/drei';
import { useAudioManager } from './hooks/useAudioManager';
import { useCameraLogic } from './Camera/Camera';
import { useRenderer } from './Render/Renderer';
import { useQualitySettings } from './hooks/useQualitySettings';
import DiscAnimation from './Animations/DiscAnimation';

console.log("Welcome to CubeOS");

export default function Experience({ quality = 'Balanced', onCameraStateChange }) {
  // This will use the pre-loaded model from index.jsx instead of loading it again
  // Pre-loading + using it here
  const { scene, nodes } = useGLTF('./assets/MyOffice(StickyNote).glb');
  useRenderer(scene); // Pass the scene to the renderer
  useQualitySettings(quality); // Apply quality settings

  const {
    isHovered,
    setIsHovered,
    isDeskView,
    setIsDeskView,
    isZoomedIn,
    setIsZoomedIn,
  } = useCameraLogic(scene);

  // Notify parent component about camera state changes
  React.useEffect(() => {
    const isInDefaultView = !isDeskView && !isHovered;
    onCameraStateChange?.(isInDefaultView);
  }, [isDeskView, isHovered, onCameraStateChange]);

  // Use the audio manager hook
  const { isPlaying, setIsPlaying } = useAudioManager('./assets/Window Ambient.mp3');

  return (
    <>
      <ambientLight intensity={8.1} /> // maybe add a different texture for night time after fetching time of day from user
      <color args={['#241a1a']} attach="background" />
      
      {/* Pass the scene and isPlaying state to the DiscAnimation component */}
      <DiscAnimation scene={scene} isPlaying={isPlaying} />

      <primitive object={scene}>
        <Html
          transform
          wrapperClass="operatingSystem"
          distanceFactor={0.17}
          position={[0.376, -0.18, -1.235]}
          onPointerOver={() => {
            setIsHovered(true);
            if (isDeskView) {
              setIsZoomedIn(true);
            }
          }}
          onPointerOut={() => {
            setIsHovered(false);
            if (isDeskView) {
              setIsZoomedIn(false);
            }
          }}
          occlude="blending"
        >
          <iframe
            // src="https://modestnacho.github.io/operating-system/"
            src="https://modestnacho.github.io/operating-system/"
            onMouseEnter={() => {
              setIsHovered(true);
              if (isDeskView) {
                setIsZoomedIn(true);
              }
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              if (isDeskView) {
                setIsZoomedIn(false);
              }
            }}
          />
        </Html>
      </primitive>

      {/* GIFs */}
      <Html position={[-2.3, 0.5, 1.5]} transform>
        <img
          src="./assets/Click.gif"
          alt="Instructional GIF"
          style={{ width: '20px', height: 'auto' }}
        />
      </Html>

      <Html position={[-2.3, 0.15, 1.5]} transform>
        <img
          src="./assets/CurvedArrow.gif"
          alt="Instructional GIF"
          style={{ width: '20px', height: 'auto' }}
        />
      </Html>

      {/* Sparkles and Stats */}
      <Sparkles
        count={20}
        speed={0.3}
        opacity={0.3}
        color={'white'}
        size={3}
        scale={[3, 2, -2]}
        noise={1}
        position={[0.7, 0, -0.5]}
      />
      <Stats /> 
    </>
  );
}


// Last working code (Green HTML created for media player to figure out positioning)


// import { useGLTF, Html, Stats, Sparkles } from '@react-three/drei';
// import { useState, useEffect } from 'react';
// import { useCameraLogic } from './Camera/Camera';
// import { useRenderer } from './Render/Renderer';
// import * as THREE from 'three';

// export default function Experience() {
//   const { scene } = useGLTF('/Assets/MyOffice(Baked7).glb');
//   useRenderer(scene);

//   const {
//     isHovered,
//     setIsHovered,
//     isDeskView,
//     setIsDeskView,
//     isZoomedIn,
//     setIsZoomedIn,  
//   } = useCameraLogic(scene);

//   return (
//     <>
//       <ambientLight intensity={8.1} />
//       <color args={['#241a1a']} attach="background" />
//       {/* <PresentationControls
//         global
//         rotation={[0.13, 0.1, 0]}
//         polar={[-0.4, 0.2]}
//         azimuth={[-1, 0.75]}
//         config={{ mass: 2, tension: 300 }}
//         snap={{ mass: 4, tension: 300 }}
//       > */}
//       <primitive object={scene}>
//         <Html
//           transform
//           wrapperClass="operatingSystem"
//           distanceFactor={0.17}
//           position={[0.376, -0.18, -1.235]}
//           onPointerOver={() => {
//             setIsHovered(true);
//             if (isDeskView) {
//               setIsZoomedIn(true);
//             }
//           }}
//           onPointerOut={() => {
//             setIsHovered(false);
//             if (isDeskView) {
//               setIsZoomedIn(false);
//             }
//           }}
//           occlude="blending"
//         >
//           <iframe
//             src="http://localhost:3000/"
//             onMouseEnter={() => {
//               setIsHovered(true);
//               if (isDeskView) {
//                 setIsZoomedIn(true);
//               }
//             }}
//             onMouseLeave={() => {
//               setIsHovered(false);
//               if (isDeskView) {
//                 setIsZoomedIn(false);
//               }
//             }}
//           />
//         </Html>
//       </primitive>

//       {/* GIF positioned at specific coordinates */}
//       <Html position={[-2.3, 0.5, 1.5]} transform>
//         <img
//           src="/Assets/Click.gif"
//           alt="Instructional GIF"
//           style={{ width: '20px', height: 'auto' }}
//         />
//       </Html>

//       <Html position={[-2.3, 0.15, 1.5]} transform>
//         <img
//           src="/Assets/CurvedArrow.gif"
//           alt="Instructional GIF"
//           style={{ width: '20px', height: 'auto' }}
//         />
//       </Html>

//       <Html
//         wrapperClass="green-rectangle-wrapper"
//         distanceFactor={0.02} // Adjust this value to control the size based on distance
//         position={[0.341, -0.618, -1.275]}
//         transform
//         occlude="blending"

//       >
//         <div className="green-rectangle" />
//       </Html>


//       {/* </PresentationControls> */}
//       <Sparkles
//         count={20}
//         speed={0.3}
//         opacity={0.3}
//         color={'white'}
//         size={2}
//         scale={[3, 2, -2]}
//         noise={1}
//         position={[0.7, 0, -0.5]}
//       />
//       {/* Add an AxesHelper to indicate the middle of the sparkles */}
//       {/* <axesHelper args={[1]} position={[0.7, 0, -0.5]} /> */}
//       <Stats />
//     </>
//   );
// }

// // Debugging code #2

// import { useGLTF, PresentationControls, Html, Stats, useTexture, Sparkles, OrbitControls } from '@react-three/drei';
// import { useThree, useFrame } from '@react-three/fiber';
// import { useState, useEffect } from 'react';
// import * as THREE from 'three';

// export default function Experience() {
//   const { scene } = useGLTF('/Assets/MyOffice(Baked7).glb');
//   const { camera } = useThree();
//   const [isHovered, setIsHovered] = useState(false);

//   const defaultPosition = new THREE.Vector3(-3, 1.5, 4);
//   const defaultLookAt = new THREE.Vector3(0, 0, 0);

//   const texture = useTexture('/Assets/Baked7.jpg');
//   texture.flipY = false;
//   texture.colorSpace = THREE.SRGBColorSpace;
//   const textureMaterial = new THREE.MeshStandardMaterial({
//     map: texture,
//   });

//   // Create the material for the Monitor glass effect
//   const monitorGlassMaterial = new THREE.MeshPhysicalMaterial({
//     color: 0xffffff,
//     transmission: 1,
//   });

//   // Create the material for the PC glass effect
//   const pcGlassMaterial = new THREE.MeshPhysicalMaterial({
//     color: 0xffffff,
//     roughness: 0.3,
//     transmission: 0.9,
//     thickness: 0.1,
//     ior: 1.4,
//   });

//   // Create the emissive material for PC006 and Keeb_Light_right (orange)
//   const emissiveMaterialOrange = new THREE.MeshStandardMaterial({
//     color: 0x000000,
//     emissive: 0xffa500, // Orange color
//     emissiveIntensity: 1.5,
//   });

//   // Create the emissive material for PC008 and Keeb_Light_left (green)
//   const emissiveMaterialGreen = new THREE.MeshStandardMaterial({
//     color: 0x000000,
//     emissive: 0x00ff00, // Green color
//     emissiveIntensity: 1.5,
//   });

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         console.log(child.name); // Log the name of each mesh
//         if (child.name === 'Monitor_Glass_right') {
//           child.material = monitorGlassMaterial;
//         } else if (child.name === 'PC_Glass') {
//           child.material = pcGlassMaterial;
//         } else if (child.name === 'PC006' || child.name === 'Keeb_Light_right') {
//           child.material = emissiveMaterialOrange;
//         } else if (child.name === 'PC008' || child.name === 'Keeb_Light_left') {
//           child.material = emissiveMaterialGreen;
//         } else {
//           child.material = textureMaterial;
//         }
//       }
//     });
//     camera.position.copy(defaultPosition);
//     camera.lookAt(defaultLookAt);
//   }, [camera, scene]);

//   useFrame(() => {
//     if (isHovered) {
//       const targetPosition = zoomedInPosition;
//       camera.position.lerp(targetPosition, 0.05);
//       camera.lookAt(scene.position);
//     }

//     const lookAtTarget = new THREE.Vector3();
//     camera.getWorldDirection(lookAtTarget).add(camera.position);

//     console.log("Camera position:", camera.position);
//     console.log("Camera focal point:", lookAtTarget);
//   });

//   return (
//     <>
//       <ambientLight intensity={8.1} />
//       <color args={['#241a1a']} attach="background" />
//       <OrbitControls enablePan={true} enableZoom={true} />
//       <PresentationControls
//         global
//         rotation={[0.13, 0.1, 0]}
//         polar={[-0.4, 0.2]}
//         azimuth={[-1, 0.75]}
//         config={{ mass: 2, tension: 300 }}
//       >
//         <primitive object={scene}>
//           <Html
//             transform
//             wrapperClass="operatingSystem"
//             distanceFactor={0.17}
//             position={[0.376, -0.18, -1.235]}
//             onPointerOver={() => setIsHovered(true)}
//             onPointerOut={() => setIsHovered(false)}
//             occlude="blending"
//           >
//             <iframe
//               src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2Ftj1G3KwLXOjSrlErNkCfgm%2FProject-Plan%3Fnode-id%3D0%253A1%26t%3DK8g6XiatcLU0LFUg-1"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             />
//           </Html>
//         </primitive>
//       </PresentationControls>
//       <Sparkles 
//         count={50}
//         speed={0.3}
//         opacity={0.5}
//         color={'white'}
//         size={2}
//         scale={[5, 5, 5]}
//         noise={1}
//       />
//       <Stats />
//     </>
//   );
// }


//Degbugging code


// import { useGLTF, Html, Stats, SoftShadows, OrbitControls } from '@react-three/drei';
// import { useThree, useFrame } from '@react-three/fiber';
// import { useState, useEffect } from 'react';
// import * as THREE from 'three';
// import { DirectionalLightHelper, CameraHelper } from 'three';

// export default function Experience() {
//   const { scene } = useGLTF('/Assets/MyOffice(ClearMonitor).glb');
//   const { camera } = useThree();
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     camera.position.set(-3, 1.5, 4);
//     camera.lookAt(scene.position);

//     scene.traverse((object) => {
//       if (object.isMesh) {
//         object.castShadow = true;
//         object.receiveShadow = true;
//       }
//       if (object.name === 'Cube006_6' || object.name === 'Cube006_8' || object.name === 'Cube002' || object.name === 'Cube002_1') {
//         object.castShadow = false;
//       }
//     });

//     // First directional light
//     const directionalLight1 = new THREE.DirectionalLight(0xeeaf61, 20);
//     directionalLight1.position.set(13, 0, 5.5);
//     directionalLight1.castShadow = true;
//     directionalLight1.shadow.mapSize.width = 2048;
//     directionalLight1.shadow.mapSize.height = 2048;
//     directionalLight1.shadow.bias = -0.001;

//     directionalLight1.shadow.camera.left = -8;
//     directionalLight1.shadow.camera.right = 0.5;
//     directionalLight1.shadow.camera.top = 3;
//     directionalLight1.shadow.camera.bottom = -3;
//     directionalLight1.shadow.camera.near = 0.5;
//     directionalLight1.shadow.camera.far = 20;

//     scene.add(directionalLight1);

//     const target1 = new THREE.Object3D();
//     target1.position.set(0, 1, -2.5);
//     scene.add(target1);
//     directionalLight1.target = target1;
//     directionalLight1.target.updateMatrixWorld();

//     const helper1 = new DirectionalLightHelper(directionalLight1, 1); 
//     scene.add(helper1);
//     const cameraHelper1 = new CameraHelper(directionalLight1.shadow.camera); 
//     scene.add(cameraHelper1);

//     // Second directional light
//     const directionalLight2 = new THREE.DirectionalLight(0xeeaf61, 10); // Different color and intensity
//     directionalLight2.position.set(13, 8, -5); // Different position
//     directionalLight2.castShadow = true;
//     directionalLight2.shadow.mapSize.width = 2048;
//     directionalLight2.shadow.mapSize.height = 2048;
//     directionalLight2.shadow.bias = -0.001;

//     directionalLight2.shadow.camera.left = -4;
//     directionalLight2.shadow.camera.right = 4;
//     directionalLight2.shadow.camera.top = 4;
//     directionalLight2.shadow.camera.bottom = -4;
//     directionalLight2.shadow.camera.near = 0.5;
//     directionalLight2.shadow.camera.far = 30;

//     scene.add(directionalLight2);

//     const target2 = new THREE.Object3D();
//     target2.position.set(2, 1, 0); // Different target position
//     scene.add(target2);
//     directionalLight2.target = target2;
//     directionalLight2.target.updateMatrixWorld();

//     const helper2 = new DirectionalLightHelper(directionalLight2, 1); 
//     scene.add(helper2);
//     const cameraHelper2 = new CameraHelper(directionalLight2.shadow.camera); 
//     scene.add(cameraHelper2);

//   }, [camera, scene]);

//   return (
//     <>
//       <SoftShadows size={35} focus={2.5} samples={13} />

//       <ambientLight intensity={0.4} />

//       <color args={['#241a1a']} attach="background" />

//       <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

//       <primitive object={scene}>
//         <Html
//           transform
//           wrapperClass="operatingSystem"
//           distanceFactor={0.17}
//           position={[0.376, -0.18, -1.235]}
//           onPointerOver={() => setIsHovered(true)}
//           onPointerOut={() => setIsHovered(false)}
//           occlude="blending"
//         >
//           <iframe
//             src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2Ftj1G3KwLXOjSrlErNkCfgm%2FProject-Plan%3Fnode-id%3D0%253A1%26t%3DK8g6XiatcLU0LFUg-1"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           />
//         </Html>
//       </primitive>

//       <Stats />
//     </>
//   );
// }