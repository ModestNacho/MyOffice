import { useEffect, useRef } from 'react';
import { useState } from 'react';

export function useAudioManager(audioUrl) {
  const audioRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const audioContextRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Set up Web Audio API
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const audio = new Audio(audioUrl);
    const audioContext = audioContextRef.current;

    const track = audioContext.createMediaElementSource(audio);
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();

    // Configure gain node and filter node
    gainNode.gain.value = 0.3; // Set initial volume
    filterNode.type = 'lowpass'; // Low-pass filter for muffled effect
    filterNode.frequency.value = 1000; // Muffled effect

    // Connect nodes: audio -> filter -> gain -> destination
    track.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set references
    audioRef.current = audio;
    gainNodeRef.current = gainNode;
    filterNodeRef.current = filterNode;

    // Set loop
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audioContext.close();
    };
  }, [audioUrl]);

  const handlePlayPause = (event) => {
    if (event.key === 'p' || event.key === 'P') {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlePlayPause);
    return () => {
      window.removeEventListener('keydown', handlePlayPause);
    };
  }, [isPlaying]);

  return { isPlaying, setIsPlaying };
}
