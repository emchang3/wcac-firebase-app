import React from 'react'
import { connect } from 'react-redux'
import { startsWith } from 'lodash'

import NavbarMobile from './navbar/NavbarMobile'
import Post from './contentEdit/Post'
import Admin from './Admin'

const routes = {
  '/': () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
      </div>
    )
  },
  '/admin': () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
        <Admin />
      </div>
    )
  },
  '/create_new': () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Post readOnly={false} initialTimestamp={null} />
      </div>
    )
  },
  '/edit': (initialTimestamp) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Post readOnly={false} initialTimestamp={initialTimestamp} />
      </div>
    )
  }
}

const Router = ({ path }) => {
  console.log(path);
  if (routes[path]) {
    return routes[path]()
  }
  for (var i = 1; i < Object.keys(routes).length; i++) {
    const route = Object.keys(routes)[i]
    if (startsWith(path, route)) {
      const third = path.split('/')[2]
      return routes[route](third)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    path: state.path
  }
}

export default connect(mapStateToProps)(Router)
