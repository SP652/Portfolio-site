import { useState } from 'react';
import { Settings, X, Moon, Sun, Monitor, Palette, Clock, Cloud, Github, Zap, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/hooks/useTheme';
import { useSettings } from '@/hooks/useSettings';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const { theme, setTheme } = useTheme();
  const { settings, updateSetting } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl glass-panel animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-ai-primary" />
            <h2 className="text-xl font-semibold text-gradient">System Preferences</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="glass-button p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-lg font-medium">
              <Palette className="w-5 h-5 text-ai-secondary" />
              <span>Appearance</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex items-center space-x-2 glass-button"
              >
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex items-center space-x-2 glass-button"
              >
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => setTheme('system')}
                className="flex items-center space-x-2 glass-button"
              >
                <Monitor className="w-4 h-4" />
                <span>System</span>
              </Button>
            </div>
          </div>

          {/* Time & Date */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-lg font-medium">
              <Clock className="w-5 h-5 text-ai-secondary" />
              <span>Time & Date</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Time Format</label>
                <Select
                  value={settings.timeFormat}
                  onValueChange={(value: '12h' | '24h') => updateSetting('timeFormat', value)}
                >
                  <SelectTrigger className="glass-panel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Timezone</label>
                <Select
                  value={settings.timeZone}
                  onValueChange={(value) => updateSetting('timeZone', value)}
                >
                  <SelectTrigger className="glass-panel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* System Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Features</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-ai-primary animate-pulse" />
                  <span>Smooth Animations</span>
                </div>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={(checked) => updateSetting('animations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cloud className="w-4 h-4 text-ai-secondary" />
                  <span>Weather Widget</span>
                </div>
                <Switch
                  checked={settings.weatherEnabled}
                  onCheckedChange={(checked) => updateSetting('weatherEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Github className="w-4 h-4 text-ai-secondary" />
                  <span>GitHub Integration</span>
                </div>
                <Switch
                  checked={settings.githubIntegration}
                  onCheckedChange={(checked) => updateSetting('githubIntegration', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-ai-secondary" />
                  <span>LeetCode Integration</span>
                </div>
                <Switch
                  checked={settings.leetcodeIntegration}
                  onCheckedChange={(checked) => updateSetting('leetcodeIntegration', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-ai-secondary" />
                  <span>Sound Effects</span>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};