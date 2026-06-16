import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import portImage from '../../assets/port.jpeg'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Find active section with improved detection
      const sections = navItems.map(item => ({
        id: item.href.slice(1),
        label: item.label,
      }))

      let currentActive = 'Home'
      
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Check if section is in the upper half of viewport
          if (rect.top <= window.innerHeight / 2) {
            currentActive = sections[i].label
          } else {
            break
          }
        }
      }
      
      setActive(currentActive)
    }

    window.addEventListener('scroll', handleScroll)
    // Call once on mount to set initial state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          padding: '12px 28px',
          borderRadius: '30px',
          background: scrolled ? 'rgba(255,255,255,0.70)' : 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(48px)',
          WebkitBackdropFilter: 'blur(48px)',
          border: `1.5px solid ${scrolled ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.42)'}`,
          boxShadow: scrolled
            ? '0 28px 90px rgba(96,165,250,0.15), inset 0 1px 0 rgba(255,255,255,0.75)'
            : '0 16px 64px rgba(96,165,250,0.10), inset 0 1px 0 rgba(255,255,255,0.65)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          backdropFilter: scrolled ? 'blur(48px)' : 'blur(42px)',
        }}
      >
        {/* Logo Image */}
   <img
  src={portImage}
  alt="Sakyath Bonagiri"
  style={{
    width: window.innerWidth <= 768 ? '42px' : '50px',
    height: window.innerWidth <= 768 ? '42px' : '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: window.innerWidth <= 768 ? '8px' : '16px',
    border: '2px solid rgba(96, 165, 250, 0.35)',
    boxShadow: '0 8px 24px rgba(96, 165, 250, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
    flexShrink: 0,
    display: 'block',
    transition: 'all 0.3s ease',
  }}
/>
        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '4px' }} className="nav-desktop">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              data-hoverable
              style={{
                position: 'relative',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600',
                color: active === item.label ? '#0F172A' : '#64748B',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                background: active === item.label ? 'rgba(96,165,250,0.12)' : 'transparent',
                backdropFilter: active === item.label ? 'blur(12px)' : 'none',
              }}
            >
              {item.label}
              {active === item.label && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '3px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '2.5px',
                    borderRadius: '1.5px',
                    background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)',
                    boxShadow: '0 0 12px rgba(96, 165, 250, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          data-hoverable
          className="nav-mobile-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: '8px',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ width: '20px', height: '2px', background: '#0F172A', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ width: '20px', height: '2px', background: '#0F172A', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: '20px', height: '2px', background: '#0F172A', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '16px',
              right: '16px',
              zIndex: 99,
              padding: '18px',
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.70)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1.5px solid rgba(255,255,255,0.50)',
              boxShadow: '0 28px 90px rgba(96,165,250,0.15), inset 0 1px 0 rgba(255,255,255,0.75)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: active === item.label ? '#0F172A' : '#64748B',
                  textDecoration: 'none',
                  background: active === item.label ? 'rgba(96,165,250,0.08)' : 'transparent',
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
