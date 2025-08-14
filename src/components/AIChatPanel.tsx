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

interface AIChatPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AIChatPanel = ({ activeTab, onTabChange }: AIChatPanelProps) => {
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
      setMessages(prev => {
        const newMessages = [...prev, aiMessage];
        // Auto-scroll to bottom
        setTimeout(() => {
          const messagesContainer = document.querySelector('.flex-1.overflow-y-auto');
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }, 100);
        return newMessages;
      });
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
      <div className="dashboard-frame glass-panel animate-float pointer-events-auto">
        <Tabs value={activeTab} onValueChange={onTabChange} className="h-full flex flex-col">
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
            <div className="content-scroll space-y-4 mb-4">
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

          {/* Resume Tab */}
          <TabsContent value="resume" className="content-scroll p-4">
            <div className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <FileText className="w-16 h-16 mx-auto text-ai-primary" />
                <h3 className="text-xl font-semibold text-gradient">Professional Resume</h3>
              </div>
              
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <h4 className="text-lg font-semibold text-ai-secondary mb-4">Professional Summary</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Experienced Full-Stack Developer with 5+ years in building scalable web applications using React, TypeScript, and Node.js. 
                    Passionate about AI integration and modern UI/UX design. Proven track record of delivering high-quality software solutions 
                    in fast-paced environments.
                  </p>
                </div>

                <div className="glass-panel p-6">
                  <h4 className="text-lg font-semibold text-ai-secondary mb-4">Experience</h4>
                  <div className="space-y-4">
                    <div className="border-l-2 border-ai-primary pl-4">
                      <h5 className="font-medium">Senior Frontend Developer</h5>
                      <p className="text-sm text-ai-secondary">TechCorp Inc. • 2022 - Present</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Leading development of AI-powered dashboard interfaces, resulting in 40% improvement in user engagement.
                      </p>
                    </div>
                    <div className="border-l-2 border-ai-secondary pl-4">
                      <h5 className="font-medium">Full-Stack Developer</h5>
                      <p className="text-sm text-ai-secondary">InnovateLab • 2020 - 2022</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Built scalable microservices architecture serving 100K+ users daily.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="content-scroll p-4">
            <div className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <Folder className="w-16 h-16 mx-auto text-ai-primary" />
                <h3 className="text-xl font-semibold text-gradient">Featured Projects</h3>
              </div>
              
              <div className="grid gap-4">
                <div className="glass-panel p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gradient">SanjayOS AI Dashboard</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-ai-primary/20 text-ai-primary">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Futuristic AI-powered personal operating system interface with real-time GitHub integration.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-ai-secondary/20 text-ai-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gradient">ML Data Pipeline</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-ai-tertiary/20 text-ai-tertiary">Completed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automated machine learning pipeline for real-time data processing and model deployment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'TensorFlow', 'Docker', 'AWS'].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-ai-secondary/20 text-ai-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="content-scroll p-4">
            <div className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <Star className="w-16 h-16 mx-auto text-ai-primary" />
                <h3 className="text-xl font-semibold text-gradient">Technical Skills</h3>
              </div>
              
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <h4 className="text-lg font-semibold text-ai-secondary mb-4">Programming Languages</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'TypeScript', level: 95 },
                      { name: 'JavaScript', level: 98 },
                      { name: 'Python', level: 85 },
                      { name: 'Java', level: 75 }
                    ].map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-ai-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-glass-border rounded-full h-2">
                          <div 
                            className="bg-gradient-ai h-2 rounded-full animate-progress-fill" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6">
                  <h4 className="text-lg font-semibold text-ai-secondary mb-4">Frameworks & Tools</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map((tool) => (
                      <div key={tool} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-ai-neon animate-pulse" />
                        <span className="text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="content-scroll p-4">
            <div className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <User className="w-16 h-16 mx-auto text-ai-primary" />
                <h3 className="text-xl font-semibold text-gradient">Get In Touch</h3>
              </div>
              
              <div className="space-y-4">
                <div className="glass-panel p-6 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-ai mx-auto flex items-center justify-center">
                    <User className="w-10 h-10 text-os-background" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gradient">Sanjay Kumar</h4>
                    <p className="text-sm text-muted-foreground">Full-Stack Developer & AI Enthusiast</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="glass-panel p-4">
                    <h5 className="font-medium text-ai-secondary mb-2">Professional Email</h5>
                    <p className="text-sm text-muted-foreground">sanjay.dev@example.com</p>
                  </div>
                  <div className="glass-panel p-4">
                    <h5 className="font-medium text-ai-secondary mb-2">LinkedIn</h5>
                    <p className="text-sm text-muted-foreground">linkedin.com/in/sanjay-kumar-dev</p>
                  </div>
                  <div className="glass-panel p-4">
                    <h5 className="font-medium text-ai-secondary mb-2">GitHub</h5>
                    <p className="text-sm text-muted-foreground">github.com/sanjay-dev</p>
                  </div>
                  <div className="glass-panel p-4">
                    <h5 className="font-medium text-ai-secondary mb-2">Location</h5>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Playground Tab */}
          <TabsContent value="playground" className="content-scroll p-4">
            <div className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <Zap className="w-16 h-16 mx-auto text-ai-primary" />
                <h3 className="text-xl font-semibold text-gradient">AI Playground</h3>
                <p className="text-sm text-muted-foreground">Experimental AI features and integrations</p>
              </div>
              
              <div className="grid gap-4">
                <div className="glass-panel p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-ai-secondary">Code Analysis AI</h4>
                  <p className="text-sm text-muted-foreground">
                    AI-powered code review and optimization suggestions for your GitHub repositories.
                  </p>
                  <div className="glass-button w-full text-center py-3">
                    <span className="text-sm">Analyze Repository</span>
                  </div>
                </div>

                <div className="glass-panel p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-ai-secondary">Resume Optimizer</h4>
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered suggestions to improve your resume for specific job roles.
                  </p>
                  <div className="glass-button w-full text-center py-3">
                    <span className="text-sm">Optimize Resume</span>
                  </div>
                </div>

                <div className="glass-panel p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-ai-secondary">Interview Prep</h4>
                  <p className="text-sm text-muted-foreground">
                    Practice coding interviews with AI-generated questions based on your skill level.
                  </p>
                  <div className="glass-button w-full text-center py-3">
                    <span className="text-sm">Start Practice</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
