
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ColorScreenProps {
  color: 'blue' | 'red' | null;
  isVisible: boolean;
}

const ColorScreen: React.FC<ColorScreenProps> = ({ color, isVisible }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (isVisible && color && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
  }, [isVisible, color]);

  if (!isVisible || !color) return null;

  const colorClass = color === 'blue' ? 'bg-app-blue' : 'bg-app-red';
  const message = color === 'blue' ? 'Here is the blue screen' : 'Here is the red screen';

  return (
    <div 
      className={cn(
        'fixed inset-0 flex items-center justify-center transition-all duration-500 ease-out animate-fade-in color-transition',
        colorClass
      )}
    >
      <audio 
        ref={audioRef} 
        src={`/audio/${color}.mp3`} 
        preload="auto"
      />
      
      <div className="text-white text-4xl font-medium tracking-tight text-shadow-sm animate-scale-in">
        {message}
      </div>
    </div>
  );
};

export default ColorScreen;
