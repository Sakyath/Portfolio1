import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    title: 'Full Stack Developer Intern',
    company: 'Prosper Overseas',
    period: '6 Months',
    description:
      'Worked on developing and maintaining web applications using .NET MVC 5 and SQL Server. Built responsive user interfaces, handled backend functionality, and collaborated on full-stack development tasks.',
    technologies: ['.NET MVC 5', 'SQL Server', 'HTML', 'CSS', 'JavaScript'],
    color: '#60A5FA',
  },
  {
    title: 'AI & Cloud Projects',
    company: 'Academic / Internship Projects',
    period: '2024 - Present',
    description:
      'Developed projects in AI and web development including AI-powered medical diagnosis systems, Azure-based applications, and deep learning solutions for crop disease prediction.',
    technologies: ['Python', 'Azure', 'Machine Learning', 'Deep Learning'],
    color: '#A78BFA',
  },
  {
    title: 'Full Stack & ECE Projects',
    company: 'Personal & Academic Projects',
    period: '2022 - Present',
    description:
      'Built full-stack web applications and embedded system projects while continuously improving problem-solving, software engineering, and development skills.',
    technologies: ['Java', 'React.js', 'Spring Boot', 'MySQL'],
    color: '#6EE7F9',
  },
]

function TimelineNode({ experience, index, isInView, isLast }) {
  return (
    <div style={{
      display: 'flex',
      gap: 'clamp(20px, 4vw, 40px)',
      position: 'relative',
      paddingBottom: isLast ? 0 : '48px',
    }}>
      {/* Timeline line + node */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '40px',
      }}>
        {/* Glowing node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.15, type: 'spring' }}
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${experience.color}, ${experience.color}88)`,
            boxShadow: `0 0 20px ${experience.color}40, 0 0 40px ${experience.color}15`,
            border: '3px solid white',
            zIndex: 2,
            flexShrink: 0,
          }}
        />

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
            style={{
              width: '2px',
              background: `linear-gradient(180deg, ${experience.color}40, transparent)`,
              flex: 1,
            }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
        animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
        whileHover={{ y: -4, scale: 1.01 }}
        data-hoverable
        style={{
          flex: 1,
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: '0 8px 32px rgba(96,165,250,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '24px',
          right: '24px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${experience.color}60, transparent)`,
        }} />

        {/* Period badge */}
        <div style={{
          display: 'inline-flex',
          padding: '4px 12px',
          borderRadius: '8px',
          background: `${experience.color}10`,
          border: `1px solid ${experience.color}20`,
          fontSize: '12px',
          fontWeight: 600,
          color: experience.color,
          marginBottom: '14px',
        }}>
          {experience.period}
        </div>

        <h3 style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '4px',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {experience.title}
        </h3>

        <p style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#64748B',
          marginBottom: '12px',
        }}>
          {experience.company}
        </p>

        <p style={{
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#475569',
          marginBottom: '18px',
        }}>
          {experience.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 500,
                color: '#64748B',
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '120px 5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '56px', maxWidth: '600px' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
        }}>
          <div style={{
            width: '32px', height: '2px',
            background: 'linear-gradient(90deg, #60A5FA, #A78BFA)',
          }} />
          <span style={{
            fontSize: '13px', fontWeight: 600, color: '#60A5FA',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Journey
          </span>
          <div style={{
            width: '32px', height: '2px',
            background: 'linear-gradient(90deg, #A78BFA, #60A5FA)',
          }} />
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#0F172A',
        }}>
          My <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ maxWidth: '700px', width: '100%' }}>
        {experiences.map((exp, i) => (
          <TimelineNode
            key={i}
            experience={exp}
            index={i}
            isInView={isInView}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
