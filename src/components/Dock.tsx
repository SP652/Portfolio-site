import { useState } from 'react';
import { FileText, Folder, Star, MessageCircle, PenTool, Zap } from 'lucide-react';

interface DockItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

const dockItems: DockItem[] = [
  { id: 'resume', icon: FileText, label: 'Resume', active: false },
  { id: 'projects', icon: Folder, label: 'Projects', active: false },
  { id: 'skills', icon: Star, label: 'Skills', active: false },
  { id: 'contact', icon: MessageCircle, label: 'Contact', active: true },
  { id: 'blog', icon: PenTool, label: 'Blog', active: false },
  { id: 'ai-playground', icon: Zap, label: 'AI Playground', active: false },
];

export const Dock = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
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
                    ${item.active ? 'bg-ai-primary ai-glow' : 'glass-panel'}
                    ${isHovered ? 'animate-dock-bounce' : ''}`}
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
        </div>
      </div>
    </div>
  );
};