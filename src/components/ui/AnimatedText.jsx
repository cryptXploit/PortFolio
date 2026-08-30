import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo, useRef } from 'react'

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6 },
  },
  slide: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.5 },
  },
  bounce: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { scale: 0.8, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { duration: 0.4 },
  },
  zoom: {
    initial: { scale: 1.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
    transition: { duration: 0.5 },
  },
  written: {
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: { clipPath: 'inset(0 0% 0 0)' },
    exit: { clipPath: 'inset(0 100% 0 0)' },
    transition: { ease: 'linear' },
  },
}

const AnimatedText = ({
  text,
  settings = {},
  className = '',
  containerClassName = '',
  tag: Tag = 'h1',
}) => {
  // Try mapping both 'type' and 'animation' in case admin uses 'animation'
  const animType = settings.type || settings.animation || 'fade'
  const duration = settings.duration || 0.6
  const zoom = settings.zoom || 1
  const rotationDuration = settings.rotationDuration || 3
  
  const [index, setIndex] = useState(0)

  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const contentKey = useMemo(() => texts.join('|'), [texts])
  const currentText = texts[index]

  const intervalRef = useRef(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (texts.length > 1 && rotationDuration > 0) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % texts.length)
      }, rotationDuration * 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [contentKey, rotationDuration, texts.length])

  const anim = animations[animType] || animations.fade

  return (
    <div className={`inline-block ${containerClassName}`} style={{ transform: `scale(${zoom})` }}>
      <Tag className={className}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentText}
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.exit}
            transition={{ ...anim.transition, duration: duration }}
            style={{ 
              display: 'inline-block',
              whiteSpace: animType === 'written' ? 'nowrap' : 'normal',
              overflow: animType === 'written' ? 'hidden' : 'visible'
            }}
          >
            {currentText}
          </motion.span>
        </AnimatePresence>
      </Tag>
    </div>
  )
}

export default AnimatedText