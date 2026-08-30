import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  },
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: { duration: 0.5 },
  },
  zoom: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.5 },
  },
}

const MediaCarousel = ({ mediaUrls, mediaTypes, duration = 3, animation = 'fade', autoPlay = true, autoPlayVideo = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || mediaUrls.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaUrls.length)
    }, duration * 1000)
    return () => clearInterval(interval)
  }, [duration, mediaUrls.length, autoPlay])

  const next = () => setCurrentIndex((prev) => (prev + 1) % mediaUrls.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length)

  const currentMedia = mediaUrls[currentIndex]
  const currentType = mediaTypes[currentIndex]

  if (mediaUrls.length === 0) return null

  return (
    <div className="relative group">
      <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            {...animations[animation] || animations.fade}
            className="w-full h-full"
          >
            {currentType === 'image' ? (
              <img src={currentMedia} alt="Project media" className="w-full h-full object-cover" />
            ) : (
              (() => {
                const getYoutubeId = (url) => {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
                  const match = url.match(regExp)
                  return match && match[2].length === 11 ? match[2] : null
                }
                const ytId = getYoutubeId(currentMedia)
                
                if (ytId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=${autoPlayVideo ? 1 : 0}&mute=1&loop=1&playlist=${ytId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-cover pointer-events-auto"
                    ></iframe>
                  )
                }
                
                return <video src={currentMedia} controls={!autoPlayVideo} autoPlay={autoPlayVideo} muted loop playsInline className="w-full h-full object-cover" />
              })()
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {mediaUrls.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {mediaUrls.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MediaCarousel