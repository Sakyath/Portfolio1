import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ---- Floating Particles ---- */
function FloatingParticles({ count = 200 }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
        ],
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
        size: Math.random() * 0.04 + 0.01,
      })
    }
    return temp
  }, [count])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    particles.forEach((p, i) => {
      pos[i * 3] = p.position[0]
      pos[i * 3 + 1] = p.position[1]
      pos[i * 3 + 2] = p.position[2]
    })
    return pos
  }, [particles, count])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    particles.forEach((p, i) => {
      s[i] = p.size
    })
    return s
  }, [particles, count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.getElapsedTime()
    const posArr = meshRef.current.geometry.attributes.position.array

    particles.forEach((p, i) => {
      posArr[i * 3 + 1] = p.position[1] + Math.sin(time * p.speed + p.offset) * 1.5
      posArr[i * 3] = p.position[0] + Math.cos(time * p.speed * 0.5 + p.offset) * 0.5
    })

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60A5FA"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ---- Grid Floor ---- */
function GridFloor() {
  const gridRef = useRef()

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.3) % 2
    }
  })

  return (
    <group ref={gridRef} position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[80, 60, '#60A5FA', '#60A5FA']} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          attach="material"
          color="#60A5FA"
          transparent
          opacity={0.06}
        />
      </gridHelper>
    </group>
  )
}

/* ---- Floating Orb (Hero) ---- */
function HeroOrb() {
  const orbRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (orbRef.current) {
      orbRef.current.rotation.x = t * 0.2
      orbRef.current.rotation.y = t * 0.3
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[4, 1, -2]}>
        {/* Core orb */}
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[1.2, 3]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#A78BFA"
            emissive="#A78BFA"
            emissiveIntensity={0.5}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshBasicMaterial
            color="#6EE7F9"
            transparent
            opacity={0.04}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ---- Orbiting Ring ---- */
function OrbitRing({ radius = 3, speed = 0.5, color = '#60A5FA', yOffset = 0 }) {
  const ringRef = useRef()

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * speed
      ringRef.current.rotation.x = Math.PI / 3
    }
  })

  return (
    <mesh ref={ringRef} position={[4, 1 + yOffset, -2]}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  )
}

/* ---- Light Beams ---- */
function LightBeams() {
  const beamsRef = useRef()

  useFrame(({ clock }) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={beamsRef}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 15,
            8,
            Math.sin((i / 4) * Math.PI * 2) * 15 - 10,
          ]}
          rotation={[0, 0, (i / 4) * Math.PI * 2]}
        >
          <cylinderGeometry args={[0.02, 0.3, 20, 8]} />
          <meshBasicMaterial
            color={['#60A5FA', '#6EE7F9', '#A78BFA', '#60A5FA'][i]}
            transparent
            opacity={0.04}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---- Main Scene ---- */
export default function Scene3D({ scrollProgress = 0 }) {
  const groupRef = useRef()

  // Camera breathing + scroll movement
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()

    // Subtle breathing
    camera.position.x = Math.sin(t * 0.15) * 0.3
    camera.position.y = Math.cos(t * 0.1) * 0.2

    // Scroll-based depth
    camera.position.z = 12 - scrollProgress * 4

    // Group rotation based on scroll
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.15
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.4} color="#FFFFFF" />
      <pointLight position={[-5, 5, 5]} intensity={0.3} color="#60A5FA" />
      <pointLight position={[5, -5, -5]} intensity={0.2} color="#A78BFA" />

      {/* Fog */}
      <fog attach="fog" args={['#F0F4FF', 15, 50]} />

      <group ref={groupRef}>
        <FloatingParticles count={150} />
        <GridFloor />
        <HeroOrb />
        <OrbitRing radius={2.2} speed={0.3} color="#60A5FA" />
        <OrbitRing radius={2.8} speed={-0.2} color="#A78BFA" yOffset={0.2} />
        <OrbitRing radius={3.4} speed={0.15} color="#6EE7F9" yOffset={-0.1} />
        <LightBeams />
        <Stars
          radius={40}
          depth={60}
          count={1000}
          factor={2}
          saturation={0.2}
          fade
          speed={0.5}
        />
      </group>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}
