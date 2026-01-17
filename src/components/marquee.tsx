'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface MarqueeProps {
    children: ReactNode
    direction?: 'left' | 'right'
    speed?: number
    pauseOnHover?: boolean
    className?: string
}

export function Marquee({
    children,
    direction = 'left',
    speed = 30,
    pauseOnHover = true,
    className = '',
}: MarqueeProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <div
                className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{
                    animation: `marquee-${direction} ${speed}s linear infinite`,
                }}
            >
                {children}
                {/* Duplicate for seamless loop */}
                {children}
            </div>
            <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
        </div>
    )
}

interface SkillBadgeProps {
    name: string
    icon?: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
    return (
        <motion.div
            className="flex items-center gap-2 px-5 py-3 mx-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full whitespace-nowrap hover:border-violet-500/50 hover:bg-zinc-800 transition-all cursor-default"
            whileHover={{ scale: 1.05, y: -2 }}
        >
            <span className="text-zinc-200 font-medium">{name}</span>
        </motion.div>
    )
}

interface SkillsMarqueeProps {
    skills: { id: number; name: string | null; category: string | null }[]
}

export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
    // Split skills into two rows for visual variety
    const midpoint = Math.ceil(skills.length / 2)
    const topRow = skills.slice(0, midpoint)
    const bottomRow = skills.slice(midpoint)

    return (
        <div className="space-y-4">
            {/* Top row - scrolls left */}
            <Marquee direction="left" speed={35}>
                <div className="flex">
                    {topRow.map((skill) => (
                        <SkillBadge key={skill.id} name={skill.name || ''} />
                    ))}
                </div>
            </Marquee>

            {/* Bottom row - scrolls right */}
            <Marquee direction="right" speed={40}>
                <div className="flex">
                    {bottomRow.map((skill) => (
                        <SkillBadge key={skill.id} name={skill.name || ''} />
                    ))}
                </div>
            </Marquee>
        </div>
    )
}
