import { useState, useEffect } from 'react';
import { OSBackground } from '@/components/OSBackground';
import { TopBar } from '@/components/TopBar';
import { AIChatPanel } from '@/components/AIChatPanel';
import { Dock } from '@/components/Dock';
import { SettingsPanel } from '@/components/SettingsPanel';
import { GitHubWindow } from '@/components/GitHubWindow';
import { LeetCodeWindow } from '@/components/LeetCodeWindow';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { SettingsProvider, useSettings } from '@/hooks/useSettings';
import { WindowManagerProvider, useWindowManager } from '@/hooks/useWindowManager';

const SanjayOSContent = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const { actualTheme } = useTheme();
  const { settings } = useSettings();
  const { windows, openWindow, closeWindow, getWindowState } = useWindowManager();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme);
  }, [actualTheme]);

  const handleOpenWindow = (windowId: string, position?: { x: number; y: number }) => {
    const existingWindow = getWindowState(windowId);
    if (existingWindow?.isOpen) {
      return; // Window already open
    }
    
    // Play sound if enabled
    if (settings.soundEffects) {
      console.log(`🔊 Playing window open sound for ${windowId}`);
    }
    
    openWindow(windowId, position);
  };

  const handleCloseWindow = (windowId: string) => {
    if (settings.soundEffects) {
      console.log(`🔊 Playing window close sound for ${windowId}`);
    }
    closeWindow(windowId);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <OSBackground />
      
      {/* Top Menu Bar */}
      <TopBar 
        onOpenGitHub={() => handleOpenWindow('github', { x: 200, y: 150 })}
        onOpenLeetCode={() => handleOpenWindow('leetcode', { x: 500, y: 150 })}
      />
      
      {/* Central AI Chat Panel */}
      <AIChatPanel activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Bottom Dock */}
      <Dock 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => handleOpenWindow('settings')}
        onOpenGitHub={() => handleOpenWindow('github', { x: 200, y: 150 })}
        onOpenLeetCode={() => handleOpenWindow('leetcode', { x: 500, y: 150 })}
        openWindows={Object.keys(windows).filter(id => windows[id]?.isOpen)}
      />

      {/* Floating Windows */}
      {getWindowState('github')?.isOpen && (
        <GitHubWindow onClose={() => handleCloseWindow('github')} />
      )}
      {getWindowState('leetcode')?.isOpen && (
        <LeetCodeWindow onClose={() => handleCloseWindow('leetcode')} />
      )}
      
      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={getWindowState('settings')?.isOpen || false}
        onClose={() => handleCloseWindow('settings')} 
      />
    </div>
  );
};

const SanjayOS = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <WindowManagerProvider>
          <SanjayOSContent />
        </WindowManagerProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default SanjayOS;