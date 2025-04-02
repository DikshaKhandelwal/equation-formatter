import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaQuestionCircle, FaTimes } from 'react-icons/fa'
import Latex from 'react-latex-next'
import { getLatexGuide } from '../utils/mathHelpers'

const LatexGuide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const latexGuide = getLatexGuide()

  return (
    <>
      <button className="guide-button" onClick={() => setIsOpen(true)}>
        <FaQuestionCircle /> LaTeX Syntax Guide
      </button>

      {isOpen && (
        <div className="guide-modal-overlay">
          <div className="guide-modal">
            <div className="guide-header">
              <h2>LaTeX Syntax Guide</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="guide-content">
              <div className="guide-intro">
                LaTeX is a powerful way to write mathematical equations. Here are some common
                syntaxes to help you get started:
              </div>

              <div className="guide-table">
                <div className="guide-table-header">
                  <div>Syntax</div>
                  <div>Description</div>
                  <div>Example</div>
                  <div>Result</div>
                </div>
                <div className="guide-table-body">
                  {latexGuide.map((item, index) => (
                    <div key={index} className="guide-table-row">
                      <div><code>{item.syntax}</code></div>
                      <div>{item.description}</div>
                      <div><code>{item.example}</code></div>
                      <div><Latex>{`$${item.example}$`}</Latex></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LatexGuide