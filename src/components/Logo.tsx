import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Logo({ size = 'md', showText = true, onClick, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-10 h-10'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const logoContent = (
    <div className={`flex items-center gap-2 ${onClick ? 'cursor-pointer' : ''} ${className}`}>
      <div className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center`}>
        <div className="flex gap-1">
          <div className={`${dotSizes[size]} bg-primary-foreground rounded-full`}></div>
          <div className={`${dotSizes[size]} bg-primary-foreground rounded-full`}></div>
          <div className={`${dotSizes[size]} bg-primary-foreground rounded-full`}></div>
        </div>
      </div>
      {showText && <span className={`font-semibold ${textSizes[size]}`}>Tepa Solutions</span>}
    </div>
  );

  if (onClick) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {logoContent}
      </motion.div>
    );
  }

  return logoContent;
}