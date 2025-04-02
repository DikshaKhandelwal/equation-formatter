import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Latex from 'react-latex-next'
import { FaDownload, FaCopy, FaFileExport } from 'react-icons/fa'
import { evaluateEquation } from '../utils/mathHelpers'
import html2canvas from 'html2canvas'

const ExportModal = ({ equation, isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(null);
  
  if (!isOpen) return null;
  
  const latexCode = `$$${equation}$$`;
  const htmlCode = `<span class="math-tex">${equation}</span>`;
  const markdownCode = `$${equation}$`;
  
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(type);
        setTimeout(() => setCopySuccess(null), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  const exportAsImage = () => {
    const equationElement = document.querySelector('.equation-display');
    if (!equationElement) return;
    
    html2canvas(equationElement).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'equation.png';
      link.click();
    });
  };
  
  return (
    <div className="export-modal-overlay" onClick={onClose}>
      <div className="export-modal" onClick={e => e.stopPropagation()}>
        <div className="export-modal-header">
          <h2>Export Equation</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="export-modal-content">
          <div className="export-options">
            <div className="export-option">
              <h3>LaTeX Format</h3>
              <p>Use in LaTeX documents or systems that support LaTeX math.</p>
              <div className="export-code">
                {latexCode}
                <button 
                  className="copy-button" 
                  onClick={() => copyToClipboard(latexCode, 'latex')}
                >
                  {copySuccess === 'latex' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="export-option">
              <h3>HTML Format</h3>
              <p>For websites using MathJax or KaTeX libraries.</p>
              <div className="export-code">
                {htmlCode}
                <button 
                  className="copy-button" 
                  onClick={() => copyToClipboard(htmlCode, 'html')}
                >
                  {copySuccess === 'html' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="export-option">
              <h3>Markdown Format</h3>
              <p>For Markdown documents that support math</p>
              <div className="export-code">
                {markdownCode}
                <button 
                  className="copy-button" 
                  onClick={() => copyToClipboard(markdownCode, 'markdown')}
                >
                  {copySuccess === 'markdown' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="export-option">
              <h3>Image Export</h3>
              <p>Save your equation as an image file.</p>
              <button 
                className="action-button"
                onClick={exportAsImage}
              >
                Download as PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EquationPreview = ({ equation, showConfetti }) => {
  const [evaluatedValue, setEvaluatedValue] = useState(null)
  const [isError, setIsError] = useState(false)
  const [copySuccess, setCopySuccess] = useState('')
  const [showExportModal, setShowExportModal] = useState(false)
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
      setEvaluatedValue(null)
      setIsError(false)
    }
  }, [equation])

  const confettiDots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`
  }))

  const copyToClipboard = () => {
    navigator.clipboard.writeText(equation)
      .then(() => {
        setCopySuccess('Copied!')
        setTimeout(() => setCopySuccess(''), 2000)
      })
      .catch(() => {
        setCopySuccess('Failed to copy')
      })
  }

  const downloadLatex = () => {
    const element = document.createElement('a')
    const latexContent = `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n$$${equation}$$\n\\end{document}`
    const file = new Blob([latexContent], { type: 'text/plain' })
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
          <motion.button
            className="action-button secondary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExportModal(true)}
            title="Export Equation"
          >
            <FaFileExport /> Export
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

      <ExportModal
        equation={equation}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </motion.div>
  )
}

export default EquationPreview