import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'Housing Society Management System',
    description: 'A comprehensive management system for housing societies with features for resident management, maintenance tracking, billing, and communication. Built with modern web technologies for seamless operations.',
    image: '/images/project1.png',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'HTML/CSS'],
    color: '#60A5FA',
    category: 'Full Stack',
  },
  {
    title: 'Web Portal for College',
    description: 'An interactive college web portal providing students and faculty with access to academic resources, announcements, course management, and administrative tools in a unified platform.',
    image: '/images/project2.png',
    technologies: ['.NET MVC 5', 'SQL Server', 'Bootstrap', 'JavaScript'],
    color: '#A78BFA',
    category: 'Full Stack',
  },
]

function ProjectCard({ project, index, isInView, onSelect }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      data-hoverable
      style={{
        position: 'relative',
        borderRadius: '28px',
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${isHovered ? `${project.color}30` : 'rgba(255,255,255,0.35)'}`,
        boxShadow: isHovered
          ? `0 24px 80px ${project.color}18, 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.6)`
          : '0 8px 32px rgba(96,165,250,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        height: '240px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${project.color}08, ${project.color}15)`,
      }}>
        {/* Placeholder pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)`,
            border: `1px solid ${project.color}25`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            transition: 'all 0.4s ease',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          }}>
            {index === 0 ? '🏠' : '🎓'}
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#94A3B8',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            {project.category}
          </span>
        </div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${project.color}10, transparent)`,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Category badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '6px 14px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          fontSize: '11px',
          fontWeight: 600,
          color: project.color,
          border: '1px solid rgba(255,255,255,0.5)',
        }}>
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px' }}>
        <h3 style={{
          fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '10px',
          fontFamily: "'Space Grotesk', sans-serif",
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#64748B',
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.technologies.map((tech) => (
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

        {/* View button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          data-hoverable
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '14px',
            border: `1px solid ${project.color}25`,
            background: `${project.color}08`,
            color: project.color,
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
          }}
        >
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ---- Project Modal ---- */
function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15,23,42,0.3)',
        backdropFilter: 'blur(12px)',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          borderRadius: '32px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: `0 32px 100px ${project.color}20, 0 0 0 1px rgba(255,255,255,0.3)`,
          padding: 'clamp(24px, 4vw, 40px)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          data-hoverable
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#64748B',
            zIndex: 2,
          }}
        >
          ✕
        </button>

        {/* Project image area */}
        <div style={{
          height: '200px',
          borderRadius: '20px',
          background: `linear-gradient(135deg, ${project.color}10, ${project.color}20)`,
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '24px',
            background: `linear-gradient(135deg, ${project.color}25, ${project.color}10)`,
            border: `1px solid ${project.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px',
          }}>
            {project.title.includes('Housing') ? '🏠' : '🎓'}
          </div>
        </div>

        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '8px',
          background: `${project.color}10`,
          border: `1px solid ${project.color}20`,
          fontSize: '12px',
          fontWeight: 600,
          color: project.color,
          marginBottom: '12px',
        }}>
          {project.category}
        </span>

        <h2 style={{
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {project.title}
        </h2>

        <p style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: '#475569',
          marginBottom: '24px',
        }}>
          {project.description}
        </p>

        <h4 style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#94A3B8',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Technologies Used
        </h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#475569',
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <section
        id="projects"
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
              Showroom
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px', lineHeight: 1.6 }}>
            A showcase of applications built with passion and precision
          </p>
        </motion.div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px',
          width: '100%',
          maxWidth: '1000px',
        }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
