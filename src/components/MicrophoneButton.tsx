
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ 
  isListening, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform',
        isListening 
          ? 'bg-app-blue text-white scale-110' 
          : 'bg-white text-app-text hover:bg-gray-50'
      )}
      aria-label={isListening ? 'Stop listening' : 'Start listening'}
    >
      {isListening ? (
        <>
          <Mic className="w-6 h-6 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full animate-wave border-2 border-app-blue opacity-20"></div>
        </>
      ) : (
        <Mic className="w-6 h-6" />
      )}
    </button>
  );
};

export default MicrophoneButton;
