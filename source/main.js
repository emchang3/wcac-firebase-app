import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { startApp } from './database'

import App from './App'

import { browserResize, storeLocal, retrieveState } from './actions'
import reductor from './reducers'
import rootSaga from './sagas'


startApp()


const sagaMiddleware = createSagaMiddleware()
const initialState = {
  language: 'EN',
  browserWidth: window.innerWidth,
  browserHeight: window.innerHeight,
  uid: null,
  path: window.location.pathname
}
export const store = createStore(reductor, initialState, compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
sagaMiddleware.run(rootSaga, store.getState)


store.dispatch(retrieveState())
const renderNav = () => {
  store.dispatch(browserResize())
}
window.addEventListener('resize', renderNav, false)


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
