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
      {/* Decorative particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${['#60A5FA', '#6EE7F9', '#A78BFA'][i % 3]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Logo text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        <div className="loading-text">Sakyath Bonagiri</div>
        <motion.p
          style={{
            color: '#64748B',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: '12px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Entering the universe
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="loading-bar-container">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p style={{
          textAlign: 'center',
          color: '#64748B',
          fontSize: '12px',
          marginTop: '12px',
          fontWeight: 500,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {Math.round(progress)}%
        </p>
      </motion.div>
    </motion.div>
  )
}
