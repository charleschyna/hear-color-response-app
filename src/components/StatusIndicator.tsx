
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  isListening: boolean;
  transcript: string;
  errorMessage: string | null;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  isListening, 
  transcript, 
  errorMessage 
}) => {
  return (
    <div className="flex flex-col items-center text-center space-y-2 animate-fade-in">
      <div className={cn(
        "text-sm font-medium transition-colors duration-200",
        isListening ? "text-app-blue" : "text-app-subtle"
      )}>
        {isListening ? "Listening..." : "Tap the microphone to start"}
      </div>
      
      {transcript && (
        <div className="mt-2 px-4 py-2 rounded-lg bg-gray-100 text-app-text max-w-xs animate-scale-in">
          "{transcript}"
        </div>
      )}
      
      {errorMessage && (
        <div className="mt-2 text-sm text-red-500 animate-scale-in">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
