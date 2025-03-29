import './style.css';
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import LoadingScreen from './LoadingScreen.jsx';

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
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
