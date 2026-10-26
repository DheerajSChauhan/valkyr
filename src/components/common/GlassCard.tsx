import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'standard' | 'elevated' | 'hero' | 'inset';
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'standard',
  className = '',
  onClick,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'elevated':
        return 'obsidian-glass-elevated rounded-[22px]';
      case 'hero':
        return 'featured-hero-glass rounded-[24px]';
      case 'inset':
        return 'bg-[#151718] border border-white/[0.08] rounded-[18px] shadow-inner';
      case 'standard':
      default:
        return 'obsidian-glass rounded-[20px]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${getVariantClass()} p-4 sm:p-5 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-white/20 active:scale-[0.99]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
