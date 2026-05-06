import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import portImage from '../../assets/port.jpeg'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
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

      // Find active section
      const sections = navItems.map(item => ({
        id: item.href.slice(1),
        label: item.label,
      }))

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i].label)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
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
          padding: '12px 24px',
          borderRadius: '20px',
          background: scrolled ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)'}`,
          boxShadow: scrolled
            ? '0 8px 32px rgba(96,165,250,0.1), 0 0 0 1px rgba(255,255,255,0.2)'
            : '0 4px 16px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo Image - Replace /images/logo.png with your own */}
   <img
  src={portImage}
  alt="Sakyath Bonagiri"
  style={{
    width: window.innerWidth <= 768 ? '42px' : '50px',
    height: window.innerWidth <= 768 ? '42px' : '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: window.innerWidth <= 768 ? '8px' : '12px',
    border: '2px solid rgba(96,165,250,0.25)',
    boxShadow: '0 4px 12px rgba(96,165,250,0.15)',
    flexShrink: 0,
    display: 'block',
  }}
/>
        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2px' }} className="nav-desktop">
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
                fontWeight: 500,
                color: active === item.label ? '#0F172A' : '#64748B',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                background: active === item.label ? 'rgba(96,165,250,0.08)' : 'transparent',
              }}
            >
              {item.label}
              {active === item.label && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '3px',
                    borderRadius: '2px',
                    background: 'linear-gradient(90deg, #60A5FA, #A78BFA)',
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
              padding: '16px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 12px 48px rgba(96,165,250,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
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
