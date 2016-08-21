import React from 'react'

export const Title = ({ onChange, language, title }) => {
  return (
    <div className="mdl-textfield mdl-js-textfield">
      <input
        className="mdl-textfield__input"
        type="text"
        id="post-title"
        onChange={onChange}
        value={ title.length > 0 ? title : null }
      />
      <label className="mdl-textfield__label" htmlFor="post-title">
        {
          title.length > 0 ? '' : (
            language === 'EN' ? 'Title...' : (
              language === '检体' ? '标题...' : '標題...'
            )
          )
        }
      </label>
    </div>
  )
}
