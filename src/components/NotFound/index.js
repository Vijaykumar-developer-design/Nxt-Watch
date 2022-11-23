import AppThemeContext from '../context'
import './index.css'

const NotFound = () => (
  <AppThemeContext.Consumer>
    {value => {
      const {presentTheme} = value
      const url = presentTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div className="not-bg">
          <img className="not-img" src={url} alt="not found" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      )
    }}
  </AppThemeContext.Consumer>
)
export default NotFound
