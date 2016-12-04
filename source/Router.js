import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { startsWith } from 'lodash'

import NavbarMobile from './navbar/NavbarMobile'  // eslint-disable-line no-unused-vars
import Post from './contentEdit/Post' // eslint-disable-line no-unused-vars
import Admin from './Admin' // eslint-disable-line no-unused-vars
import PostList from './contentEdit/PostList' // eslint-disable-line no-unused-vars
import Carousel from './contentPresentation/Carousel' // eslint-disable-line no-unused-vars
import PostView from './contentPresentation/PostView' // eslint-disable-line no-unused-vars
import { SectionTitle } from './contentPresentation/SectionTitle' // eslint-disable-line no-unused-vars
import ArticleList from './contentPresentation/ArticleList' // eslint-disable-line no-unused-vars
import Input from './search/Input'  // eslint-disable-line no-unused-vars
import Results from './search/Results'

// <Carousel
//   articles={[ general[2], ...general.slice(0, 2) ]}
//   top={`100px`}
// />

const routes = {
  '/': (params) => {
    if (params) {
      const { browserHeight, announcements, events, general } = params
      return (
        <div style={{ width: '100%', height: '100%' }}>
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
          <NavbarMobile />
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
        <NavbarMobile />
        <Post initialTimestamp={null} />
      </div>
    )
  },
  '/edit': (initialTimestamp) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
        <Post initialTimestamp={initialTimestamp} />
      </div>
    )
  },
  '/view': (initialTimestamp) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <PostView initialTimestamp={initialTimestamp} />
        <NavbarMobile />
      </div>
    )
  },
  '/category': (category) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ArticleList category={category} />
        <NavbarMobile />
      </div>
    )
  },
  '/search': () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <NavbarMobile />
        <Input />
        <Results />
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
        events: contentOrder.events,
        general: contentOrder.general
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
