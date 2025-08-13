import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

export const OSBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-os" />
      
      {/* Circuit-like overlay pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0 10h5v-5h5v5h5v5h-5v5h-5v-5H0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" className="text-ai-glow" />
        </svg>
      </div>

      {/* Enhanced floating particles with varied colors */}
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full opacity-40 ${
            index % 3 === 0 ? 'bg-ai-glow' : 
            index % 3 === 1 ? 'bg-ai-secondary' : 'bg-ai-neon'
          } animate-data-pulse`}
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
      
      {/* Data flow lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--ai-secondary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--ai-secondary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--ai-secondary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            fill="none"
            stroke="url(#dataFlow)"
            strokeWidth="0.5"
            className="animate-data-pulse"
          />
          <path
            d="M0,30 Q30,10 60,30 T100,30"
            fill="none"
            stroke="url(#dataFlow)"
            strokeWidth="0.3"
            className="animate-data-pulse"
            style={{ animationDelay: '1s' }}
          />
          <path
            d="M0,70 Q20,90 40,70 T100,70"
            fill="none"
            stroke="url(#dataFlow)"
            strokeWidth="0.3"
            className="animate-data-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>
      
      {/* Enhanced ambient light overlay with cyberpunk accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-ai-primary/5 via-transparent to-ai-secondary/5 animate-pulse-glow" />
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-ai-neon/3 to-transparent animate-data-pulse" />
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/4 bg-gradient-to-t from-ai-tertiary/3 to-transparent animate-data-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};