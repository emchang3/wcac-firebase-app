const BROWSER_RESIZE = 'BROWSER_RESIZE'
const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE'
const STORE_LOCAL = 'STORE_LOCAL'
const RETRIEVE_STATE = 'RETRIEVE_STATE'
const RESTORE_LOCAL = 'RESTORE_LOCAL'
const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN'
const SET_USER = 'SET_USER'
const SAVE_POST = 'SAVE_POST'
const WATCH_CONTENT = 'WATCH_CONTENT'
const UPDATE_CONTENT = 'UPDATE_CONTENT'


export const browserResize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  return {
    type: BROWSER_RESIZE,
    browserWidth: width,
    browserHeight: height
  }
}

export const changeLanguage = (lang) => {
  return {
    type: LANGUAGE_CHANGE,
    language: lang
  }
}

export const setUser = (userID) => {
  return {
    type: SET_USER,
    uid: userID
  }
}

export const storeLocal = () => {
  return {
    type: STORE_LOCAL
  }
}

export const retrieveState = () => {
  return {
    type: RETRIEVE_STATE
  }
}

export const rehydrateState = (previous) => {
  return {
    type: RESTORE_LOCAL,
    previousState: previous
  }
}

export const attemptLogin = () => {
  return {
    type: ATTEMPT_LOGIN
  }
}

export const savePost = (payload) => {
  return {
    type: SAVE_POST,
    payload: payload
  }
}

export const watchContent = (dispatch) => {
  return {
    type: WATCH_CONTENT,
    dispatch: dispatch
  }
}

export const updateContent = (posts) => {
  return {
    type: UPDATE_CONTENT,
    content: posts
  }
}
