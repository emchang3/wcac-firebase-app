import { takeEvery, takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { rehydrateState, setUser } from './actions'

import { storageAvailable, persistState, getLocalState, addUser, isAdmin, postContent } from './database'


function* helloSaga() {
  // console.log('--- saga init ---')
}

function* stateSave(getState) {
  // console.log('--- persisting state ---')
  const haveStorage = yield storageAvailable('localStorage')
  if (haveStorage === true) {
    const persisted = {
      uid: getState().uid,
      language: getState().language
    }
    yield persistState(persisted)
  }
}

const defaultState = {
  language: 'EN',
  browserWidth: window.innerWidth,
  browserHeight: window.innerHeight,
  uid: null
}

function* stateLoad() {
  // console.log('--- retrieving state ---')
  try {
    const haveStorage = yield storageAvailable('localStorage')
    if (haveStorage === true) {
      const storedState = yield getLocalState()
      if (storedState !== null) {
        yield put(rehydrateState(storedState))
        const adminStatus = yield* isAdmin(storedState.uid)
        adminStatus === true
          ? yield put(setUser(storedState.uid))
          : yield put(setUser(null))
      }
      else {
        yield put(rehydrateState(defaultState))
      }
    }
    else {
      yield put(rehydrateState(defaultState))
    }
  } catch (e) {
    console.log(`stateLoad FAILURE: ${e}`)
  }
}

function* loginSaga() {
  // console.log('--- logging in ---')
  const newUid = yield* addUser()
  const adminStatus = yield* isAdmin(newUid)
  adminStatus === true
    ? yield put(setUser(newUid))
    : yield put(setUser(null))
}

function* persistContent(action) {
  const payload = action.payload
  const content = { ...payload, timestamp: new Date().getTime() }
  const adminStatus = yield* isAdmin(action.payload.uid)
  adminStatus === true
    ? yield* postContent(content)
    : console.log('not admin');
}


function* watchCriticalStateChange(getState) {
  yield* takeLatest([ 'LANGUAGE_CHANGE', 'SET_USER' ], stateSave, getState)
}

function* watchStateRetrievalRequest() {
  yield* takeLatest('RETRIEVE_STATE', stateLoad)
}

function* watchLoginAttempt() {
  yield* takeLatest('ATTEMPT_LOGIN', loginSaga)
}

function* watchContentSave() {
  yield* takeLatest('SAVE_POST', persistContent)
}


export default function* rootSaga(getState) {
  yield [
    // helloSaga(),
    watchCriticalStateChange(getState),
    watchStateRetrievalRequest(),
    watchLoginAttempt(),
    watchContentSave()
  ]
}
