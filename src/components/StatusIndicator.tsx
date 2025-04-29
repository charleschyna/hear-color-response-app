import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, Volume2 } from 'lucide-react';

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
    <div className="flex flex-col items-center text-center space-y-3 animate-fade-in w-full">
      <div className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
        isListening 
          ? "bg-app-blue/10 text-app-blue" 
          : "bg-gray-100 text-app-subtle"
      )}>
        {isListening && (
          <div className="relative">
            <Volume2 className="w-4 h-4" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-app-blue/10 animate-ping-slow opacity-75"></span>
          </div>
        )}
        {isListening ? "Listening..." : "Tap the microphone to start"}
      </div>
      
      {transcript && (
        <div className="mt-2 px-5 py-3 rounded-lg bg-gray-100 text-app-text w-full max-w-xs animate-scale-in shadow-sm border border-gray-200/50">
          <p className="font-medium text-xs uppercase text-gray-500 mb-1">Transcript</p>
          <p className="text-gray-800">"{transcript}"</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="mt-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 w-full max-w-xs animate-scale-in flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
