import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import Router from './Router' // eslint-disable-line no-unused-vars

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
