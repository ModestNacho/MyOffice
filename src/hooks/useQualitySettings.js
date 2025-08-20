import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function useQualitySettings(quality) {
  const { gl } = useThree();

  useEffect(() => {
    // Basic quality adjustments
    switch(quality) {
      case 'Ultra':
        // Maximum quality
        gl.setPixelRatio(window.devicePixelRatio);
        break;
        
      case 'Balanced':
        // Medium quality - limit pixel ratio to 1.5
        gl.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
        break;
        
      case 'Performance':
        // Lowest quality - force 1.0 pixel ratio
        gl.setPixelRatio(1.0);
        break;
    }
  }, [quality, gl]);

  // Return the current quality level for reference
  return quality;
}
