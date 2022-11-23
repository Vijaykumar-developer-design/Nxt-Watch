import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/LoginForm'
import Header from './components/Header'
import AppThemeContext from './components/context'
import Navbar from './components/NavBar'
import Home from './components/Home'
import Trending from './components/Trending'
import Game from './components/Gaming'
import DetailedVideo from './components/DetailedVideo'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import './App.css'
import HomeDiv from './StyledComponents'
// Replace your code here
class App extends Component {
  state = {
    presentTheme: true,
    savedVideosList: [],
    saveStatus: true,
    videoId: '2',
  }

  updateTheme = () => {
    this.setState(prevState => ({presentTheme: !prevState.presentTheme}))
  }

  addToSave = details => {
    // console.log(details)
    const {savedVideosList, saveStatus} = this.state

    if (saveStatus) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, details],
      }))
    } else {
      const filteredData = savedVideosList.filter(
        each => each.id !== details.id,
      )
      this.setState({savedVideosList: filteredData})
    }
  }

  updateSaveStatus = () => {
    this.setState(prevState => ({
      saveStatus: !prevState.saveStatus,
    }))
  }

  updateVideoId = id => {
    // const {id, saveStatus} = idStatus
    const {saveStatus} = this.state
    // console.log(saveStatus)
    //  console.log(saveStatus, 'hi')

    if (saveStatus) {
      //   console.log(id)
      this.setState({videoId: id})
    } else {
      //   console.log('hi')
      this.setState({videoId: ''})
    }
  }

  render() {
    const {presentTheme, savedVideosList, videoId, saveStatus} = this.state

    return (
      <AppThemeContext.Provider
        value={{
          presentTheme,
          updateTheme: this.updateTheme,
          savedVideosList,
          addToSave: this.addToSave,
          updateSaveStatus: this.updateSaveStatus,
          videoId,
          updateVideoId: this.updateVideoId,
          saveStatus,
        }}
      >
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <>
              <HomeDiv data-testid="home">
                <Route component={Header} />
                <div className="content">
                  <Navbar />
                  <>
                    <Switch>
                      <ProtectedRoute exact path="/" component={Home} />
                      <ProtectedRoute
                        exact
                        path="/trending"
                        component={Trending}
                      />
                      <ProtectedRoute exact path="/gaming" component={Game} />
                      <ProtectedRoute
                        exact
                        path="/videos/:id"
                        component={DetailedVideo}
                      />
                      <ProtectedRoute
                        exact
                        path="/saved-videos"
                        component={SavedVideos}
                      />
                      <Route exact path="/not-found" component={NotFound} />
                      <Redirect to="/not-found" />
                    </Switch>
                  </>
                </div>
              </HomeDiv>
            </>
          </Switch>
        </div>
      </AppThemeContext.Provider>
    )
  }
}
export default App
