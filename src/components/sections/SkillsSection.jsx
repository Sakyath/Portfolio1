import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages',
    icon: '⚡',
    color: '#60A5FA',
    skills: ['Java', 'JavaScript', 'C'],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    color: '#6EE7F9',
    skills: ['HTML', 'CSS', 'Bootstrap', 'React.js'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: '#A78BFA',
    skills: ['.NET MVC 5', 'Spring Boot'],
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: '#60A5FA',
    skills: ['MySQL', 'SQL Server'],
  },
  {
    title: 'Tools',
    icon: '🔧',
    color: '#6EE7F9',
    skills: ['Git', 'Postman'],
  },
  {
    title: 'Concepts',
    icon: '🧠',
    color: '#A78BFA',
    skills: ['REST APIs', 'MVC', 'OOP'],
  },
]

function SkillCard({ category, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hoverable
      style={{
        position: 'relative',
        padding: '28px',
        borderRadius: '24px',
        background: isHovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${isHovered ? `${category.color}30` : 'rgba(255,255,255,0.3)'}`,
        boxShadow: isHovered
          ? `0 20px 60px ${category.color}15, 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.6)`
          : '0 8px 32px rgba(96,165,250,0.06), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.6)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
        opacity: isHovered ? 0.6 : 0.15,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Noise overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
        backgroundSize: '128px',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${category.color}18, ${category.color}08)`,
          border: `1px solid ${category.color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          {category.icon}
        </div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#0F172A',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        position: 'relative',
        zIndex: 1,
      }}>
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            whileHover={{
              scale: 1.08,
              y: -2,
              boxShadow: `0 6px 20px ${category.color}20`,
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#475569',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

/* ---- Neural Network Visualization ---- */
function NeuralNetwork({ isInView }) {
  const nodes = [
    // Input layer
    { x: 80, y: 60, label: 'Java', color: '#60A5FA' },
    { x: 80, y: 130, label: 'React', color: '#6EE7F9' },
    { x: 80, y: 200, label: 'SQL', color: '#A78BFA' },
    { x: 80, y: 270, label: 'C', color: '#60A5FA' },
    // Hidden layer
    { x: 250, y: 95, label: 'Frontend', color: '#6EE7F9' },
    { x: 250, y: 165, label: 'Backend', color: '#A78BFA' },
    { x: 250, y: 235, label: 'DevOps', color: '#60A5FA' },
    // Output
    { x: 420, y: 150, label: 'Full Stack', color: '#A78BFA' },
  ]

  const connections = [
    [0,4],[0,5],[0,6],
    [1,4],[1,5],
    [2,5],[2,6],
    [3,4],[3,5],[3,6],
    [4,7],[5,7],[6,7],
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
      style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto 48px',
        padding: '20px',
      }}
    >
      <svg viewBox="0 0 500 320" style={{ width: '100%', height: 'auto' }}>
        {/* Connections */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.05 }}
          />
        ))}

        {/* Animated pulse along connections */}
        {connections.map(([from, to], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2"
            fill={nodes[from].color}
            opacity="0.5"
            initial={{ cx: nodes[from].x, cy: nodes[from].y }}
            animate={isInView ? {
              cx: [nodes[from].x, nodes[to].x],
              cy: [nodes[from].y, nodes[to].y],
              opacity: [0, 0.6, 0],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="24"
              fill={`${node.color}10`}
              stroke={node.color}
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill="none"
              stroke={node.color}
              strokeWidth="0.5"
              opacity="0.2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#475569"
              fontSize="9"
              fontWeight="600"
              fontFamily="'Inter', sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '120px 5vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '600px' }}
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
            Skills & Expertise
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
          marginBottom: '12px',
        }}>
          My <span className="gradient-text">Tech Stack</span>
        </h2>
        <p style={{ color: '#64748B', fontSize: '15px', lineHeight: 1.6 }}>
          A neural network of technologies working together to build exceptional experiences
        </p>
      </motion.div>

      {/* Neural Network Visualization */}
      <NeuralNetwork isInView={isInView} />

      {/* Skill cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1100px',
      }}>
        {skillCategories.map((category, index) => (
          <SkillCard
            key={category.title}
            category={category}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  )
}
