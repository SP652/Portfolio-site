import { useState } from 'react';
import { Send, User, Bot, FileText, Folder, Star, MessageCircle, Zap, Brain, Code, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hi Sanjay! I've analyzed your GitHub repos and found some exciting insights. Your strongest skill right now is React.js with 42% of your codebase. I also noticed a 15-day coding streak - impressive consistency! 🚀",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: 2,
      type: 'ai',
      content: "Your recent projects show mastery in full-stack development. The portfolio site uses modern React patterns, and your API endpoints are well-structured. Would you like me to suggest your next learning path based on current market trends?",
      timestamp: new Date(Date.now() - 30000),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I can help you with that! Let me analyze your profile and provide personalized suggestions based on your skills and experience.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-8 pointer-events-none">
      <div className="w-full max-w-4xl h-[80vh] glass-panel animate-float pointer-events-auto">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 glass-panel m-4 mb-0">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Folder className="w-4 h-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Skills</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="playground" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>AI Lab</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Content */}
          <TabsContent value="chat" className="flex-1 flex flex-col p-4 pt-2">
            {/* Enhanced AI Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-ai animate-pulse-glow flex items-center justify-center relative overflow-hidden">
                  <Bot className="w-10 h-10 text-os-background relative z-10" />
                  {/* Neural network pattern overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-os-background animate-data-pulse" />
                    <div className="absolute top-4 right-3 w-1 h-1 rounded-full bg-os-background animate-data-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-3 left-4 w-1 h-1 rounded-full bg-os-background animate-data-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-os-background animate-data-pulse" style={{ animationDelay: '1.5s' }} />
                  </div>
                </div>
                {isThinking && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ai-neon animate-ai-think flex items-center justify-center">
                    <Brain className="w-4 h-4 text-os-background" />
                  </div>
                )}
                {/* Activity indicators */}
                <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-ai-tertiary animate-neon-glow flex items-center justify-center">
                  <Activity className="w-3 h-3 text-os-background" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-ai-secondary animate-neon-glow flex items-center justify-center" style={{ animationDelay: '1s' }}>
                  <Code className="w-3 h-3 text-os-background" />
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="flex items-center space-x-4 glass-panel px-3 py-1 rounded-full">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-ai-neon animate-data-pulse" />
                  <span className="text-xs text-muted-foreground">Analyzing</span>
                </div>
                <div className="w-px h-3 bg-glass-border" />
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-ai-secondary animate-data-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-xs text-muted-foreground">Learning</span>
                </div>
                <div className="w-px h-3 bg-glass-border" />
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-ai-tertiary animate-data-pulse" style={{ animationDelay: '1s' }} />
                  <span className="text-xs text-muted-foreground">Ready</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-ai-primary text-os-background ml-4'
                        : 'glass-panel mr-4'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your profile, skills, or career..."
                className="flex-1 glass-panel border-0 bg-os-surface-glass text-os-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isThinking}
                className="glass-button ai-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Other tabs content placeholders */}
          <TabsContent value="resume" className="flex-1 p-4">
            <div className="text-center space-y-4">
              <FileText className="w-16 h-16 mx-auto text-ai-primary" />
              <h3 className="text-xl font-semibold text-gradient">Resume Analysis</h3>
              <p className="text-muted-foreground">AI-powered resume optimization coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="flex-1 p-4">
            <div className="text-center space-y-4">
              <Folder className="w-16 h-16 mx-auto text-ai-primary" />
              <h3 className="text-xl font-semibold text-gradient">Project Showcase</h3>
              <p className="text-muted-foreground">Interactive project portfolio coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="flex-1 p-4">
            <div className="text-center space-y-4">
              <Star className="w-16 h-16 mx-auto text-ai-primary" />
              <h3 className="text-xl font-semibold text-gradient">Skills Matrix</h3>
              <p className="text-muted-foreground">Dynamic skills visualization coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="flex-1 p-4">
            <div className="text-center space-y-4">
              <User className="w-16 h-16 mx-auto text-ai-primary" />
              <h3 className="text-xl font-semibold text-gradient">Contact Information</h3>
              <p className="text-muted-foreground">Professional contact details coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="playground" className="flex-1 p-4">
            <div className="text-center space-y-4">
              <Zap className="w-16 h-16 mx-auto text-ai-primary" />
              <h3 className="text-xl font-semibold text-gradient">AI Playground</h3>
              <p className="text-muted-foreground">Experimental AI features coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
