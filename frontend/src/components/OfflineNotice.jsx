import { useState, useEffect } from 'react';
import { WifiOffIcon } from 'lucide-react';

const OfflineNotice = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-error text-error-content px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <WifiOffIcon size={18} />
        <span>You're offline. Some features may not work.</span>
      </div>
    </div>
  );
};

export default OfflineNotice;
