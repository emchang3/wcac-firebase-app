import React from 'react'
import { connect } from 'react-redux'

import NavbarMobile from './navbar/NavbarMobile'
import Post from './contentEdit/Post'
import Admin from './Admin'


const Router = ({ language, path }) => {
  switch (path) {
    case '/':
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
        </div>
      )
    case '/admin':
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
          <Admin />
        </div>
      )
    case '/create_new':
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <Post readOnly={false} />
        </div>
      )
    default:
      return <div>Not found.</div>
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    path: state.path
  }
}

export default connect(mapStateToProps)(Router)
