import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.hoverable
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Animation loop
    let rafId
    const animate = () => {
      // Main cursor - fast follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.25
      pos.current.y += (mouse.current.y - pos.current.y) * 0.25

      // Trail - slower follow
      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.1
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.1

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`
      }

      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Trail glow */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          marginLeft: isHovering ? '-30px' : '-20px',
          marginTop: isHovering ? '-30px' : '-20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.15), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.4s cubic-bezier(0.34,1.56,0.64,1), height 0.4s cubic-bezier(0.34,1.56,0.64,1), margin 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          willChange: 'transform',
        }}
      />

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '16px' : '10px',
          height: isHovering ? '16px' : '10px',
          marginLeft: isHovering ? '-8px' : '-5px',
          marginTop: isHovering ? '-8px' : '-5px',
          borderRadius: '50%',
          background: isHovering
            ? 'linear-gradient(135deg, #60A5FA, #A78BFA)'
            : 'linear-gradient(135deg, #60A5FA, #6EE7F9)',
          boxShadow: isHovering
            ? '0 0 20px rgba(96,165,250,0.5), 0 0 40px rgba(167,139,250,0.3)'
            : '0 0 12px rgba(96,165,250,0.3)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), margin 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
