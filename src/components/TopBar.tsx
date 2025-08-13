import { useState, useEffect } from 'react';
import { Github, Zap, Cloud, Clock } from 'lucide-react';

export const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 glass-panel border-b-0 rounded-none">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left section - Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-gradient-ai animate-pulse-glow" />
          <span className="font-semibold text-gradient">SanjayOS AI</span>
        </div>

        {/* Center section - Widgets */}
        <div className="flex items-center space-x-8">
          {/* Weather Widget */}
          <div className="flex items-center space-x-2 glass-button py-1 px-3">
            <Cloud className="w-4 h-4 text-ai-secondary" />
            <span className="text-sm">22°C</span>
          </div>

          {/* GitHub Stats */}
          <div className="flex items-center space-x-2 glass-button py-1 px-3">
            <Github className="w-4 h-4 text-ai-secondary" />
            <span className="text-sm">1,245 commits</span>
          </div>

          {/* LeetCode Progress */}
          <div className="flex items-center space-x-2 glass-button py-1 px-3">
            <Zap className="w-4 h-4 text-ai-secondary" />
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 rounded-full border-2 border-ai-secondary relative">
                <div 
                  className="absolute inset-0 rounded-full bg-ai-secondary"
                  style={{ 
                    clipPath: 'polygon(50% 50%, 50% 0%, 78% 0%, 78% 50%)' // 52% progress
                  }}
                />
              </div>
              <span className="text-sm">78/150</span>
            </div>
          </div>
        </div>

        {/* Right section - Time */}
        <div className="flex items-center space-x-2 glass-button py-1 px-3">
          <Clock className="w-4 h-4 text-ai-secondary" />
          <span className="text-sm font-mono">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};