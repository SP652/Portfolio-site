import { Github, Star, GitBranch, GitCommit, Clock, ExternalLink } from 'lucide-react';
import { FloatingWindow } from './FloatingWindow';

interface GitHubWindowProps {
  onClose: () => void;
}

// Mock GitHub data
const githubData = {
  user: {
    name: 'Sanjay Kumar',
    username: 'sanjay-dev',
    avatar: '/placeholder.svg',
    followers: 234,
    following: 180,
    publicRepos: 42
  },
  repositories: [
    {
      name: 'ai-portfolio-dashboard',
      description: 'Modern AI-powered portfolio dashboard built with React and TypeScript',
      language: 'TypeScript',
      stars: 128,
      forks: 23,
      updated: '2 days ago'
    },
    {
      name: 'machine-learning-toolkit',
      description: 'Comprehensive ML toolkit for data preprocessing and model training',
      language: 'Python',
      stars: 89,
      forks: 15,
      updated: '1 week ago'
    },
    {
      name: 'react-component-library',
      description: 'Reusable React components with TypeScript and Storybook',
      language: 'JavaScript',
      stars: 156,
      forks: 34,
      updated: '3 days ago'
    },
    {
      name: 'api-gateway-service',
      description: 'Scalable API gateway built with Node.js and Express',
      language: 'JavaScript',
      stars: 67,
      forks: 12,
      updated: '5 days ago'
    }
  ],
  activity: [
    { type: 'commit', repo: 'ai-portfolio-dashboard', message: 'Add responsive dock animations', time: '2 hours ago' },
    { type: 'star', repo: 'react-component-library', time: '1 day ago' },
    { type: 'commit', repo: 'machine-learning-toolkit', message: 'Implement feature scaling pipeline', time: '2 days ago' },
    { type: 'fork', repo: 'open-source-project', time: '3 days ago' }
  ]
};

export const GitHubWindow = ({ onClose }: GitHubWindowProps) => {
  return (
    <FloatingWindow
      title="GitHub Dashboard"
      icon={<Github className="w-5 h-5 text-ai-primary" />}
      onClose={onClose}
      initialPosition={{ x: 200, y: 150 }}
    >
      <div className="space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-panel p-3 text-center">
            <div className="text-2xl font-bold text-ai-primary">{githubData.user.publicRepos}</div>
            <div className="text-xs text-muted-foreground">Repositories</div>
          </div>
          <div className="glass-panel p-3 text-center">
            <div className="text-2xl font-bold text-ai-secondary">{githubData.user.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="glass-panel p-3 text-center">
            <div className="text-2xl font-bold text-ai-tertiary">1,245</div>
            <div className="text-xs text-muted-foreground">Contributions</div>
          </div>
        </div>

        {/* Recent Repositories */}
        <div className="space-y-3">
          <h4 className="font-semibold text-ai-secondary flex items-center space-x-2">
            <GitBranch className="w-4 h-4" />
            <span>Recent Repositories</span>
          </h4>
          {githubData.repositories.slice(0, 3).map((repo, index) => (
            <div key={index} className="glass-panel p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-gradient">{repo.name}</h5>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3" />
                  <span>{repo.stars}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{repo.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ai-secondary">{repo.language}</span>
                <span className="text-muted-foreground">{repo.updated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="font-semibold text-ai-secondary flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Recent Activity</span>
          </h4>
          {githubData.activity.slice(0, 4).map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <GitCommit className="w-3 h-3 text-ai-tertiary" />
              <div className="flex-1">
                <span className="text-foreground">{activity.type === 'commit' ? 'Committed to' : activity.type === 'star' ? 'Starred' : 'Forked'}</span>
                <span className="text-ai-primary mx-1">{activity.repo}</span>
                {activity.message && <span className="text-muted-foreground">- {activity.message}</span>}
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <button className="glass-button text-xs flex items-center space-x-2">
            <ExternalLink className="w-3 h-3" />
            <span>View Full Profile</span>
          </button>
        </div>
      </div>
    </FloatingWindow>
  );
};