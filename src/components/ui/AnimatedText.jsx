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
    initial: { width: 0, opacity: 0 },
    animate: { width: '100%', opacity: 1 },
    exit: { width: 0, opacity: 0 },
    transition: { duration: 1, ease: 'easeInOut' },
  },
}

const AnimatedText = ({
  text,
  settings = {},
  className = '',
  containerClassName = '',
  tag: Tag = 'h1',
}) => {
  const { type = 'fade', duration = 0.6, zoom = 1, rotationDuration = 3 } = settings
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

  const anim = animations[type] || animations.fade

  // Use containerClassName to enforce a fixed height if needed
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
            style={{ display: 'inline-block' }}
          >
            {currentText}
          </motion.span>
        </AnimatePresence>
      </Tag>
    </div>
  )
}

export default AnimatedText