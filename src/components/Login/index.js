import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onInputUsername = event => {
    this.setState({username: event.target.value})
  }

  onInputPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.getData()
  }

  getData = async () => {
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    if (response.ok) {
      const data = await response.json()
      Cookies.set('jwt_token', data.jwt_token, {expires: 50})
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const {errMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="centering-master-container">
        <div className="bg-container-login">
          <img
            src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675492601/BookHub/Rectangle_1467_ybp2mu.png"
            alt="website login"
            className="login-background-image"
          />

          <div className="login-background">
            <div className="login-card">
              <img
                src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675492601/BookHub/Rectangle_1467_ybp2mu.png"
                alt="website login"
                className="login-mobile-background-image"
              />
              <img
                className="logo-image"
                alt="login website logo"
                src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1675492675/BookHub/Group_7731_cj23w1.png"
              />
              <form onSubmit={this.onSubmitForm} className="input-form">
                <div className="username-container">
                  <label className="username-label" htmlFor="username">
                    Username*
                  </label>
                  <br />
                  <input
                    onChange={this.onInputUsername}
                    type="text"
                    className="input-username"
                    placeholder="Username"
                    id="username"
                  />
                </div>
                <div className="password-container">
                  <label className="username-label" htmlFor="password">
                    Password*
                  </label>
                  <br />
                  <input
                    onChange={this.onInputPassword}
                    type="password"
                    className="input-username"
                    placeholder="Password"
                    id="password"
                  />
                </div>
                <p className="error-msg">{errMsg}</p>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
