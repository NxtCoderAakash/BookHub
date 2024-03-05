import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelvesItem = props => {
  const {data} = props
  const {id, authorName, coverPic, rating, readStatus, title} = data

  return (
    <Link style={{textDecoration: 'none'}} to={`/books/${id}`}>
      <li className="shelve-item-container">
        <img src={coverPic} alt={title} className="book-image" />
        <div className="book-item-details-container">
          <h1 className="book-item-title">{title}</h1>
          <p className="book-item-author">{authorName}</p>
          <div className="item-rating-container">
            <p className="book-item-rating">
              Avg Rating <BsFillStarFill size={16} color="#FBBF24" />{' '}
            </p>
            <p className="item-rating-value"> {rating}</p>
          </div>
          <p className="book-item-status">
            Status :{' '}
            <span className="book-item-status-value">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookShelvesItem
