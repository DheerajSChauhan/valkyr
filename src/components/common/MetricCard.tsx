import React from 'react';
import { GlassCard } from './GlassCard';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  subtitle,
  trend,
  trendPositive = true,
  accentColor = '#C7FF3D'
}) => {
  return (
    <GlassCard variant="standard" className="flex flex-col justify-between p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
          style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              trendPositive
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                : 'bg-rose-500/15 text-rose-300 border border-rose-500/25'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div className="mt-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#929895] block">
          {label}
        </span>
        <div className="text-xl sm:text-2xl font-black text-[#F5F5F2] tracking-tight tabular-nums mt-0.5">
          {value}
        </div>
        {subtitle && (
          <span className="text-[11px] text-[#929895] block mt-0.5">{subtitle}</span>
        )}
      </div>
    </GlassCard>
  );
};
