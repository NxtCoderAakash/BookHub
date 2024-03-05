import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="bg-container-footer">
    <div className="social-icon-container">
      <FaGoogle size={18} />
      <FaTwitter size={18} />
      <FaInstagram size={18} />
      <FaYoutube size={18} />
    </div>
    <p className="contact-us-para">Contact us</p>
  </div>
)

export default Footer
