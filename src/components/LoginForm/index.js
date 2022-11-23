import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginBtnEl from './StyledComponents'
import './index.css'

class Login extends Component {
  state = {
    showPassword: false,
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = error => {
    this.setState({showError: true, errorMsg: error})
  }

  getUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showPassword, username, password, errorMsg, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <form onSubmit={this.getUserDetails} className="login-card-bg">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <div className="input-div">
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              onChange={this.updateUsername}
              placeholder="Username"
              className="input-text"
              type="text"
              id="username"
            />
          </div>
          <div className="input-div">
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              onChange={this.updatePassword}
              placeholder="Password"
              className="input-text"
              type={showPassword ? 'text' : 'password'}
              id="password"
            />
          </div>
          <div className="check-box-div">
            <input
              onChange={this.onClickShowPassword}
              placeholder="Password"
              className="input-checkbox"
              type="checkbox"
              id="check"
            />
            <label htmlFor="check">
              <b>Show Password</b>
            </label>
          </div>
          <LoginBtnEl type="submit">Login</LoginBtnEl>
          {showError && <p className="error-msg">* {errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
