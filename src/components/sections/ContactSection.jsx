import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with environment variables
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const contactLinks = [
  {
    label: 'Email',
    value: 'bonagirisakyath@gmail.com',
    href: 'mailto:bonagirisakyath@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: '#60A5FA',
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://www.linkedin.com/in/sakyathbonagiri',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#6EE7F9',
  },
  {
    label: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/Sakyath',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
    color: '#A78BFA',
  },
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitMessage('Please fill in all fields.')
      setTimeout(() => setSubmitMessage(''), 4000)
      return
    }

    setIsSubmitting(true)

    try {
      const templateParams = {
        to_email: import.meta.env.VITE_CONTACT_EMAIL,
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      )

      setSubmitMessage('✓ Message sent successfully! I\'ll get back to you soon.')
      setFormState({ name: '', email: '', message: '' })
      
      setTimeout(() => setSubmitMessage(''), 4000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitMessage('Failed to send message. Please try again or email directly.')
      setTimeout(() => setSubmitMessage(''), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: '16px',
    border: `1.5px solid ${focusedField === field ? '#60A5FA50' : 'rgba(255,255,255,0.35)'}`,
    background: focusedField === field ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    outline: 'none',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    color: '#0F172A',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    boxShadow: focusedField === field
      ? '0 0 0 3px rgba(96,165,250,0.08), 0 4px 16px rgba(96,165,250,0.06)'
      : 'none',
  })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '120px 5vw 80px',
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
            Contact
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
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p style={{ color: '#64748B', fontSize: '15px', lineHeight: 1.6 }}>
          Have a project in mind? Let's build something extraordinary together.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        width: '100%',
        maxWidth: '900px',
      }}>
        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass"
          style={{
            padding: 'clamp(24px, 3vw, 36px)',
            position: 'relative',
          }}
        >
          {/* Top gradient accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '24px',
            right: '24px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #60A5FA, #A78BFA, transparent)',
            opacity: 0.4,
          }} />

          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#0F172A',
            fontFamily: "'Space Grotesk', sans-serif",
            position: 'relative',
            zIndex: 2,
          }}>
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 2,
          }}>
            <div>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: '#94A3B8', marginBottom: '6px', letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                style={inputStyle('name')}
                data-hoverable
              />
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: '#94A3B8', marginBottom: '6px', letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                style={inputStyle('email')}
                data-hoverable
              />
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: '#94A3B8', marginBottom: '6px', letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Message
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell me about your project..."
                rows={4}
                style={{
                  ...inputStyle('message'),
                  resize: 'vertical',
                  minHeight: '100px',
                }}
                data-hoverable
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="glow-btn"
              data-hoverable
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '8px',
                padding: '16px',
                fontSize: '15px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>
              </svg>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  textAlign: 'center',
                  background: submitMessage.includes('✓') 
                    ? 'rgba(34,197,94,0.1)' 
                    : 'rgba(239,68,68,0.1)',
                  color: submitMessage.includes('✓') 
                    ? '#22c55e' 
                    : '#ef4444',
                  border: submitMessage.includes('✓')
                    ? '1px solid rgba(34,197,94,0.3)'
                    : '1px solid rgba(239,68,68,0.3)',
                }}
              >
                {submitMessage}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-hoverable
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '22px 24px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 8px 32px rgba(96,165,250,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${link.color}15, ${link.color}08)`,
                border: `1px solid ${link.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: link.color,
                flexShrink: 0,
              }}>
                {link.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0F172A',
                  marginBottom: '2px',
                }}>
                  {link.label}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#64748B',
                }}>
                  {link.value}
                </div>
              </div>
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ marginLeft: 'auto' }}
              >
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </motion.a>
          ))}

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{
              textAlign: 'center',
              marginTop: '24px',
              padding: '20px',
            }}
          >
            <p style={{
              fontSize: '13px',
              color: '#94A3B8',
              fontWeight: 400,
            }}>
              Designed & built by{' '}
              <span className="gradient-text" style={{
                fontWeight: 600,
                WebkitTextFillColor: 'transparent',
              }}>
                Sakyath Bonagiri
              </span>
            </p>
            <p style={{
              fontSize: '12px',
              color: '#CBD5E1',
              marginTop: '6px',
            }}>
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
