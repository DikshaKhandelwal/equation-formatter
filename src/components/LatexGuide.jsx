import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuestionCircle, FaTimes } from 'react-icons/fa'
import Latex from 'react-latex-next'
import { getLatexGuide } from '../utils/mathHelpers'

const LatexGuide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const latexGuide = getLatexGuide()

  return (
    <div className="latex-guide-container">
      <motion.button
        className="guide-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <FaQuestionCircle /> LaTeX Syntax Guide
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="guide-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="guide-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="guide-header">
                <h2>LaTeX Syntax Guide for Beginners</h2>
                <button
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="guide-content">
                <p className="guide-intro">
                  LaTeX is a powerful way to write mathematical equations. Here are some common
                  syntaxes to help you get started:
                </p>

                <div className="guide-table">
                  <div className="guide-table-header">
                    <div className="syntax-column">Syntax</div>
                    <div className="description-column">Description</div>
                    <div className="example-column">Example</div>
                    <div className="result-column">Result</div>
                  </div>
                  
                  <div className="guide-table-body">
                    {latexGuide.map((item, index) => (
                      <div className="guide-table-row" key={index}>
                        <div className="syntax-column"><code>{item.syntax}</code></div>
                        <div className="description-column">{item.description}</div>
                        <div className="example-column"><code>{item.example}</code></div>
                        <div className="result-column">
                          <Latex>{`$${item.example}$`}</Latex>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="guide-tips">
                  <h3>Tips for Writing Equations:</h3>
                  <ul>
                    <li>Use curly braces <code>{'{}'}</code> to group expressions</li>
                    <li>For complex fractions, use <code>\frac{numerator}{denominator}</code></li>
                    <li>For multiple characters in superscript or subscript, use braces: <code>x^{2+y}</code></li>
                    <li>Use <code>\left(</code> and <code>\right)</code> for automatically sized parentheses</li>
                    <li>For spaces, use <code>\,</code> (small), <code>\;</code> (medium), or <code>\quad</code> (large)</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LatexGuide