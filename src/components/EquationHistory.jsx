import { motion } from 'framer-motion' // eslint-disable-line
import { FaHistory, FaArrowRight } from 'react-icons/fa'

const EquationHistory = ({ history, onSelect }) => {
  return (
    <motion.div 
      className="equation-history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="history-header">
        <FaHistory />
        <h3>Recent Equations</h3>
      </div>
      
      <div className="history-list">
        {history.map((eq, index) => (
          <motion.div
            key={index}
            className="history-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              backgroundColor: 'var(--accent-light)',
              x: 5 
            }}
            onClick={() => onSelect(eq)}
          >
            <span className="history-equation">{eq.length > 30 ? eq.substring(0, 30) + '...' : eq}</span>
            <FaArrowRight className="use-arrow" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default EquationHistory