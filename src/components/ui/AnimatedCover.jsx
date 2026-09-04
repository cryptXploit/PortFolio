import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  },
  slide: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.6 },
  },
  bounce: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
  },
  scale: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.5 },
  },
  rotate: {
    initial: { rotate: -5, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 5, opacity: 0 },
    transition: { duration: 0.6 },
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { duration: 0.6 },
  },
  zoom: {
    initial: { scale: 1.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
    transition: { duration: 0.4 },
  },
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.5 },
  },
  slideDown: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { duration: 0.5 },
  },
  slideLeft: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.5 },
  },
  slideRight: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.5 },
  },
  pulse: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4, repeat: Infinity, repeatType: 'reverse' } },
    exit: { scale: 0.95, opacity: 0 },
  },
  swing: {
    initial: { rotate: -3, opacity: 0 },
    animate: { rotate: 3, opacity: 1, transition: { duration: 0.4, repeat: Infinity, repeatType: 'reverse' } },
    exit: { rotate: -3, opacity: 0 },
  },
  wobble: {
    initial: { x: -5, opacity: 0 },
    animate: { x: 5, opacity: 1, transition: { duration: 0.4, repeat: Infinity, repeatType: 'reverse' } },
    exit: { x: -5, opacity: 0 },
  },
  flash: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, repeat: Infinity, repeatType: 'reverse' } },
    exit: { opacity: 0 },
  },
  shake: {
    initial: { x: 0 },
    animate: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5, repeat: Infinity } },
    exit: { x: 0 },
  },
}

const AnimatedCover = ({ pictures = [], settings = {}, overlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { type = 'fade', duration = 3, delay = 0, zoom = 1 } = settings

  const anim = animations[type] || animations.fade

  useEffect(() => {
    if (pictures.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pictures.length)
    }, duration * 1000)
    return () => clearInterval(interval)
  }, [duration, pictures.length])

  const picture = pictures[currentIndex]?.url || pictures[0]?.url

  if (!picture) return null

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden select-none" 
      style={{ transform: `scale(${zoom})` }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={picture}
          className="absolute inset-0"
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={{ ...anim.transition, delay }}
        >
          <img 
            src={picture} 
            alt="Cover" 
            draggable="false"
            className="w-full h-full object-cover pointer-events-none" 
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Security Overlay / Darken Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-10 pointer-events-none" />}
      
      {/* Invisible layer to catch right clicks specifically without affecting layout */}
      <div className="absolute inset-0 z-20 bg-transparent" aria-hidden="true" />
    </div>
  )
}

export default AnimatedCover