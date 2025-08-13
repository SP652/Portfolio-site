import { useState } from 'react';
import { Send, User, Bot, FileText, Folder, Star, MessageCircle, Zap } from 'lucide-react';
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
      content: "Hi Sanjay! I've analyzed your GitHub repos. Your strongest skill right now is React.js 🚀",
      timestamp: new Date(Date.now() - 60000),
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
            {/* AI Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-ai animate-pulse-glow flex items-center justify-center">
                  <Bot className="w-8 h-8 text-os-background" />
                </div>
                {isThinking && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ai-secondary animate-ai-think flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-os-background" />
                  </div>
                )}
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
