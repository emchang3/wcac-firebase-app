import React from 'react'
import { connect } from 'react-redux'

import { attemptLogin } from './actions'


const Admin = ({ language, browserWidth, attemptLogin, uid }) => {
  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '100px',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div>
        <h1>Administrator Log-in</h1>
        <p>
          <button className="mdl-button mdl-js-button mdl-button--icon" onClick={attemptLogin}>
            <i className="material-icons">account_circle</i>
          </button>
        </p>
        {
          uid !== null ? (
            <div>
              <p>
                <a href='/create_new'>
                  <button
                    className="mdl-button mdl-js-button mdl-js-ripple-effect"
                    style={{ width: '200px' }}
                  >
                    Create New
                  </button>
                </a>
              </p>
              <p>
                <a href='/posts'>
                  <button
                    className="mdl-button mdl-js-button mdl-js-ripple-effect"
                    style={{ width: '200px' }}
                  >
                    View All
                  </button>
                </a>
              </p>
            </div>
          ) : (
            <p>
              Log in with Google.
            </p>
          )
        }
      </div>
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

export default connect (mapStateToProps, mapDispatchToProps)(Admin)
