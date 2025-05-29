import { useState, useEffect } from 'react';
import { BookOpenIcon, CheckIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomeMessage = ({ userName, onDismiss }) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  
  // If user has seen the welcome message before, don't show it
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setVisible(false);
    }
  }, []);
  
  const handleDismiss = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  const steps = [
    {
      title: `Welcome to ThinkBoard, ${userName || 'there'}!`,
      content: "Your personal space for capturing and organizing ideas. Let's get you started with a few quick tips.",
      action: () => setStep(1)
    },
    {
      title: "Create your first note",
      content: "Click 'New Note' to start writing. Use ThinkMate AI to help generate content or get suggestions.",
      action: () => setStep(2)
    },
    {
      title: "Ask ThinkMate for help",
      content: "Click on the ThinkMate button to chat with your AI assistant about any note-taking questions.",
      action: handleDismiss
    }
  ];
  
  if (!visible) return null;
  
  const currentStep = steps[step];
  
  return (
    <div className="card bg-primary/10 backdrop-blur-sm shadow-lg mb-8 overflow-hidden animate-fade-in border border-primary/30">
      <div className="card-body relative p-6">
        <button 
          onClick={handleDismiss} 
          className="absolute top-2 right-2 btn btn-sm btn-ghost btn-circle"
        >
          ✕
        </button>
        
        <h3 className="font-bold text-lg flex items-center gap-2 text-primary">
          <BookOpenIcon className="size-5" />
          {currentStep.title}
        </h3>
        
        <p className="py-2">{currentStep.content}</p>
        
        <div className="card-actions justify-between items-center mt-2">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <span 
                key={i} 
                className={`inline-block h-2 w-2 rounded-full ${
                  i === step ? 'bg-primary' : 'bg-base-content/20'
                }`}
              />
            ))}
          </div>
          
          <button 
            className="btn btn-primary btn-sm"
            onClick={currentStep.action}
          >
            {step === steps.length - 1 ? (
              <>
                <CheckIcon className="size-4" />
                <span>Got it</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRightIcon className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
