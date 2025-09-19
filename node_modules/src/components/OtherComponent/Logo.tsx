import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizePx = {
  sm: 24,
  md: 32,
  lg: 40
};

export function Logo({ size = 'md', showText = true, onClick, className = '' }: LogoProps) {
  const logoImg = (
    <div className={`flex items-center gap-2 ${onClick ? 'cursor-pointer' : ''} ${className}`}>
      <img
        src="/tepa.png"
        alt="Tepa Solutions Logo"
        width={sizePx[size]}
        height={sizePx[size]}
        className="rounded-lg"
        style={{ objectFit: 'contain' }}
      />
      {showText && (
        <span className={`font-semibold ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-lg'}`}>
          Tepa Solutions
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {logoImg}
      </motion.div>
    );
  }

  return logoImg;
}