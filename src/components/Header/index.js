import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
// import Popup from 'reactjs-popup'

import './index.css'

class Header extends Component {
  state = {menu: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickMenu = () => {
    this.setState(prevState => ({menu: !prevState.menu}))
  }

  render() {
    const {active} = this.props
    const {menu} = this.state
    return (
      <>
        <nav className="bg-container-header">
          <Link style={{textDecoration: 'none'}} to="/">
            <img
              src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675492675/BookHub/Group_7731_cj23w1.png"
              alt="website logo"
              className="logo-image-header"
            />
          </Link>
          <button
            onClick={this.onClickMenu}
            type="button"
            className="trigger-button"
          >
            <GiHamburgerMenu />
          </button>

          <ul className="tab-container">
            <Link style={{textDecoration: 'none'}} to="/">
              <li className={`${active === 'home' ? 'active-tab' : 'tab'}`}>
                Home
              </li>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/shelf">
              <li
                className={`${active === 'bookshelves' ? 'active-tab' : 'tab'}`}
              >
                Bookshelves
              </li>
            </Link>
            <button
              onClick={this.onClickLogout}
              type="button"
              className="logout-button"
            >
              Logout
            </button>
          </ul>
        </nav>
        {menu && (
          <nav className="bg-container-header">
            <ul className="tab-container-mobile-view">
              <Link style={{textDecoration: 'none'}} to="/">
                <li className={`${active === 'home' ? 'active-tab' : 'tab'}`}>
                  Home
                </li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/shelf">
                <li
                  className={`${
                    active === 'bookshelves' ? 'active-tab' : 'tab'
                  }`}
                >
                  Bookshelves
                </li>
              </Link>
              <button
                onClick={this.onClickLogout}
                type="button"
                className="logout-button"
              >
                Logout
              </button>
              <button
                type="button"
                className="close-button"
                onClick={this.onClickMenu}
              >
                <AiFillCloseCircle />
              </button>
            </ul>
          </nav>
        )}
      </>
    )
  }
}

export default withRouter(Header)
