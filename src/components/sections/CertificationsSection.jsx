import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const certifications = [
  {
    title: 'Microsoft Internship',
    issuer: 'Microsoft',
    date: '2024',
    description:
      'Cloud technologies, Azure services, and enterprise software development practices.',
    skills: ['Azure', 'Cloud Computing', 'Enterprise'],
    icon: '☁️',
  },
  {
    title: 'AICTE AI Internship',
    issuer: 'All India Council for Technical Education',
    date: '2024',
    description:
      'Deep learning, neural networks, and practical AI applications in real-world scenarios.',
    skills: ['Machine Learning', 'Deep Learning', 'Python'],
    icon: '🤖',
  },
  {
    title: 'JPMorgan Virtual Experience',
    issuer: 'JPMorgan Chase & Co.',
    date: '2024',
    description:
      'Software engineering tasks, financial systems understanding, and development best practices.',
    skills: ['Software Engineering', 'Financial Systems', 'Problem Solving'],
    icon: '💼',
  },
  {
    title: 'Accenture Data Analytics',
    issuer: 'Accenture',
    date: '2023',
    description:
      'Data visualization, statistical analysis, business intelligence, and analytical problem-solving.',
    skills: ['Data Analytics', 'Visualization', 'Business Intelligence'],
    icon: '📊',
  },
  {
    title: 'Udemy Certifications',
    issuer: 'Udemy',
    date: '2023 - 2024',
    description:
      'Full-stack web development, React.js, advanced JavaScript, and modern development practices.',
    skills: ['React.js', 'JavaScript', 'Web Development'],
    icon: '🎓',
  },
]

function CertificationCard({ certification, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hoverable
      style={{
        position: 'relative',
        borderRadius: '28px',
        background: 'rgba(255,255,255,0.62)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: `1.5px solid ${isHovered ? 'rgba(96, 165, 250, 0.45)' : 'rgba(255,255,255,0.45)'}`,
        boxShadow: isHovered
          ? '0 32px 96px rgba(96, 165, 250, 0.22), 0 0 32px rgba(167, 139, 250, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)'
          : '0 16px 64px rgba(96, 165, 250, 0.1), inset 0 1px 0 rgba(255,255,255,0.7)',
        overflow: 'visible',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        padding: 'clamp(24px, 4vw, 32px)',
      }}
    >
      {/* Background gradient glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHovered
            ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.08), rgba(167, 139, 250, 0.08))'
            : 'linear-gradient(135deg, rgba(96, 165, 250, 0.02), rgba(167, 139, 250, 0.02))',
          transition: 'all 0.6s ease',
          pointerEvents: 'none',
          borderRadius: '28px',
        }}
      />

      {/* Top accent line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, #60A5FA, #A78BFA, transparent)',
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.6s ease',
          borderRadius: '28px 28px 0 0',
        }}
      />

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon + Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(14px, 3vw, 18px)', marginBottom: 'clamp(18px, 3vw, 22px)' }}>
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: 'clamp(36px, 8vw, 44px)',
              width: 'clamp(56px, 10vw, 64px)',
              height: 'clamp(56px, 10vw, 64px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(167, 139, 250, 0.14))',
              border: '1.5px solid rgba(96, 165, 250, 0.28)',
              flexShrink: 0,
              backdropFilter: 'blur(14px)',
            }}
          >
            {certification.icon}
          </motion.div>

          <div style={{ flex: 1 }}>
            <h3
              style={{
                margin: '0 0 4px 0',
                fontSize: 'clamp(18px, 3.2vw, 22px)',
                fontWeight: '800',
                color: '#0F172A',
                background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.3px',
              }}
            >
              {certification.title}
            </h3>
            <p
              style={{
                margin: '0',
                fontSize: 'clamp(12px, 2vw, 13px)',
                color: '#64748B',
                fontWeight: '600',
                letterSpacing: '0.2px',
              }}
            >
              {certification.issuer}
            </p>
          </div>

          <motion.span
            animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.16), rgba(167, 139, 250, 0.12))',
              color: '#3B82F6',
              fontSize: '11px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(96, 165, 250, 0.32)',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.3px',
            }}
          >
            {certification.date}
          </motion.span>
        </div>

        {/* Divider */}
        <motion.div
          style={{
            height: '0.8px',
            background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.25), transparent)',
            marginBottom: 'clamp(16px, 3vw, 20px)',
            opacity: isHovered ? 0.7 : 0.35,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Description */}
        <p
          style={{
            margin: `0 0 clamp(16px, 3vw, 20px) 0`,
            fontSize: 'clamp(13px, 2vw, 14px)',
            color: '#475569',
            lineHeight: '1.65',
            fontWeight: '500',
            letterSpacing: '0.1px',
          }}
        >
          {certification.description}
        </p>

        {/* Skills Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(8px, 2vw, 10px)' }}>
          {certification.skills.map((skill, skillIndex) => (
            <motion.span
              key={skillIndex}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + (index + skillIndex) * 0.06 }}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: '5px 12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.07))',
                border: '1px solid rgba(96, 165, 250, 0.28)',
                color: '#3B82F6',
                fontSize: 'clamp(11px, 1.5vw, 12px)',
                fontWeight: '700',
                backdropFilter: 'blur(12px)',
                cursor: 'default',
                transition: 'all 0.4s ease',
                letterSpacing: '0.2px',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="certifications"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(20px, 5vw, 60px)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '2px',
            background: 'linear-gradient(90deg, #60A5FA, #A78BFA)',
            borderRadius: '1px',
          }}
        />
        <span
          style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#60A5FA',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Certifications
        </span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(50px, 10vh, 70px)' }}
      >
        <h2
          style={{
            fontSize: 'clamp(30px, 7vw, 50px)',
            fontWeight: '800',
            margin: '0 0 18px 0',
            color: '#0F172A',
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
          }}
        >
          Professional Achievements
        </h2>
        <p
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: '#64748B',
            margin: '0',
            fontWeight: '500',
            maxWidth: '500px',
          }}
        >
          Certifications and internship experiences from industry leaders
        </p>
      </motion.div>

      {/* Certifications Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(24px, 4vw, 32px)',
          paddingBottom: 'clamp(10px, 2vw, 20px)',
        }}
      >
        {certifications.map((certification, index) => (
          <CertificationCard
            key={index}
            certification={certification}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  )
}
