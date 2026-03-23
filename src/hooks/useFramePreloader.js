import { useState, useEffect, useRef } from 'react';

export const TOTAL_FRAMES = 240;

export function useFramePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const framesRef = useRef([]);

  useEffect(() => {
    let loadedCount = 0;
    const frames = [];

    const onImageLoad = () => {
      loadedCount++;
      setProgress(loadedCount / TOTAL_FRAMES);
      if (loadedCount === TOTAL_FRAMES) {
        framesRef.current = frames;
        setIsLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      const paddedNum = i.toString().padStart(3, '0');
      img.src = `/coin/ezgif-frame-${paddedNum}.png`;
      frames[i - 1] = img;
    }
  }, []);

  return { progress, isLoaded, frames: framesRef.current };
}
