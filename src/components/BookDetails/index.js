import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {bookDetail: {}, fetchState: stateConstants.initial}

  componentDidMount() {
    this.getBookDetailsData()
  }

  getBookDetailsData = async () => {
    this.setState({fetchState: stateConstants.loading})

    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }

    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${id}`,
      options,
    )

    if (response.ok) {
      const data = await response.json()
      const camelData = this.getCamelData(data.book_details)
      console.log(camelData)
      this.setState({
        bookDetail: camelData,
        fetchState: stateConstants.success,
      })
    } else {
      this.setState({fetchState: stateConstants.failure})
    }
  }

  getCamelData = bookDetails => {
    const formattedData = {
      id: bookDetails.id,
      authorName: bookDetails.author_name,
      coverPic: bookDetails.cover_pic,
      title: bookDetails.title,
      rating: bookDetails.rating,
      readStatus: bookDetails.read_status,
      aboutAuthor: bookDetails.about_author,
      aboutBook: bookDetails.about_book,
    }
    return formattedData
  }

  renderFailure = () => (
    <div className="book-detail-failure-bg-container">
      <div className="failure-card">
        <img
          src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675585072/Group_7522_zsq6z0.png"
          alt="failure view"
          className="book-detail-failure-image"
        />
        <p className="book-detail-text">
          Something went wrong, Please try again.
        </p>
        <button
          type="button"
          onClick={this.getBookDetailsData}
          className="book-detail-try-again-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  checkFetchStatus = () => {
    const {fetchState} = this.state
    switch (fetchState) {
      case 'INITIAL':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'LOADING':
        return this.renderLoading()
      default:
        return this.renderFailure()
    }
  }

  renderSuccess = () => {
    const {bookDetail} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetail

    return (
      <div className="book-details-card">
        <div className="image-container-bookDetails">
          <img src={coverPic} alt={title} className="book-detail-image" />
          <div className="book-details-text-container">
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author">{authorName}</p>
            <div className="rating-container">
              <p className="book-details-rating">
                Avg Rating <BsFillStarFill size={18} color="#FBBF24" />{' '}
              </p>
              <p className="rating-value"> {rating}</p>
            </div>
            <p className="book-details-status">
              Status: <span className="status-value">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="horizontal-rule" />
        <div className="book-description-container">
          <h1 className="about-author-heading">About Author</h1>
          <p className="about-author-para">{aboutAuthor}</p>
          <h1 className="about-author-heading">About Book</h1>
          <p className="about-author-para">{aboutBook}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="centering-master-container">
        <div className="bg-container-book-details">
          <Header />
          {this.checkFetchStatus()}
          <Footer />
        </div>
      </div>
    )
  }
}
export default BookDetails
