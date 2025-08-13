import { useState } from 'react';
import { OSBackground } from '@/components/OSBackground';
import { TopBar } from '@/components/TopBar';
import { AIChatPanel } from '@/components/AIChatPanel';
import { Dock } from '@/components/Dock';
import { SettingsPanel } from '@/components/SettingsPanel';
import { GitHubWindow } from '@/components/GitHubWindow';
import { LeetCodeWindow } from '@/components/LeetCodeWindow';
import { ThemeProvider } from '@/hooks/useTheme';
import { SettingsProvider } from '@/hooks/useSettings';

const SanjayOSContent = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGitHubOpen, setIsGitHubOpen] = useState(false);
  const [isLeetCodeOpen, setIsLeetCodeOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <OSBackground />
      
      {/* Top Menu Bar */}
      <TopBar />
      
      {/* Central AI Chat Panel */}
      <AIChatPanel activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Bottom Dock */}
      <Dock 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGitHub={() => setIsGitHubOpen(true)}
        onOpenLeetCode={() => setIsLeetCodeOpen(true)}
      />

      {/* Floating Windows */}
      {isGitHubOpen && <GitHubWindow onClose={() => setIsGitHubOpen(false)} />}
      {isLeetCodeOpen && <LeetCodeWindow onClose={() => setIsLeetCodeOpen(false)} />}
      
      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

const SanjayOS = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <SanjayOSContent />
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default SanjayOS;