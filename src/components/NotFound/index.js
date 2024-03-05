import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="bg-container-page-not-found">
    <div className="not-found-card">
      <img
        src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675584720/Group_7484_xde9k1.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="notfound-main-heading">Page Not Found</h1>
      <p className="notfound-para">
        we are sorry, the page you requested could not be found,
      </p>
      <p className="notfound-para">Please go back to the homepage.</p>
      <Link to="/" style={{textdecoration: 'none'}}>
        <button type="button" className="not-found-go-back-button">
          Go Back to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
