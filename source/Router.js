import React from 'react'
import { connect } from 'react-redux'
import { startsWith } from 'lodash'

import NavbarMobile from './navbar/NavbarMobile'
import Post from './contentEdit/Post'
import Admin from './Admin'
import PostList from './contentEdit/PostList'
import Carousel from './contentPresentation/Carousel'
import PostView from './contentPresentation/PostView'
import { SectionTitle } from './contentPresentation/SectionTitle'


const routes = {
  '/': (params) => {
    if (params) {
      const { browserHeight, announcements, events } = params
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <NavbarMobile />
          <SectionTitle sectionTitle='Announcements' top={`${browserHeight}px`} />
          <Carousel
            articles={[ announcements[2], ...announcements.slice(0, 2) ]}
            top={`${browserHeight + 100}px`}
          />
          <SectionTitle sectionTitle='Events' top={`${(2 * browserHeight)}px`} />
          <Carousel
            articles={[ events[2], ...events.slice(0, 2) ]}
            top={`${(2 * browserHeight) + 100}px`}
          />
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
  '/posts': () => {
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
        <Post initialTimestamp={null} />
      </div>
    )
  },
  '/edit': (initialTimestamp) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Post initialTimestamp={initialTimestamp} />
      </div>
    )
  },
  '/view': (initialTimestamp) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
        <PostView initialTimestamp={initialTimestamp} />
      </div>
    )
  }
}

const Router = ({ path, contentOrder, browserHeight }) => {
  if (routes[path]) {
    if (contentOrder) {
      const params = {
        browserHeight: browserHeight,
        announcements: contentOrder.announcements,
        events: contentOrder.events
      }
      return routes[path](params)
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
    contentOrder: state.contentOrder,
    browserHeight: state.browserHeight
  }
}

export default connect(mapStateToProps)(Router)
