import React, { useEffect, useState } from 'react';
import MicrophoneButton from '@/components/MicrophoneButton';
import StatusIndicator from '@/components/StatusIndicator';
import ColorScreen from '@/components/ColorScreen';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useToast } from '@/components/ui/use-toast';
import { Headphones, History, Info } from 'lucide-react';

interface CommandHistory {
  command: string;
  timestamp: Date;
}

const Index = () => {
  const { 
    isListening, 
    transcript, 
    error, 
    toggleListening, 
    resetTranscript,
    detectCommand 
  } = useSpeechRecognition();
  
  const [activeColor, setActiveColor] = useState<'blue' | 'red' | null>(null);
  const [showColorScreen, setShowColorScreen] = useState(false);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isListening && transcript) {
      const command = detectCommand();
      
      if (command) {
        setActiveColor(command);
        setShowColorScreen(true);
        
        // Add to command history
        setCommandHistory(prev => [
          { command, timestamp: new Date() },
          ...prev.slice(0, 4) // Keep only last 5 commands
        ]);
        
        // Create audio message
        const audioMessage = command === 'blue' 
          ? 'Here is the blue screen' 
          : 'Here is the red screen';
          
        // Show a toast
        toast({
          title: "Command recognized",
          description: `"${command}" command detected`,
        });
        
        // Reset after a delay
        setTimeout(() => {
          setShowColorScreen(false);
          resetTranscript();
        }, 5000);
      } else if (transcript && !command) {
        toast({
          title: "Command not recognized",
          description: "Try saying 'blue' or 'red'",
          variant: "destructive",
        });
      }
    }
  }, [isListening, transcript, detectCommand, toast, resetTranscript]);

  // Handle permission requests
  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (err) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use this app",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleMicClick = async () => {
    if (!isListening) {
      const hasPermission = await requestMicrophonePermission();
      if (hasPermission) {
        toggleListening();
      }
    } else {
      toggleListening();
    }
  };

  // Format time for history
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-8 glass-panel border border-gray-100">
          {/* Header with Logo */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-app-blue/10 flex items-center justify-center mb-2">
              <Headphones className="w-8 h-8 text-app-blue" />
            </div>
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-app-text bg-clip-text text-transparent bg-gradient-to-r from-app-blue to-blue-600">
                IHearYou
              </h1>
              <p className="text-app-subtle text-sm">
                Say "blue" or "red" to see the magic
              </p>
            </div>
          </div>
          
          <StatusIndicator 
            isListening={isListening} 
            transcript={transcript} 
            errorMessage={error} 
          />
          
          <MicrophoneButton 
            isListening={isListening} 
            onClick={handleMicClick} 
          />
          
          {/* Command History Section */}
          {commandHistory.length > 0 && (
            <div className="w-full mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-gray-500">
                <History className="w-4 h-4" />
                <h3 className="text-sm font-medium">Command History</h3>
              </div>
              <div className="space-y-2">
                {commandHistory.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
                      item.command === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    <span className="font-medium">{item.command}</span>
                    <span className="text-xs opacity-70">{formatTime(item.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Info Tip */}
          <div className="w-full mt-4 flex items-start gap-2 bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>This app uses your device's microphone to listen for voice commands. Try saying "blue" or "red" clearly.</p>
          </div>
        </div>
      </div>
      
      <ColorScreen 
        color={activeColor} 
        isVisible={showColorScreen} 
      />
    </main>
  );
};

export default Index;
