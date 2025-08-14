import { useState, useEffect } from 'react';
import { Github, Zap, Cloud, Clock, GitBranch, GitCommit, TrendingUp } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

interface TopBarProps {
  onOpenGitHub?: () => void;
  onOpenLeetCode?: () => void;
}

export const TopBar = ({ onOpenGitHub, onOpenLeetCode }: TopBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statsData, setStatsData] = useState({
    commits: 1245,
    repos: 42,
    streak: 15,
    leetcodeProgress: 78,
    leetcodeTotal: 150
  });
  const { settings } = useSettings();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Debounced stats updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight data changes
      setStatsData(prev => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 3),
        streak: prev.streak + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const format = settings.timeFormat === '12h' ? 
      { hour: '2-digit' as const, minute: '2-digit' as const, hour12: true } :
      { hour: '2-digit' as const, minute: '2-digit' as const, hour12: false };
    return date.toLocaleTimeString('en-US', format);
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
        <div className="flex items-center space-x-4">
          {/* GitHub Activity Panel */}
          <button 
            onClick={onOpenGitHub}
            className="stats-pill glass-button py-2 px-4 hover:scale-105 transition-all duration-200 focus-ring"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-ai-secondary animate-data-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Commits</span>
                  <span className="text-sm font-mono text-ai-neon">{statsData.commits.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="w-px h-6 bg-glass-border" />
              
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-ai-tertiary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Repos</span>
                  <span className="text-sm font-mono text-ai-tertiary">{statsData.repos}</span>
                </div>
              </div>
            </div>
          </button>

          {/* LeetCode Progress */}
          <button 
            onClick={onOpenLeetCode}
            className="stats-pill glass-button py-2 px-4 hover:scale-105 transition-all duration-200 focus-ring"
          >
            <div className="flex items-center space-x-3">
              <Zap className="w-4 h-4 text-ai-secondary animate-data-pulse" />
              <div className="flex items-center space-x-2">
                <div className="relative w-6 h-6">
                  <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="hsl(var(--glass-border))"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="hsl(var(--ai-neon))"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${(statsData.leetcodeProgress/statsData.leetcodeTotal) * 62.83} 62.83`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-ai-neon">
                      {Math.round((statsData.leetcodeProgress/statsData.leetcodeTotal) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">LeetCode</span>
                  <span className="text-sm font-mono">{statsData.leetcodeProgress}/{statsData.leetcodeTotal}</span>
                </div>
              </div>
            </div>
          </button>

          {/* Weather Widget */}
          {settings.weatherEnabled && (
            <div className="stats-pill glass-button py-2 px-3">
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-ai-secondary" />
                <span className="text-sm font-mono">22°C</span>
              </div>
            </div>
          )}
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