import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Latex from 'react-latex-next'
import { FaDownload, FaCopy, FaInfo } from 'react-icons/fa'
import { evaluateEquation } from '../utils/mathHelpers'

const EquationPreview = ({ equation, showConfetti }) => {
  const [evaluatedValue, setEvaluatedValue] = useState(null)
  const [isError, setIsError] = useState(false)
  const [copySuccess, setCopySuccess] = useState('')
  const previewRef = useRef(null)
  
  useEffect(() => {
    try {
      if (!equation.trim()) {
        setEvaluatedValue(null)
        setIsError(false)
        return
      }
      
      const result = evaluateEquation(equation)
      setEvaluatedValue(result)
      setIsError(false)
    } catch (error) {
      // If not evaluatable, just show the formatted equation
      setEvaluatedValue(null)
      setIsError(false)
    }
  }, [equation])
  
  // Generate confetti dots
  const confettiDots = Array.from({ length: 50 }, (_, i) => ({ 
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`
  }))

  // Function to copy LaTeX to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(equation)
      .then(() => {
        setCopySuccess('Copied!')
        setTimeout(() => setCopySuccess(''), 2000)
      })
      .catch(err => {
        setCopySuccess('Failed to copy')
      })
  }

  // Function to download as LaTeX file
  const downloadLatex = () => {
    const element = document.createElement('a')
    const latexContent = `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n$$${equation}$$\n\\end{document}`
    const file = new Blob([latexContent], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'equation.tex'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.div 
      className="equation-preview"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="preview-header">
        <h2>Preview</h2>
        <div className="preview-actions">
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            title="Copy LaTeX"
          >
            <FaCopy /> 
            {copySuccess ? copySuccess : 'Copy'}
          </motion.button>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadLatex}
            title="Download LaTeX file"
          >
            <FaDownload /> Download
          </motion.button>
        </div>
      </div>
      
      <div className="preview-container" ref={previewRef}>
        {showConfetti && (
          <div className="confetti-container">
            {confettiDots.map(dot => (
              <motion.div
                key={dot.id}
                className="confetti-dot"
                initial={{ 
                  x: `50%`, 
                  y: `50%`,
                  opacity: 1 
                }}
                animate={{ 
                  x: `${dot.x}%`, 
                  y: `${dot.y}%`,
                  opacity: 0 
                }}
                transition={{ duration: 1.5 }}
                style={{ 
                  width: `${dot.size}px`, 
                  height: `${dot.size}px`, 
                  backgroundColor: dot.color 
                }}
              />
            ))}
          </div>
        )}
        
        <div className="equation-display">
          <Latex>{`$$${equation}$$`}</Latex>
        </div>
        
        {evaluatedValue !== null && !isError && (
          <motion.div 
            className="equation-evaluation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Evaluated: <span>{evaluatedValue?.toString()}</span></p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default EquationPreview