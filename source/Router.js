import React from 'react'
import { connect } from 'react-redux'

import NavbarMobile from './navbar/NavbarMobile'
import Post from './contentEdit/Post'
import Login from './Login'


const Router = ({ language, path }) => {
  switch (path) {
    case '/':
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
        </div>
      )
    case '/login':
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
          <Login />
        </div>
      )
    case '/new_post':
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
          <Post readOnly={false} />
        </div>
      )
    default:
      return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    path: state.path
  }
}

export default connect(mapStateToProps)(Router)
