import { motion } from 'framer-motion' // eslint-disable-line
import { FaSun, FaMoon, FaLeaf, FaFire } from 'react-icons/fa'

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'light', name: 'Light', icon: <FaSun /> },
    { id: 'dark', name: 'Dark', icon: <FaMoon /> },
    { id: 'nature', name: 'Nature', icon: <FaLeaf /> },
    { id: 'sunset', name: 'Sunset', icon: <FaFire /> }
  ]

  return (
    <div className="theme-selector">
      <p>Theme:</p>
      <div className="theme-options">
        {themes.map(theme => (
          <motion.button
            key={theme.id}
            className={`theme-button ${currentTheme === theme.id ? 'active' : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onThemeChange(theme.id)}
          >
            {theme.icon}
            <span>{theme.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector