import { combineReducers } from 'redux'

function general(state = {}, action) {
  console.log('general action', action)
  switch (action.type) {
    case 'BROWSER_RESIZE':
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight }
    case 'LANGUAGE_CHANGE':
      return { ...state, language: action.language }
    case 'STORE_LOCAL':
      return state
    case 'RETRIEVE_STATE':
      return state
    case 'RESTORE_LOCAL':
      return { ...state, ...action.previousState }
    case 'ATTEMPT_LOGIN':
      return state
    case 'SET_USER':
      return { ...state, uid: action.uid }
    case 'SAVE_POST':
      return state
    default:
      return state
  }
}

export default general
