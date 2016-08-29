import React from 'react'
import { connect } from 'react-redux'
import { startsWith } from 'lodash'

import NavbarMobile from './navbar/NavbarMobile'
import Post from './contentEdit/Post'
import Admin from './Admin'
import PostList from './contentEdit/PostList'
import { Carousel } from './contentPresentation/Carousel'


const routes = {
  '/': (test) => {
    if (test) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
          <Carousel articles={[ test[2], ...test.slice(0, 2) ]} top={'125%'} />
        </div>
      )
    }
    return <div></div>
  },
  '/admin': () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
        <Admin />
      </div>
    )
  },
  '/posts' : () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
        <PostList />
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

const Router = ({ path, contentOrder }) => {
  if (routes[path]) {
    if (contentOrder) {
      return routes[path](contentOrder.announcements)
    }
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
    path: state.path,
    contentOrder: state.contentOrder
  }
}

export default connect(mapStateToProps)(Router)
