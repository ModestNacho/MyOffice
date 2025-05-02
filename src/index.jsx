import './style.css';
import { useGLTF, useTexture } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import QualitySettingsPanel from './Render/QualitySettingsPanel';

// Currently using a fake loading screen rather than fetching what assests are currently laoding using three or drei
// Will be removin 

useGLTF.preload('./assets/MyOffice(StickyNote).glb');
useTexture.preload('./assets/BakedTexture(StickyNote).jpg');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = () => {
    setIsLoading(false);
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
            <Experience />
          </Canvas>
          <QualitySettingsPanel />
        </>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

