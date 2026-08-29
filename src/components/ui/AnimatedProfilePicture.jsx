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
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.5 },
  },
  bounce: {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 },
    transition: { type: 'spring', bounce: 0.4, duration: 0.6 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.5 },
  },
  rotate: {
    initial: { rotate: -10, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 10, opacity: 0 },
    transition: { duration: 0.5 },
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { duration: 0.6 },
  },
  zoom: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
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
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4, repeat: Infinity, repeatType: 'reverse' } },
    exit: { scale: 0.9, opacity: 0 },
  },
  swing: {
    initial: { rotate: -5, opacity: 0 },
    animate: { rotate: 5, opacity: 1, transition: { duration: 0.4, repeat: Infinity, repeatType: 'reverse' } },
    exit: { rotate: -5, opacity: 0 },
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

const AnimatedProfilePicture = ({ pictures = [], settings = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const {
    type = 'fade',
    duration = 3,
    delay = 0,
    direction = 'normal',
    zoom = 1,
  } = settings

  const anim = animations[type] || animations.fade

  // Cycle through pictures if more than one
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
    <div className="relative inline-block" style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={picture}
          src={picture}
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-35 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={{ ...anim.transition, delay }}
        />
      </AnimatePresence>
    </div>
  )
}

export default AnimatedProfilePicture