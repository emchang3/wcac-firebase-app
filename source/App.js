import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Router from './Router'


const App = ({ language, browserWidth }) => {
  return (
    <Router />
  )
}


const mapStateToProps = (state) => {
  return {
    language: state.language,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(App)
