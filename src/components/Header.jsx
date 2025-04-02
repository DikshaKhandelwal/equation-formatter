import { FaSquareRootAlt } from 'react-icons/fa'
import { motion } from 'framer-motion' // eslint-disable-line

const Header = () => {
  return (
    <motion.header
      className="app-header"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="logo">
        <FaSquareRootAlt size={28} />
        <h1>MathMagic</h1>
      </div>
      <p className="tagline">Transform plain text into beautiful equations!</p>
    </motion.header>
  )
}

export default Header