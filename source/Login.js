import React from 'react'
import { connect } from 'react-redux'

import { attemptLogin } from './actions'

const Login = ({ language, browserWidth, attemptLogin, uid }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Administrator Log-in</h1>
      <p>
        <button className="mdl-button mdl-js-button mdl-button--icon" onClick={attemptLogin}>
          <i className="material-icons">account_circle</i>
        </button>
      </p>
      {
        uid !== null ? (
          <p>
            <a href='/new_post'>
              <button className="mdl-button mdl-js-button">
                Create Content
              </button>
            </a>
          </p>
        ) : (
          <p>
            Log in with Google.
          </p>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    browserWidth: state.browserWidth,
    uid: state.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => {
      dispatch(attemptLogin())
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)
