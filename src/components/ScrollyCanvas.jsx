import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFramePreloader, TOTAL_FRAMES } from '../hooks/useFramePreloader';

export default function ScrollyCanvas() {
  const { progress: loadProgress, isLoaded, frames } = useFramePreloader();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (!isLoaded || frames.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const updateCanvas = () => {
      const { innerWidth, innerHeight } = window;
      if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
      }
      return { canvas, ctx, innerWidth, innerHeight };
    };

    const drawFrame = (progressValue) => {
      const { canvas, ctx } = updateCanvas();
      
      const normalizedProgress = Math.min(progressValue / 0.75, 1);
      const frameIndex = Math.min(
        Math.floor(normalizedProgress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );
      
      const img = frames[frameIndex];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseScale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const scale = baseScale * 0.8;
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    drawFrame(scrollYProgress.get());

    const unsubscribe = scrollYProgress.on('change', (val) => {
      requestAnimationFrame(() => drawFrame(val));
    });

    const handleResize = () => requestAnimationFrame(() => drawFrame(scrollYProgress.get()));
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, frames, scrollYProgress]);

  const scene1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
  const scene4Opacity = useTransform(scrollYProgress, [0.70, 0.75], [0, 1]);

  const scrollToApp = () => {
    window.scrollTo({
      top: containerRef.current.offsetTop + containerRef.current.offsetHeight,
      behavior: 'smooth'
    });
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-full bg-void flex flex-col justify-end items-center pb-20">
        <div className="text-gold-muted font-mono mb-4">
          LOADING LEDGER... {Math.round(loadProgress * 100)}%
        </div>
        <div className="w-64 h-1 bg-border rounded overflow-hidden">
          <div 
            className="h-full bg-gold-bright transition-all duration-200"
            style={{ width: `${loadProgress * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-void">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-void z-20" />

        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
          
          <motion.div style={{ opacity: scene1Opacity }} className="absolute text-center flex flex-col items-center px-4">
            <h1 className="font-display text-6xl md:text-[96px] text-text-primary tracking-widest leading-none drop-shadow-2xl">
              LEDGER
            </h1>
            <p className="font-display italic text-lg md:text-2xl text-gold-bright mt-2 md:mt-4">
              Every coin has two sides.
            </p>
          </motion.div>

          <motion.div 
            style={{ opacity: scene2Opacity }} 
            className="absolute left-6 md:left-24 text-left max-w-xs md:max-w-xl"
          >
            <h2 className="font-display text-4xl md:text-[64px] text-text-primary leading-tight">
              Track Every Transaction.
            </h2>
          </motion.div>

          <motion.div 
            style={{ opacity: scene3Opacity }} 
            className="absolute right-6 md:right-24 text-right max-w-xs md:max-w-xl"
          >
            <h2 className="font-display text-4xl md:text-[64px] text-text-primary leading-tight">
              Convert. Categorise. Control.
            </h2>
          </motion.div>

          <motion.div 
            style={{ opacity: scene4Opacity }} 
            className="absolute bottom-24 flex justify-center w-full pointer-events-auto"
          >
            <button 
              onClick={scrollToApp}
              className="px-8 py-4 border border-gold-muted text-gold-bright font-mono tracking-widest hover:bg-gold-glow hover:border-gold-bright transition-all shadow-gold-pulse uppercase flex items-center gap-2"
            >
              <span>↓</span> Enter Ledger
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
