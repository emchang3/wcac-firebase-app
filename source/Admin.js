import React from 'react'
import { connect } from 'react-redux'

import { attemptLogin } from './actions'

import CreatePost from './contentEdit/CreatePost'


const Admin = ({ language, browserWidth, attemptLogin, uid }) => {
  return (
    <div
      className='myFlex'
      style={{
        paddingTop: '100px',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div>
        <h1>
          {
            uid && uid !== null ? (
              language === 'EN' ? 'Website Administration' : (
                language === '检体' ? '网站管理' : '網站管理'
              )
            ) : (
              language === 'EN' ? 'Adminstrator Log-in' : (
                language === '检体' ? '网站管理登录' : '網站管理登錄'
              )
            )
          }
        </h1>
        <p>
          {
            uid && uid !== null ? (
              <img src={'images/alliance.jpeg'} />
            ) : (
              <button className="mdl-button mdl-js-button mdl-button--icon" onClick={attemptLogin}>
                <i className="material-icons">account_circle</i>
              </button>
            )
          }
        </p>
        {
          uid !== null ? (
            <div>
              <p>
                <CreatePost />
              </p>
              <p>
                <a href='/posts'>
                  <button
                    className="mdl-button mdl-js-button mdl-js-ripple-effect"
                    style={{ width: '200px' }}
                  >
                    {
                      language === 'EN' ? 'All Entries' : (
                        language === '检体' ? '所有条目' : '所有條目'
                      )
                    }
                  </button>
                </a>
              </p>
            </div>
          ) : (
            <p>
              {
                language === 'EN' ? 'Log in with Google.' : (
                  language === '检体' ? '用谷歌登录' : '用谷歌登錄'
                )
              }
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
