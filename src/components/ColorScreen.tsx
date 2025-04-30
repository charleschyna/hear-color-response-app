import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ColorScreenProps {
  color: 'blue' | 'red' | null;
  isVisible: boolean;
}

const ColorScreen: React.FC<ColorScreenProps> = ({ color, isVisible }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (isVisible && color) {
      // Use the Web Speech API for audio feedback instead of audio files
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = color === 'blue' ? 'Here is the blue screen' : 'Here is the red screen';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [isVisible, color]);

  if (!isVisible || !color) return null;

  const colorClass = color === 'blue' ? 'bg-app-blue' : 'bg-app-red';
  const message = color === 'blue' ? 'Here is the blue screen' : 'Here is the red screen';

  return (
    <div 
      className={cn(
        'fixed inset-0 flex items-center justify-center transition-all duration-500 ease-out animate-fade-in color-transition z-50',
        colorClass
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute -inset-10 bg-white/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="text-white text-5xl font-bold tracking-tight text-shadow-lg animate-scale-in mb-4">
          {message}
        </div>
        <div className="flex space-x-3 mt-8 animate-fade-in-delay">
          <div className="w-3 h-3 rounded-full bg-white animate-bounce-slow"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce-slow delay-100"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce-slow delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ColorScreen;
