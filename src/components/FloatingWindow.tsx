import { useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingWindowProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

export const FloatingWindow = ({ 
  title, 
  icon, 
  children, 
  onClose, 
  initialPosition = { x: 100, y: 100 } 
}: FloatingWindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for dragging
  if (isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  } else {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  return (
    <div
      className="fixed z-50 glass-panel min-w-96 animate-window-open focus-ring"
      style={{
        left: position.x,
        top: position.y,
        transform: isMinimized ? 'scale(0.95)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between p-4 border-b border-glass-border cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="font-semibold text-gradient">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="glass-button p-1"
          >
            <Minimize2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="glass-button p-1 hover:bg-red-500/20"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4 max-h-96 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};