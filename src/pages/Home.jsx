import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Contact from '../components/sections/Contact'
import Testimonials from '../components/sections/Testimonials' // optional

const Home = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </>
  )
}

export default Home