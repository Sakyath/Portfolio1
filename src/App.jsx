import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Scene3D from './components/3d/Scene3D'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import Navbar from './components/ui/Navbar'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)

  // Lenis smooth scroll
  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ({ progress }) => {
      setScrollProgress(progress)
    })

    return () => lenis.destroy()
  }, [loading])

  // Simulated loading
  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 12 + 3
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => setLoading(false), 600)
      }
      setProgress(Math.min(p, 100))
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 3D Canvas - Fixed background */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
          }}>
            <Canvas
              camera={{ position: [0, 0, 12], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
              }}
              style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F4FF 40%, #E8EFFF 100%)' }}
            >
              <Suspense fallback={null}>
                <Scene3D scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>

          {/* HTML UI Overlay */}
          <div ref={containerRef} style={{ position: 'relative', zIndex: 1 }}>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </>
      )}
    </>
  )
}
