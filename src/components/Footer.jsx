import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>Created by Diksha Khandelwal</p>
        <a 
          href="https://github.com/DikshaKhandelwal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FaGithub /> GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
