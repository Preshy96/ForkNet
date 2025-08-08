'use client'

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Main logo container with gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg"></div>
        
        {/* Fork icon */}
        <div className="relative h-full w-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fork handle */}
            <rect x="11" y="8" width="2" height="14" fill="currentColor" rx="1"/>
            
            {/* Fork prongs */}
            <rect x="7" y="2" width="2" height="8" fill="currentColor" rx="1"/>
            <rect x="11" y="2" width="2" height="6" fill="currentColor" rx="1"/>
            <rect x="15" y="2" width="2" height="8" fill="currentColor" rx="1"/>
            
            {/* Network connection dots */}
            <circle cx="5" cy="6" r="1.5" fill="currentColor" opacity="0.8"/>
            <circle cx="19" cy="6" r="1.5" fill="currentColor" opacity="0.8"/>
            <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.8"/>
            
            {/* Connection lines */}
            <path d="M6.5 6.5L8.5 4.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <path d="M17.5 6.5L15.5 4.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <path d="M12 18.5V16" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-xl opacity-20 blur-sm"></div>
      </div>
      
      <div className="flex flex-col">
        <span className={cn(
          "font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight",
          textSizeClasses[size]
        )}>
          ForkNet
        </span>
        {size !== 'sm' && (
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            Web3 Food Delivery
          </span>
        )}
      </div>
    </div>
  )
}
