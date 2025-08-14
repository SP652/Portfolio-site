import { createContext, useContext, useState, ReactNode } from 'react';

interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

interface WindowManagerContextType {
  windows: Record<string, WindowState>;
  openWindow: (id: string, position?: { x: number; y: number }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  getWindowState: (id: string) => WindowState | undefined;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};

interface WindowManagerProviderProps {
  children: ReactNode;
}

export const WindowManagerProvider = ({ children }: WindowManagerProviderProps) => {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [highestZIndex, setHighestZIndex] = useState(100);

  const openWindow = (id: string, position = { x: 100, y: 100 }) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        id,
        isOpen: true,
        isMinimized: false,
        zIndex: highestZIndex + 1,
        position
      }
    }));
    setHighestZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id]?.isMinimized }
    }));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: highestZIndex + 1 }
    }));
    setHighestZIndex(prev => prev + 1);
  };

  const getWindowState = (id: string) => windows[id];

  return (
    <WindowManagerContext.Provider 
      value={{ 
        windows, 
        openWindow, 
        closeWindow, 
        minimizeWindow, 
        focusWindow, 
        getWindowState 
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};