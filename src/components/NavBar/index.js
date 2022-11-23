import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import AppThemeContext from '../context'
import './index.css'

const NavBar = () => (
  <AppThemeContext.Consumer>
    {value => {
      const {presentTheme} = value
      return (
        <div className={presentTheme ? '' : 'display-white-trend'}>
          <div className="nav-container">
            <ul className="nav-ul">
              <Link
                className={presentTheme ? 'link' : 'display-white-nav-head'}
                to="/"
              >
                <li className="nav-item">
                  <AiFillHome
                    className={presentTheme ? '' : 'change-icon-color'}
                    size={40}
                  />
                  <h1 className="home">Home</h1>
                </li>
              </Link>
              <Link
                className={presentTheme ? 'link' : 'display-white-nav-head'}
                to="/trending"
              >
                <li className="nav-item">
                  <FaFire
                    className={presentTheme ? '' : 'change-icon-color'}
                    size={40}
                  />
                  <h1 className="home">Trending</h1>
                </li>
              </Link>
              <Link
                className={presentTheme ? 'link' : 'display-white-nav-head'}
                to="/gaming"
              >
                <li className="nav-item">
                  <SiYoutubegaming
                    className={presentTheme ? '' : 'change-icon-color'}
                    size={40}
                  />
                  <h1 className="home">Gaming</h1>
                </li>
              </Link>
              <Link
                className={presentTheme ? 'link' : 'display-white-nav-head'}
                to="/saved-videos"
              >
                <li className="nav-item">
                  <BiListPlus
                    className={presentTheme ? '' : 'change-icon-color'}
                    size={40}
                  />
                  <h1 className="home">Saved Videos</h1>
                </li>
              </Link>
            </ul>

            <div className="social-container">
              <p>CONTACT US</p>
              <img
                className="social-img"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                alt="facebook logo"
              />
              <img
                className="social-img"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                alt="twitter logo"
              />
              <img
                className="social-img"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                alt="linked in logo"
              />
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </div>
        </div>
      )
    }}
  </AppThemeContext.Consumer>
)

export default NavBar
