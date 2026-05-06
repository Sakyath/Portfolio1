import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -5])
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  const lines = [
    "I'm a passionate full-stack developer with a focus on building clean, scalable, and user-centric web applications.",
    "With experience spanning Java, React.js, Spring Boot, and .NET MVC, I bring a well-rounded perspective to every project.",
    "I thrive at the intersection of design and engineering — creating experiences that are both beautiful and performant.",
    "My approach combines modern development practices with a keen eye for detail, ensuring every line of code serves a purpose.",
  ]

  const stats = [
    { value: '5+', label: 'Technologies' },
    { value: '3+', label: 'Projects' },
    { value: '100%', label: 'Dedication' },
  ]

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 5vw',
        position: 'relative',
      }}
    >
      <motion.div
        style={{
          maxWidth: '900px',
          width: '100%',
          rotateX,
          y,
          perspective: '1200px',
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
          }}
        >
          <div style={{
            width: '32px', height: '2px',
            background: 'linear-gradient(90deg, #60A5FA, #A78BFA)',
            borderRadius: '1px',
          }} />
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#60A5FA',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            About Me
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginBottom: '40px',
            color: '#0F172A',
          }}
        >
          Crafting digital experiences
          <br />
          with <span className="gradient-text">precision & passion</span>
        </motion.h2>

        {/* Glass panel with text */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="glass"
          style={{
            padding: 'clamp(28px, 4vw, 48px)',
            position: 'relative',
          }}
        >
          {/* Gradient accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '32px',
            right: '32px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #60A5FA, #A78BFA, transparent)',
            opacity: 0.4,
          }} />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            position: 'relative',
            zIndex: 2,
          }}>
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                  lineHeight: 1.75,
                  color: i === 0 ? '#0F172A' : '#475569',
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(96,165,250,0.1)',
              position: 'relative',
              zIndex: 2,
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1, minWidth: '100px' }}>
                <div
                  className="gradient-text"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#94A3B8',
                  marginTop: '6px',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
