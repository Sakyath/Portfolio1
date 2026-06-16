import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ progress }) {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Premium background with gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 40%, #EFF6FF 100%)',
        zIndex: 0,
      }} />

      {/* Decorative floating particles with glass effect */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              borderRadius: '50%',
              background: [
                `linear-gradient(135deg, #60A5FA, rgba(96, 165, 250, 0.3))`,
                `linear-gradient(135deg, #6EE7F9, rgba(110, 231, 249, 0.3))`,
                `linear-gradient(135deg, #A78BFA, rgba(167, 139, 250, 0.3))`,
              ][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backdropFilter: 'blur(8px)',
              boxShadow: [
                '0 0 12px rgba(96, 165, 250, 0.4)',
                '0 0 12px rgba(110, 231, 249, 0.4)',
                '0 0 12px rgba(167, 139, 250, 0.4)',
              ][i % 3],
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Premium glass logo card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        {/* Glass container for logo */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1.5px solid rgba(255, 255, 255, 0.45)',
          borderRadius: '32px',
          padding: '40px 60px',
          boxShadow: '0 28px 90px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(255,255,255,0.75)',
          marginBottom: '40px',
        }}>
          <div className="loading-text">
            Sakyath Bonagiri
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{
            color: '#64748B',
            fontSize: 'clamp(13px, 2vw, 15px)',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Entering the universe
        </motion.p>
      </motion.div>

      {/* Premium progress bar with glass effect */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'clamp(200px, 50vw, 320px)',
        }}
      >
        {/* Glass container for progress */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 12px 48px rgba(96, 165, 250, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}>
          <div className="loading-bar-container" style={{
            background: 'rgba(96, 165, 250, 0.1)',
            borderRadius: '4px',
            height: '3px',
            overflow: 'hidden',
            marginBottom: '12px',
          }}>
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p style={{
            textAlign: 'center',
            color: '#64748B',
            fontSize: '12px',
            margin: '0',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {Math.round(progress)}%
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
