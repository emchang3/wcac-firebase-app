import 'babel-polyfill'

import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'  // eslint-disable-line no-unused-vars
import createSagaMiddleware from 'redux-saga'

import { startApp } from './database'

import App from './App' // eslint-disable-line no-unused-vars

import { browserResize, retrieveState, watchContent } from './actions'
import reductor from './reducers'
import rootSaga from './sagas'
import { pullFB } from './pullFB'

startApp()

const sagaMiddleware = createSagaMiddleware()
const initialState = {
  language: 'EN',
  browserWidth: window.innerWidth,
  browserHeight: window.innerHeight,
  uid: null,
  path: window.location.pathname,
  postsPage: 1,
  announcementsPage: 1,
  eventsPage: 1,
  ministriesPage: 1,
  sermonsPage: 1,
  staffPage: 1,
  jobsPage: 1,
  search: '',
  searchPage: 1,
  searchCategory: '',
  searchCongregation: '',
  fbSDK: null
}
export const store = createStore(reductor, initialState, compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
sagaMiddleware.run(rootSaga, store.getState)

pullFB(store.dispatch)

store.dispatch(retrieveState())

const renderNav = () => {
  store.dispatch(browserResize())
}
window.addEventListener('resize', renderNav, false)

store.dispatch(watchContent(store.dispatch))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
