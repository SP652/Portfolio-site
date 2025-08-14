import { useState } from 'react';
import { Settings, X, Moon, Sun, Monitor, Palette, Clock, Cloud, Github, Zap, Volume2, Sliders, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
      
      <div className="relative w-full max-w-4xl h-[80vh] glass-panel animate-window-open">
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-ai-primary" />
            <h2 className="text-xl font-semibold text-gradient">System Preferences</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="glass-button p-2 focus-ring"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 h-full">
          <Tabs defaultValue="appearance" className="h-full">
            <TabsList className="grid w-full grid-cols-4 glass-panel mb-6">
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center space-x-2">
                <Sliders className="w-4 h-4" />
                <span>Behavior</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>System</span>
              </TabsTrigger>
            </TabsList>

            <div className="content-scroll space-y-6">
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setTheme('light')}
                      className="flex items-center space-x-2 glass-button focus-ring"
                    >
                      <Sun className="w-4 h-4" />
                      <span>Light</span>
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setTheme('dark')}
                      className="flex items-center space-x-2 glass-button focus-ring"
                    >
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      onClick={() => setTheme('system')}
                      className="flex items-center space-x-2 glass-button focus-ring"
                    >
                      <Monitor className="w-4 h-4" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Wallpaper</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['default', 'cosmic', 'neon'].map((wallpaper) => (
                      <div
                        key={wallpaper}
                        onClick={() => updateSetting('wallpaper', wallpaper)}
                        className={`relative h-20 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                          settings.wallpaper === wallpaper ? 'border-ai-primary' : 'border-glass-border'
                        }`}
                      >
                        <div className={`w-full h-full rounded-lg ${
                          wallpaper === 'default' ? 'bg-gradient-to-br from-blue-900 to-purple-900' :
                          wallpaper === 'cosmic' ? 'bg-gradient-to-br from-purple-900 to-pink-900' :
                          'bg-gradient-to-br from-cyan-900 to-green-900'
                        }`} />
                        <div className="absolute bottom-1 left-1 text-xs font-medium capitalize bg-black/50 px-2 py-1 rounded">
                          {wallpaper}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Behavior Tab */}
              <TabsContent value="behavior" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Animations & Effects</h3>
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
              </TabsContent>

              {/* Integrations Tab */}
              <TabsContent value="integrations" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Developer Integrations</h3>
                  <div className="space-y-4">
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
                  </div>
                </div>

                {settings.githubIntegration && (
                  <div className="space-y-4">
                    <h4 className="font-medium">GitHub Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Username</label>
                        <Input
                          placeholder="github-username"
                          className="glass-panel"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Refresh Interval</label>
                        <Select defaultValue="300">
                          <SelectTrigger className="glass-panel">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60">1 minute</SelectItem>
                            <SelectItem value="300">5 minutes</SelectItem>
                            <SelectItem value="600">10 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* System Tab */}
              <TabsContent value="system" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Time & Date</h3>
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

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Widgets</h3>
                  <div className="space-y-4">
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
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};