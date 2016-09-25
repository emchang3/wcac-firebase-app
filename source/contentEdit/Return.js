import React from 'react'


export const Return = ({ url, language }) => {
  let buttonLabel
  language === 'EN' ? (
    url === '/admin' ? buttonLabel = 'ADMIN' : (
      url === '/posts' ? buttonLabel = 'POSTS' : buttonLabel = ''
    )
  ) : (
    language === '检体' ? (
      url === '/admin' ? buttonLabel = '网站管理' : (
        url === '/posts' ? buttonLabel = '条目' : buttonLabel = ''
      )
    ) : (
      url === '/admin' ? buttonLabel = '網站管理' : (
        url === '/posts' ? buttonLabel = '條目' : buttonLabel = ''
      )
    )
  )

  return (
    <div
      className='myFlex'
      style={{
        justifyContent: 'flex-start'
      }}
    >
      <a href={url} style={{ color: 'black' }}>
        <button className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
          <i className="material-icons">arrow_back</i>
        </button>
      </a>
      <div style={{ display: 'inline', paddingLeft: '8px', paddingTop: '6px' }}>
        {buttonLabel}
      </div>
    </div>
  )
}
