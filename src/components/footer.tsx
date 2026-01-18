import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from 'lucide-react'
import type { Contact } from '@/db/schema'

interface FooterProps {
    minimal?: boolean
}

export function Footer({ minimal = false }: FooterProps) {
    const [contact, setContact] = useState<Contact | null>(null)

    useEffect(() => {
        async function fetchContact() {
            try {
                const res = await fetch('/api/portfolio')
                const json = await res.json()
                setContact(json.contact || null)
            } catch (error) {
                console.error('Failed to fetch contact:', error)
            }
        }
        fetchContact()
    }, [])

    // Minimal footer (just copyright)
    if (minimal || !contact) {
        return (
            <footer className="relative z-10 py-8 border-t border-zinc-800 bg-zinc-950">
                <div className="container mx-auto px-6 text-center">
                    <motion.p
                        className="text-zinc-500 text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        © {new Date().getFullYear()} All rights reserved. Built with ♥
                    </motion.p>
                </div>
            </footer>
        )
    }

    // Full footer with contact info
    return (
        <footer id="contact" className="relative py-12 sm:py-16 md:py-24 bg-zinc-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                <div className="absolute bottom-1/2 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
                    {/* Left Side - CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-6">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                            Available for opportunities
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                            <span className="text-white">Let's</span>{' '}
                            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                                work together
                            </span>
                        </h2>
                        <p className="text-zinc-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md">
                            Have a project in mind or want to discuss potential collaborations? I'd love to hear from you.
                        </p>
                        {contact.email && (
                            <motion.a
                                href={`mailto:${contact.email}`}
                                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="hidden xs:inline">Send me an</span> Email
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Right Side - Contact Info & Socials */}
                    <motion.div
                        className="space-y-4 sm:space-y-6 md:space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Contact Details */}
                        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
                            {contact.email && (
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-zinc-500 text-xs sm:text-sm">Email</p>
                                        <a href={`mailto:${contact.email}`} className="text-white hover:text-cyan-400 transition-colors font-medium text-sm sm:text-base truncate block">
                                            {contact.email}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {contact.phone && (
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-xs sm:text-sm">Phone</p>
                                        <p className="text-white font-medium text-sm sm:text-base">{contact.phone}</p>
                                    </div>
                                </div>
                            )}
                            {contact.location && (
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-xs sm:text-sm">Location</p>
                                        <p className="text-white font-medium text-sm sm:text-base">{contact.location}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social Links - Stack on very small screens */}
                        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-4">
                            {contact.github && (
                                <motion.a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300"
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Github className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 group-hover:text-white transition-colors" />
                                    <span className="text-zinc-400 group-hover:text-white transition-colors font-medium text-sm sm:text-base">GitHub</span>
                                </motion.a>
                            )}
                            {contact.linkedin && (
                                <motion.a
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                                    <span className="text-zinc-400 group-hover:text-white transition-colors font-medium text-sm sm:text-base">LinkedIn</span>
                                </motion.a>
                            )}
                            {contact.twitter && (
                                <motion.a
                                    href={contact.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl hover:border-sky-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 group-hover:text-sky-400 transition-colors" />
                                    <span className="text-zinc-400 group-hover:text-white transition-colors font-medium text-sm sm:text-base">Twitter</span>
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Footer Bottom */}
                <motion.div
                    className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-zinc-500 text-xs sm:text-sm text-center md:text-left">
                        © {new Date().getFullYear()} All rights reserved. Built with ♥
                    </p>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <a href="#" className="text-zinc-500 hover:text-white text-xs sm:text-sm transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-zinc-500 hover:text-white text-xs sm:text-sm transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
