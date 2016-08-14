import React from 'react'

export const SermonLink = ({ setSermonLink }) => {
  return (
    <div className="mdl-textfield mdl-js-textfield">
      <input
        className="mdl-textfield__input"
        type="text"
        id="sermon-url"
        onChange={setSermonLink}
      />
      <label className="mdl-textfield__label" htmlFor="sermon-url">Sermon URL...</label>
    </div>
  )
}
