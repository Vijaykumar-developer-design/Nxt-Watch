import {Component} from 'react'
// import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import AppThemeContext from '../context'
import './index.css'
import {SaveButtonEl, LikeBtnEl, DislikeBtnEl} from './StyledComponent'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  empty: 'EMPTY_LIST',
}
class DetailedVideo extends Component {
  state = {
    videoDetails: {},
    apiState: apiStatus.initial,
    like: false,
    saveStatus: false,
    disLike: false,
  }

  componentDidMount() {
    this.getVideo()
  }

  getVideo = async () => {
    this.setState({apiState: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const token = Cookies.get('jwt_token')
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
      const updatedVideo = {
        id: data.video_details.id,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscribersCount: data.video_details.channel.subscriber_count,
      }
      this.setState({videoDetails: updatedVideo, apiState: apiStatus.success})
    } else {
      this.setState({apiState: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {videoDetails} = this.state

    return (
      <AppThemeContext.Consumer>
        {value => {
          const {
            addToSave,
            presentTheme,
            updateSaveStatus,
            saveStatus,
            videoId,
            updateVideoId,
          } = value

          console.log(videoId)

          const {like, disLike} = this.state

          const {
            id,
            publishedAt,
            title,
            thumbnailUrl,
            description,
            videoUrl,
            viewCount,
            profileImageUrl,
            subscribersCount,
            name,
          } = videoDetails
          const video = {id, thumbnailUrl, name, viewCount, publishedAt, title}
          const btnCondition = id !== videoId
          console.log(btnCondition)
          const textContent = btnCondition ? 'Save' : 'Saved'
          /* const videoDetailsToAdd = {video, saveStatus} */
          // const savingCondition = id !== videoId && saveStatus

          const onClickAddToSave = () => {
            this.setState(prevState => ({saveStatus: !prevState.saveStatus}))
            updateVideoId(id)
            updateSaveStatus(id)
            addToSave(video)
          }

          const onClickLike = () => {
            this.setState(prevState => ({
              like: !prevState.like,
              disLike: false,
            }))
          }

          const onClickDislike = () => {
            this.setState(prevState => ({
              disLike: !prevState.disLike,
              like: false,
            }))
          }

          return (
            <div key={id} className={presentTheme ? '' : 'display-white'}>
              <ReactPlayer height="400px" width="100%" url={videoUrl} />
              <p className="title-video">{title}</p>
              <div className="buttons-div">
                <p>
                  {viewCount} * views{'  '}
                  {publishedAt}
                </p>
                <div className="buttons-container">
                  <LikeBtnEl
                    presentTheme={presentTheme}
                    like={like}
                    onClick={onClickLike}
                    type="button"
                  >
                    <BiLike size={30} /> Like
                  </LikeBtnEl>
                  <DislikeBtnEl
                    disLike={disLike}
                    onClick={onClickDislike}
                    type="button"
                  >
                    <BiDislike size={30} /> Dislike
                  </DislikeBtnEl>
                  <SaveButtonEl
                    btnCondition={btnCondition}
                    onClick={onClickAddToSave}
                    type="button"
                  >
                    <BiListPlus size={30} />
                    <p>{textContent}</p>
                  </SaveButtonEl>
                </div>
              </div>
              <hr />
              <div className="detailed-div">
                <img
                  className="thumbnail-video"
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p>{name}</p>
                  <p>{subscribersCount} subscribers</p>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </AppThemeContext.Consumer>
    )
  }

  searchAgain = () => {
    this.getVideo()
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
    return <div className="detailed-video">{this.renderResults()}</div>
  }
}

export default DetailedVideo
