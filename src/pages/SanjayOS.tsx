import { OSBackground } from '@/components/OSBackground';
import { TopBar } from '@/components/TopBar';
import { AIChatPanel } from '@/components/AIChatPanel';
import { Dock } from '@/components/Dock';

const SanjayOS = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <OSBackground />
      
      {/* Top Menu Bar */}
      <TopBar />
      
      {/* Central AI Chat Panel */}
      <AIChatPanel />
      
      {/* Bottom Dock */}
      <Dock />
    </div>
  );
};

export default SanjayOS;