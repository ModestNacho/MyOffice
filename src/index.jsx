import './style.css';
import { useGLTF, useTexture } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import QualitySettingsPanel from './Render/QualitySettingsPanel';

// Starting to load the 3D model and texture early to save time
// This way the model starts downloading before Experience component even mounts
// It's not loading twice, the useGLTF in Experience will use this pre-loaded model from cache

useGLTF.preload('./assets/MyOffice(StickyNote).glb');
useTexture.preload('./assets/BakedTexture(StickyNote).jpg');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quality, setQuality] = useState('Balanced');

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinish={handleFinishLoading} />
      ) : (
        <>
          <Canvas
            className="r3f"
            camera={{
              fov: 40,
              near: 0.1,
              far: 2000,
            }}
          >
            <Experience quality={quality} />
          </Canvas>
          <QualitySettingsPanel 
            quality={quality}
            onQualityChange={handleQualityChange}
          />
        </>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

