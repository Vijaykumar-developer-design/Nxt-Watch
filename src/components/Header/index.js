import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Popup} from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {HiOutlineSun} from 'react-icons/hi'
import AppThemeContext from '../context'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <AppThemeContext.Consumer>
        {value => {
          const {presentTheme, updateTheme} = value
          const icon = presentTheme ? (
            <FaMoon size={35} />
          ) : (
            <HiOutlineSun size={35} color="#ffffff" />
          )
          const ChangeIcon = () => {
            updateTheme()
          }
          const webLogo = presentTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <div className={presentTheme ? '' : 'display-white-trend'}>
              <nav className="nav-bg">
                <Link to="/">
                  <img
                    className="header-logo"
                    src={webLogo}
                    alt="website logo"
                  />
                </Link>
                <ul className="header-ul">
                  <li className="list-item">
                    <button
                      data-testid="theme"
                      onClick={ChangeIcon}
                      className="theme-btn"
                      type="button"
                    >
                      {icon}
                    </button>
                  </li>
                  <li className="list-item">
                    <img
                      className="profile-img"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                    />
                  </li>
                  <li className="list-item">
                    <Popup
                      modal
                      trigger={
                        <button className="log-out-btn" type="button">
                          Logout
                        </button>
                      }
                    >
                      {close => (
                        <div className="logout-div">
                          <p>Are you sure, you want to logout</p>
                          <div className="pop-btn">
                            <button
                              className="cancel-btn"
                              onClick={() => close()}
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={this.onClickLogout}
                              className="confirm-btn"
                              type="button"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </li>
                </ul>
              </nav>
            </div>
          )
        }}
      </AppThemeContext.Consumer>
    )
  }
}
export default Header

//  <nav className="nav-bg">
//         <Link to="/">
//           <img
//             className="header-logo"
//             src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
//             alt="website logo"
//           />
//         </Link>
//         <ul className="header-ul">
//           <li className="list-item">
//             <FaMoon size={35} />
//           </li>
//           <li className="list-item">
//             <img
//               className="profile-img"
//               src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
//               alt="profile"
//             />
//           </li>
//           <li className="list-item">
//             <Popup
//               modal
//               trigger={
//                 <button className="log-out-btn" type="button">
//                   Logout
//                 </button>
//               }
//             >
//               {close => (
//                 <div className="logout-div">
//                   <p>Are you sure want to logout?</p>
//                   <div className="pop-btn">
//                     <button
//                       className="cancel-btn"
//                       onClick={() => close()}
//                       type="button"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={this.onClickLogout}
//                       className="confirm-btn"
//                       type="button"
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Popup>
//           </li>
//         </ul>
//       </nav>
