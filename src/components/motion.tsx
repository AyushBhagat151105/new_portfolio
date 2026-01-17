'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

// Fade in animation variants
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
}

// Fade up animation
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Stagger children animation
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

// Scale on hover
export const scaleOnHover: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeInOut' } },
}

// Slide in from left
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Slide in from right
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Motion components for easy use
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionSpan = motion.span
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionP = motion.p
export const MotionA = motion.a

// Animated text that reveals letter by letter
interface AnimatedTextProps {
    text: string
    className?: string
    delay?: number
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
    const letterVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: delay + i * 0.03,
                duration: 0.4,
                ease: 'easeOut',
            },
        }),
    }

    return (
        <span className={className}>
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    )
}

// Animated card with hover effects
interface AnimatedCardProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            {children}
        </motion.div>
    )
}

// Animated section that fades in when in viewport
interface AnimatedSectionProps {
    children: ReactNode
    className?: string
    id?: string
}

export function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
    return (
        <motion.section
            id={id}
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.section>
    )
}

// Animated button with pulse effect
interface AnimatedButtonProps {
    children: ReactNode
    className?: string
    href?: string
    onClick?: () => void
}

export function AnimatedButton({ children, className = '', href, onClick }: AnimatedButtonProps) {
    const Component = href ? motion.a : motion.button

    return (
        <Component
            href={href}
            onClick={onClick}
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {children}
        </Component>
    )
}

// Skill bar with animated fill
interface AnimatedSkillBarProps {
    name: string
    proficiency: number
    delay?: number
}

export function AnimatedSkillBar({ name, proficiency, delay = 0 }: AnimatedSkillBarProps) {
    return (
        <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="flex justify-between text-sm">
                <span className="text-zinc-300">{name}</span>
                <span className="text-zinc-500">{proficiency}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    )
}

// Stacked list item with hover expand
interface StackedItemProps {
    children: ReactNode
    className?: string
    index?: number
}

export function StackedItem({ children, className = '', index = 0 }: StackedItemProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
            {children}
        </motion.div>
    )
}

// Floating animation for decorative elements
export function FloatingElement({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    )
}

// Magnetic button effect
interface MagneticButtonProps {
    children: ReactNode
    className?: string
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
    return (
        <motion.div
            className={`inline-block ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    )
}
