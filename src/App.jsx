import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import EquationInput from './components/EquationInput'
import EquationPreview from './components/EquationPreview'
import ThemeSelector from './components/ThemeSelector'
import EquationHistory from './components/EquationHistory'
import LatexGuide from './components/LatexGuide'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  const [equation, setEquation] = useState('f(x) = \\int_{0}^{x} \\sqrt{t} \\, dt')
  const [history, setHistory] = useState([])
  const [theme, setTheme] = useState('light')
  const [showConfetti, setShowConfetti] = useState(false)
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const addToHistory = (eq) => {
    if (eq.trim() !== '' && !history.includes(eq)) {
      setHistory(prev => [eq, ...prev].slice(0, 10))
    }
  }
  
  const handleEquationChange = (newEquation) => {
    setEquation(newEquation)
  }
  
  const handleEquationSubmit = () => {
    addToHistory(equation)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }
  
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    document.body.className = newTheme
  }
  
  useEffect(() => {
    document.body.className = theme
  }, [])

  return (
    <div className={`app ${theme}`}>
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header />
        
        <motion.main 
          className="content"
          variants={itemVariants}
        >
          <div className="equation-tools">
            <div className="tools-row">
              <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
              <LatexGuide />
            </div>
            <EquationInput 
              value={equation} 
              onChange={handleEquationChange} 
              onSubmit={handleEquationSubmit}
            />
          </div>
          
          <motion.div variants={itemVariants}>
            <EquationPreview 
              equation={equation} 
              showConfetti={showConfetti}
            />
          </motion.div>
          
          {history.length > 0 && (
            <motion.div variants={itemVariants}>
              <EquationHistory 
                history={history} 
                onSelect={setEquation}
              />
            </motion.div>
          )}
        </motion.main>

        <Footer />
      </motion.div>
    </div>
  )
}

export default App