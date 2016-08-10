import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Navbar from './navbar/Navbar'
import NavbarMobile from './navbar/NavbarMobile'


const App = ({ language, browserWidth, authorized, changeAuthState }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NavbarMobile />
    </div>
  )
}

  // { browserWidth > 1145 ? <Navbar /> : <NavbarMobile /> }

const mapStateToProps = (state) => {
  return {
    authorized: state.authorized,
    language: state.language,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(App)
