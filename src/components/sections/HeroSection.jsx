import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const taglines = [
  'Building scalable, modern web experiences',
  'Crafting elegant digital solutions',
  'Turning ideas into immersive interfaces',
]

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing effect
  useEffect(() => {
    const currentTagline = taglines[taglineIndex]
    let timeout

    if (!isDeleting) {
      if (displayText.length < currentTagline.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTagline.slice(0, displayText.length + 1))
        }, 50 + Math.random() * 30)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 25)
      } else {
        setIsDeleting(false)
        setTaglineIndex((prev) => (prev + 1) % taglines.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, taglineIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 5vw 80px',
        position: 'relative',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          maxWidth: '680px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Greeting badge */}
        <motion.div variants={itemVariants}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '100px',
              background: 'rgba(96,165,250,0.08)',
              border: '1px solid rgba(96,165,250,0.15)',
              marginBottom: '28px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#60A5FA',
            }}
          >
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#60A5FA',
              boxShadow: '0 0 8px rgba(96,165,250,0.5)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }} />
            Available for opportunities
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '6px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <span style={{ color: '#0F172A' }}>Hi, I'm </span>
          <span className="gradient-text">Sakyath</span>
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '20px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Bonagiri
        </motion.h2>

        {/* Typing tagline */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#64748B',
            marginBottom: '36px',
            minHeight: '32px',
            fontWeight: 400,
          }}
        >
          <span>{displayText}</span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'linear-gradient(180deg, #60A5FA, #A78BFA)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#projects"
            className="glow-btn"
            data-hoverable
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>
            </svg>
            View Projects
          </a>
          <a
            href="#contact"
            className="glow-btn glow-btn-outline"
            data-hoverable
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Contact Me
          </a>
        </motion.div>

        {/* Skill orbit tags */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '48px',
          }}
        >
          {['React.js', 'Spring Boot', 'Java', '.NET', 'MySQL'].map((skill, i) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#64748B',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 2px 8px rgba(96,165,250,0.06)',
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>



      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
