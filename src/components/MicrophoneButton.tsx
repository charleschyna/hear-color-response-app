import React from 'react';
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
        'relative flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition-all duration-300 transform',
        isListening 
          ? 'bg-app-blue text-white scale-110' 
          : 'bg-white text-app-text hover:bg-gray-50 hover:scale-105'
      )}
      aria-label={isListening ? 'Stop listening' : 'Start listening'}
    >
      {isListening ? (
        <>
          <Mic className="w-7 h-7 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full animate-wave border-2 border-app-blue opacity-20"></div>
          <div className="absolute inset-0 rounded-full animate-wave-delay border-2 border-app-blue opacity-10"></div>
          <div className="absolute -inset-2 rounded-full bg-app-blue/5 animate-pulse"></div>
        </>
      ) : (
        <>
          <Mic className="w-7 h-7" />
          <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        </>
      )}
    </button>
  );
};

export default MicrophoneButton;
