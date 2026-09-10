import React from 'react';
import { clsx } from 'clsx';

export function Card({ className, children, glow, ...props }: React.HTMLAttributes<HTMLDivElement> & { glow?: 'critical' | 'high' | 'none' }) {
  return (
    <div className={clsx(
      'glass-panel rounded-xl',
      glow === 'critical' && 'glow-critical',
      glow === 'high' && 'glow-high',
      className
    )} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('px-5 py-4 border-b border-sentinel-border flex items-center justify-between', className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx('text-[13px] font-semibold tracking-wide uppercase text-sentinel-text', className)} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('p-5', className)} {...props}>{children}</div>;
}
