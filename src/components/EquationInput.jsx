import { useState } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line
import { FaPlay, FaLightbulb } from 'react-icons/fa'

const EquationInput = ({ value, onChange, onSubmit }) => {
  const [showHints, setShowHints] = useState(false)
  
  const examples = [
    'E = mc^2',
    'F = G\\frac{m_1 m_2}{r^2}',
    '\\sum_{i=0}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}',
    'e^{i\\pi} + 1 = 0',
    '\\frac{d}{dx}[\\sin(x)] = \\cos(x)'
  ]
  
  const handleExampleClick = (example) => {
    onChange(example)
    setShowHints(false)
  }

  return (
    <motion.div 
      className="equation-input-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="input-header">
        <h2>Enter your equation:</h2>
        <motion.button 
          className="hint-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowHints(!showHints)}
        >
          <FaLightbulb /> {showHints ? 'Hide' : 'Show'} examples
        </motion.button>
      </div>
      
      {showHints && (
        <motion.div 
          className="examples-container"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <p>Click an example to use it:</p>
          <div className="examples-grid">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                className="example-button"
                whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-light)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
      
      <div className="input-group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your LaTeX equation here (e.g., E = mc^2)"
          rows={4}
        />
        <motion.button
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
        >
          <FaPlay /> Format
        </motion.button>
      </div>
      
      <div className="input-tip">
        <p>Use LaTeX syntax for complex equations. Surround expressions with \ characters.</p>
      </div>
    </motion.div>
  )
}

export default EquationInput