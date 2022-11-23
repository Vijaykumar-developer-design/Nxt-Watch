import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {BsX} from 'react-icons/bs'
import {BiSearch} from 'react-icons/bi'
import AppThemeContext from '../context'
import './index.css'
import {BannerDiv, BannerInnerDiv} from './styledComponent'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  empty: 'EMPTY_LIST',
}

class Home extends Component {
  state = {
    hide: false,
    userSearch: '',
    apiState: '',
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiState: apiStatus.inProgress})
    const token = Cookies.get('jwt_token')
    const {userSearch} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${userSearch}`
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

  updateUserSearch = event => {
    this.setState({userSearch: event.target.value})
  }

  hideBanner = () => {
    this.setState({hide: true})
  }

  searchUserInput = () => {
    this.getVideos()
  }

  renderBanner = () => {
    const {hide} = this.state
    return (
      <BannerDiv data-testid="banner" hide={hide}>
        <BannerInnerDiv>
          <img
            className="banner-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <button
            data-testid="close"
            onClick={this.hideBanner}
            className="cancel"
            type="button"
          >
            <BsX size={30} />
          </button>
        </BannerInnerDiv>
        <p className="para">Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button className="get-btn" type="button">
          GET IT NOW
        </button>
      </BannerDiv>
    )
  }

  renderSuccessView = () => {
    const {videosList} = this.state

    return (
      <ul className="videos-ul">
        {videosList.map(each => (
          <Link key={each.id} className="link-video" to={`/videos/${each.id}`}>
            <li className="list-video">
              <img
                className="video-img"
                src={each.thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="video-lower">
                <img
                  className="profile-img-url"
                  src={each.profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p>{each.title}</p>
                  <p>{each.name}</p>
                  <p>
                    {each.viewCount} * views{'  '}
                    {formatDistanceToNow(new Date(each.publishedAt))}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

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

  renderEmptyView = () => (
    <div className="empty-bg">
      <img
        className="empty-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
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
      case apiStatus.empty:
        return this.renderEmptyView()
      default:
        return null
    }
  }

  render() {
    const {userSearch} = this.state
    // console.log(apiState)
    return (
      <AppThemeContext.Consumer>
        {value => {
          const {presentTheme} = value

          return (
            <div className={presentTheme ? '' : 'display-white'}>
              <div className="home-bg">
                {this.renderBanner()}
                <div className="input-search-div">
                  <input
                    value={userSearch}
                    onChange={this.updateUserSearch}
                    placeholder="Search"
                    className="search-input-el"
                    type="search"
                  />
                  <button
                    data-testid="searchButton"
                    onClick={this.searchUserInput}
                    className="search-icon-btn"
                    type="button"
                  >
                    <BiSearch size={28} />
                  </button>
                </div>
                {this.renderResults()}
              </div>
            </div>
          )
        }}
      </AppThemeContext.Consumer>
    )
  }
}
export default Home
