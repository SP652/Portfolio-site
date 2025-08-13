import { Zap, Target, TrendingUp, Calendar, CheckCircle, Clock } from 'lucide-react';
import { FloatingWindow } from './FloatingWindow';

interface LeetCodeWindowProps {
  onClose: () => void;
}

// Mock LeetCode data
const leetcodeData = {
  stats: {
    totalSolved: 78,
    totalProblems: 150,
    easy: 45,
    medium: 28,
    hard: 5,
    ranking: 12453,
    streak: 15
  },
  recentSubmissions: [
    {
      title: 'Two Sum',
      difficulty: 'Easy',
      status: 'Accepted',
      time: '2 hours ago',
      runtime: '68ms'
    },
    {
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Easy',
      status: 'Accepted',
      time: '1 day ago',
      runtime: '52ms'
    },
    {
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      status: 'Accepted',
      time: '2 days ago',
      runtime: '84ms'
    },
    {
      title: 'Valid Palindrome',
      difficulty: 'Easy',
      status: 'Accepted',
      time: '3 days ago',
      runtime: '76ms'
    }
  ],
  upcomingContest: {
    name: 'Weekly Contest 382',
    date: '2024-01-21',
    time: '10:30 AM PST'
  }
};

export const LeetCodeWindow = ({ onClose }: LeetCodeWindowProps) => {
  const progressPercentage = (leetcodeData.stats.totalSolved / leetcodeData.stats.totalProblems) * 100;

  return (
    <FloatingWindow
      title="LeetCode Progress"
      icon={<Zap className="w-5 h-5 text-ai-primary" />}
      onClose={onClose}
      initialPosition={{ x: 500, y: 150 }}
    >
      <div className="space-y-6">
        {/* Progress Overview */}
        <div className="text-center space-y-3">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--glass-border))"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--ai-neon))"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${progressPercentage * 2.83} 283`}
                className="animate-progress-fill"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-ai-neon">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gradient">
              {leetcodeData.stats.totalSolved}/{leetcodeData.stats.totalProblems}
            </div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-panel p-3 text-center">
            <div className="text-lg font-bold text-green-400">{leetcodeData.stats.easy}</div>
            <div className="text-xs text-muted-foreground">Easy</div>
          </div>
          <div className="glass-panel p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">{leetcodeData.stats.medium}</div>
            <div className="text-xs text-muted-foreground">Medium</div>
          </div>
          <div className="glass-panel p-3 text-center">
            <div className="text-lg font-bold text-red-400">{leetcodeData.stats.hard}</div>
            <div className="text-xs text-muted-foreground">Hard</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel p-3 text-center">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4 text-ai-secondary" />
              <span className="text-lg font-bold">{leetcodeData.stats.ranking.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground">Global Ranking</div>
          </div>
          <div className="glass-panel p-3 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-4 h-4 text-ai-tertiary" />
              <span className="text-lg font-bold">{leetcodeData.stats.streak}</span>
            </div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-ai-secondary flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Recent Submissions</span>
          </h4>
          {leetcodeData.recentSubmissions.slice(0, 3).map((submission, index) => (
            <div key={index} className="glass-panel p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-sm">{submission.title}</h5>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  submission.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  submission.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {submission.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>{submission.status}</span>
                </span>
                <span>{submission.runtime}</span>
              </div>
              <div className="text-xs text-muted-foreground">{submission.time}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Contest */}
        <div className="glass-panel p-3 space-y-2">
          <h4 className="font-semibold text-ai-secondary flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Upcoming Contest</span>
          </h4>
          <div className="space-y-1">
            <div className="font-medium text-sm">{leetcodeData.upcomingContest.name}</div>
            <div className="text-xs text-muted-foreground flex items-center space-x-2">
              <Clock className="w-3 h-3" />
              <span>{leetcodeData.upcomingContest.date} at {leetcodeData.upcomingContest.time}</span>
            </div>
          </div>
        </div>
      </div>
    </FloatingWindow>
  );
};