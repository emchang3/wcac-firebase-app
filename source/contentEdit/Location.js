import React from 'react'
import { connect } from 'react-redux'

export const EventLocation = ({ onChange, language, location }) => {
  return (
    <div className="mdl-textfield mdl-js-textfield">
      <input
        className="mdl-textfield__input"
        type="text"
        id="post-location"
        onChange={onChange}
        value={ location.length > 0 ? location : '' }
      />
      <label className="mdl-textfield__label" htmlFor="post-location">
        {
          language === 'EN' ? 'Location...' : (
            language === '检体' ? '地点...' : '地點...'
          )
        }
      </label>
    </div>
  )
}
