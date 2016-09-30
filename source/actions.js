export const BROWSER_RESIZE = 'BROWSER_RESIZE'
export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE'
export const STORE_LOCAL = 'STORE_LOCAL'
export const RETRIEVE_STATE = 'RETRIEVE_STATE'
export const RESTORE_LOCAL = 'RESTORE_LOCAL'
export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN'
export const SET_USER = 'SET_USER'
export const SAVE_POST = 'SAVE_POST'
export const WATCH_CONTENT = 'WATCH_CONTENT'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_POSTS_PAGE = 'SET_POSTS_PAGE'
export const SET_SEARCH = 'SET_SEARCH'

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

export const updateContentOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    contentOrder: order
  }
}

export const deletePost = (payload) => {
  return {
    type: DELETE_POST,
    payload: payload
  }
}

export const setPostsPage = (payload) => {
  return {
    type: SET_POSTS_PAGE,
    payload: payload
  }
}

export const setSearch = (payload) => {
  return {
    type: SET_SEARCH,
    payload: payload
  }
}
