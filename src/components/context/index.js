import React from 'react'

const AppThemeContext = React.createContext({
  presentTheme: true,
  updateTheme: () => {},
  savedVideosList: [],
  addToSave: () => {},
  saveStatus: false,
  updateSaveStatus: () => {},
  videoId: '',
  updateVideoId: () => {},
})
export default AppThemeContext
