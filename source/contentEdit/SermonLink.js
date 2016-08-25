import React from 'react'


export const SermonLink = ({ setSermonLink, sermonLink }) => {
  return (
    <div className="mdl-textfield mdl-js-textfield">
      <input
        className="mdl-textfield__input"
        type="text"
        id="sermon-url"
        onChange={setSermonLink}
        value={sermonLink}
      />
      <label className="mdl-textfield__label" htmlFor="sermon-url">Sermon URL...</label>
    </div>
  )
}
