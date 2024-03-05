import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import BookShelvesItem from '../BookShelvesItem'
import Header from '../Header'
import Footer from '../Footer'
import BookshelvesTypeItem from '../BookshelvesTypeItem'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    allReadList: [],
    searchInput: '',
    fetchState: stateConstants.initial,
    activeTab: 'ALL',
  }

  componentDidMount() {
    this.getBookshelvesData()
  }

  getBookshelvesData = async () => {
    const {searchInput, activeTab} = this.state
    this.setState({fetchState: stateConstants.loading})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchInput}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const camelData = this.getCamelData(data.books)
      this.setState({
        allReadList: camelData,
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
      readStatus: item.read_status,
      rating: item.rating,
    }))
    return formattedData
  }

  renderFailure = () => (
    <div className="bookshelves-failure-bg-container">
      <div className="failure-card">
        <img
          src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675585072/Group_7522_zsq6z0.png"
          alt="failure view"
          className="home-failure-image"
        />
        <p className="failure-text">Something went wrong, Please try again.</p>
        <button
          type="button"
          onClick={this.getBookshelvesData}
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

  renderSuccess = () => {
    const {allReadList, searchInput} = this.state

    if (allReadList.length === 0) {
      return (
        <div className="search-notfound-container">
          <img
            src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675583775/Asset_1_1_sjitwr.png"
            alt="no books"
            className="search-notfound-image"
          />
          <p className="search-notfound-para">
            Your search for {searchInput} did not find any matches.
          </p>
        </div>
      )
    }

    return (
      <>
        {allReadList.map(item => (
          <BookShelvesItem key={item.id} data={item} />
        ))}
      </>
    )
  }

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

  onInputSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBook = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.getBookshelvesData()
    }
  }

  onClickTypeParent = value => {
    this.setState({activeTab: value}, this.getBookshelvesData)
  }

  render() {
    const {activeTab} = this.state
    const requiredIndex = bookshelvesList.findIndex(
      item => item.value === activeTab,
    )
    const requiredHead = bookshelvesList[requiredIndex].label

    return (
      <div className="centering-master-container">
        <div className="bg-container-bookshelves">
          <Header active="bookshelves" />
          <div className="bg-container-bookshelves-card">
            <ul className="bookshelves-selection-container">
              <h1 className="filter-head">Bookshelves</h1>
              {bookshelvesList.map(item => (
                <BookshelvesTypeItem
                  key={item.id}
                  data={item}
                  onClickTypeParent={this.onClickTypeParent}
                  isActive={activeTab === item.value}
                />
              ))}
            </ul>
            <div className="right-container">
              <div className="search-container">
                <h1 className="all-books-heading">{requiredHead} Books</h1>
                <div className="input-container">
                  <input
                    className="search-element"
                    onChange={this.onInputSearch}
                    type="search"
                    placeholder="Search"
                  />
                  <button
                    testid="searchButton"
                    type="button"
                    className="search-button"
                    onClick={this.onSearchBook}
                  >
                    <BsSearch color="#94A3B8" />
                  </button>
                </div>
              </div>
              <h1 className="filter-head-mobile">Bookshelves</h1>
              <ul className="bookshelves-selection-container-mobile">
                {bookshelvesList.map(item => (
                  <BookshelvesTypeItem
                    key={item.id}
                    data={item}
                    onClickTypeParent={this.onClickTypeParent}
                    isActive={activeTab === item.value}
                  />
                ))}
              </ul>
              <ul className="result-container">{this.checkFetchStatus()}</ul>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
