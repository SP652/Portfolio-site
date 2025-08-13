import { useState } from 'react';
import { FileText, Folder, Star, MessageCircle, PenTool, Zap, Settings } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

interface DockItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface DockProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSettings: () => void;
  onOpenGitHub: () => void;
  onOpenLeetCode: () => void;
}

export const Dock = ({ activeTab, onTabChange, onOpenSettings, onOpenGitHub, onOpenLeetCode }: DockProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { settings } = useSettings();

  const dockItems: DockItem[] = [
    { id: 'resume', icon: FileText, label: 'Resume', active: activeTab === 'resume', onClick: () => onTabChange('resume') },
    { id: 'projects', icon: Folder, label: 'Projects', active: activeTab === 'projects', onClick: () => onTabChange('projects') },
    { id: 'skills', icon: Star, label: 'Skills', active: activeTab === 'skills', onClick: () => onTabChange('skills') },
    { id: 'contact', icon: MessageCircle, label: 'Contact', active: activeTab === 'contact', onClick: () => onTabChange('contact') },
    { id: 'chat', icon: MessageCircle, label: 'AI Chat', active: activeTab === 'chat', onClick: () => onTabChange('chat') },
    { id: 'playground', icon: Zap, label: 'AI Playground', active: activeTab === 'playground', onClick: () => onTabChange('playground') },
  ];

  const handleItemClick = (item: DockItem, event: React.MouseEvent) => {
    // Play click sound if enabled
    if (settings.soundEffects) {
      // Placeholder for sound effect
      console.log(`🔊 Playing click sound for ${item.label}`);
    }

    // Add click animation
    const target = event.currentTarget as HTMLElement;
    target.style.animation = 'none';
    setTimeout(() => {
      target.style.animation = 'click-effect 0.2s ease-out';
    }, 10);

    // Handle special items
    if (item.id === 'github') {
      onOpenGitHub();
    } else if (item.id === 'leetcode') {
      onOpenLeetCode();
    } else {
      item.onClick?.();
    }
  };

  const handleItemHover = (itemId: string) => {
    setHoveredItem(itemId);
    
    // Play hover sound if enabled
    if (settings.soundEffects) {
      // Placeholder for hover sound
      console.log(`🔊 Playing hover sound for ${itemId}`);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-panel px-6 py-4">
        <div className="flex items-center space-x-4">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;
            
            return (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => handleItemHover(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={(e) => handleItemClick(item, e)}
              >
                {/* Tooltip */}
                <div
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                    px-3 py-1 text-xs font-medium glass-panel whitespace-nowrap
                    transition-all duration-200 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                >
                  {item.label}
                </div>

                {/* Icon */}
                <div
                  className={`dock-icon w-12 h-12 rounded-xl flex items-center justify-center
                    ${item.active ? 'bg-ai-primary ai-glow active' : 'glass-panel'}
                    ${isHovered && settings.animations ? 'animate-dock-bounce' : ''}`}
                >
                  <Icon 
                    className={`w-6 h-6 ${
                      item.active ? 'text-os-background' : 'text-ai-secondary'
                    }`} 
                  />
                </div>

                {/* Active indicator */}
                {item.active && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-ai-primary animate-pulse-glow" />
                )}
              </div>
            );
          })}
          
          {/* Settings Icon */}
          <div className="w-px h-8 bg-glass-border mx-2" />
          <div
            className="relative group"
            onMouseEnter={() => handleItemHover('settings')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onOpenSettings}
          >
            <div
              className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                px-3 py-1 text-xs font-medium glass-panel whitespace-nowrap
                transition-all duration-200 ${
                  hoveredItem === 'settings' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
            >
              Settings
            </div>

            <div
              className={`dock-icon w-12 h-12 rounded-xl flex items-center justify-center glass-panel
                ${hoveredItem === 'settings' && settings.animations ? 'animate-dock-bounce' : ''}`}
            >
              <Settings className="w-6 h-6 text-ai-secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};