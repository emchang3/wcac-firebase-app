import {
  BROWSER_RESIZE,
  LANGUAGE_CHANGE,
  RESTORE_LOCAL,
  SET_USER,
  UPDATE_CONTENT,
  UPDATE_ORDER,
  SET_POSTS_PAGE,
  SET_SEARCH
} from './actions'

function general (state = {}, action) {
  // console.log('general action', action)
  switch (action.type) {
    case BROWSER_RESIZE:
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight }
    case LANGUAGE_CHANGE:
      return { ...state, language: action.language }
    case RESTORE_LOCAL:
      return { ...state, ...action.previousState }
    case SET_USER:
      return { ...state, uid: action.uid }
    case UPDATE_CONTENT:
      return { ...state, content: action.content }
    case UPDATE_ORDER:
      return { ...state, contentOrder: action.contentOrder }
    case SET_POSTS_PAGE:
      return { ...state, postsPage: action.payload }
    case SET_SEARCH:
      return { ...state, search: action.payload }
    default:
      return state
  }
}

export default general
