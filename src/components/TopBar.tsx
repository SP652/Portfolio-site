import { useState, useEffect } from 'react';
import { Github, Zap, Cloud, Clock, GitBranch, GitCommit, TrendingUp } from 'lucide-react';

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

        {/* Center section - Enhanced Stats Dashboard */}
        <div className="flex items-center space-x-6">
          {/* GitHub Activity Panel */}
          <div className="glass-button py-2 px-4 animate-neon-glow">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-ai-secondary animate-data-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Commits</span>
                  <span className="text-sm font-mono text-ai-neon">1,245</span>
                </div>
              </div>
              
              <div className="w-px h-8 bg-glass-border" />
              
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-ai-tertiary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Repos</span>
                  <span className="text-sm font-mono text-ai-tertiary">42</span>
                </div>
              </div>
              
              <div className="w-px h-8 bg-glass-border" />
              
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-ai-primary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Streak</span>
                  <span className="text-sm font-mono text-ai-primary">15d</span>
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Progress with Enhanced Visualization */}
          <div className="glass-button py-2 px-4">
            <div className="flex items-center space-x-3">
              <Zap className="w-4 h-4 text-ai-secondary animate-data-pulse" />
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="hsl(var(--glass-border))"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="hsl(var(--ai-neon))"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${(78/150) * 87.96} 87.96`}
                      className="animate-progress-fill"
                      style={{ '--progress-width': '52%' } as React.CSSProperties}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-ai-neon">52%</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">LeetCode</span>
                  <span className="text-sm font-mono">78/150</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Widget with Subtle Enhancement */}
          <div className="glass-button py-2 px-3">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-ai-secondary" />
              <span className="text-sm font-mono">22°C</span>
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