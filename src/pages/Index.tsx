
import React, { useEffect, useState } from 'react';
import MicrophoneButton from '@/components/MicrophoneButton';
import StatusIndicator from '@/components/StatusIndicator';
import ColorScreen from '@/components/ColorScreen';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    if (!isListening && transcript) {
      const command = detectCommand();
      
      if (command) {
        setActiveColor(command);
        setShowColorScreen(true);
        
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-app-neutral">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-8 glass-panel">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-app-text">IHearYou</h1>
            <p className="text-app-subtle text-sm">
              Say "blue" or "red" to see the magic
            </p>
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
