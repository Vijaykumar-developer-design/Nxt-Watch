import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {FaFire} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'
import AppThemeContext from '../context'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  empty: 'EMPTY_LIST',
}

class Trending extends Component {
  state = {
    apiState: '',
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiState: apiStatus.inProgress})
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedVideosList = data.videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      if (updatedVideosList.length === 0) {
        this.setState({apiState: apiStatus.empty})
      } else {
        // console.log(updatedVideosList)
        this.setState({
          videosList: updatedVideosList,
          apiState: apiStatus.success,
        })
      }
    } else {
      this.setState({apiState: apiStatus.failure})
    }
  }

  searchAgain = () => {
    this.getVideos()
  }

  renderSuccessView = () => (
    <AppThemeContext.Consumer>
      {value => {
        const {presentTheme} = value
        const {videosList} = this.state
        return (
          <div className={presentTheme ? '' : 'display-white'}>
            <div className="trend-head">
              <FaFire className="fire-icon-trend" size={40} />
              <h1>Trending</h1>
            </div>
            <ul className="videos-ul">
              {videosList.map(each => (
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
      }}
    </AppThemeContext.Consumer>
  )

  renderFailureView = () => (
    <div className="failure-bg">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={this.searchAgain} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-div">
      <Loader type="ThreeDots" height={50} width={50} color="#3b82f6" />
    </div>
  )

  renderResults = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatus.inProgress:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-bg">{this.renderResults()}</div>
  }
}
export default Trending
