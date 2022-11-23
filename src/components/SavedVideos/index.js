import {Component} from 'react'
import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import {BiListPlus} from 'react-icons/bi'

import './index.css'
import AppThemeContext from '../context'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  empty: 'EMPTY_LIST',
}

class SavedVideos extends Component {
  state = {
    apiState: '',
  }

  renderSuccessView = () => (
    <AppThemeContext.Consumer>
      {value => {
        const {presentTheme, savedVideosList} = value
        console.log(savedVideosList)

        const renderSuccess = () => (
          <div className={presentTheme ? '' : 'display-white'}>
            <div className="trend-head">
              <BiListPlus className="fire-icon-trend" size={40} />
              <h1>Saved Videos</h1>
            </div>

            <ul className="videos-ul">
              {savedVideosList.map(each => (
                <Link
                  key={each.id}
                  className="link-video"
                  to={`/videos/${each.id}`}
                >
                  <li className="list-video-trend">
                    <img
                      className="video-img-trend"
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <div className="video-lower-trend">
                      <p>{each.title}</p>
                      <p>{each.name}</p>
                      <p>
                        {each.viewCount} * views{'  '}
                        {formatDistanceToNow(new Date(each.publishedAt))}
                      </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )

        const renderFailureView = () => (
          <div className="failure-bg">
            <img
              className="failure-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
          </div>
        )

        const condition =
          savedVideosList.length === 0 ? renderFailureView() : renderSuccess()
        return condition
      }}
    </AppThemeContext.Consumer>
  )

  renderResults = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-bg">{this.renderSuccessView()}</div>
  }
}
export default SavedVideos
