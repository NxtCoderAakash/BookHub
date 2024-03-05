import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedList: [], fetchState: stateConstants.initial}

  componentDidMount() {
    this.getTopRatedData()
    // this.scrollToTop()
  }

  getTopRatedData = async () => {
    this.setState({fetchState: stateConstants.loading})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const camelData = this.getCamelData(data.books)
      this.setState({
        topRatedList: camelData,
        fetchState: stateConstants.success,
      })
    } else {
      this.setState({fetchState: stateConstants.failure})
    }
  }

  getCamelData = bookList => {
    const formattedData = bookList.map(item => ({
      id: item.id,
      authorName: item.author_name,
      coverPic: item.cover_pic,
      title: item.title,
    }))
    return formattedData
  }

  renderSuccess = () => {
    const {topRatedList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {topRatedList.map(eachLogo => {
          const {id, coverPic, authorName, title} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link style={{textDecoration: 'none'}} to={`/books/${id}`}>
                <img className="cover-image" src={coverPic} alt={title} />
                <h1 className="title">{title}</h1>
                <p className="author">{authorName}</p>
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderFailure = () => (
    <div className="home-failure-bg-container">
      <div className="failure-card">
        <img
          src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675585072/Group_7522_zsq6z0.png"
          alt="failure view"
          className="home-failure-image"
        />
        <p className="failure-text">Something went wrong, Please try again.</p>
        <button
          type="button"
          onClick={this.getTopRatedData}
          className="try-again-button"
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

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  render() {
    return (
      <div className="centering-master-container">
        <div className="bg-container-home">
          <Header active="home" />
          <div className="home-body-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              type="button"
              onClick={this.onClickFindBooks}
              className="find-books-button mobile-view-button"
            >
              Find Books
            </button>

            <div className="top-rated-card">
              <div className="find-books-container">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <button
                  type="button"
                  onClick={this.onClickFindBooks}
                  className="find-books-button"
                >
                  Find Books
                </button>
              </div>
              <div className="fetch-container">{this.checkFetchStatus()}</div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
