import { combineReducers } from 'redux'

function general(state = {}, action) {
  // console.log('general action', action)
  switch (action.type) {
    case 'BROWSER_RESIZE':
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight }
    case 'LANGUAGE_CHANGE':
      return { ...state, language: action.language }
    case 'RESTORE_LOCAL':
      return { ...state, ...action.previousState }
    case 'SET_USER':
      return { ...state, uid: action.uid }
    case 'UPDATE_CONTENT':
      return { ...state, content: action.content }
    default:
      return state
  }
}

export default general
