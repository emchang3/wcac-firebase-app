import React from 'react'

export const Title = ({ onChange }) => {
  return (
    <div className="mdl-textfield mdl-js-textfield">
      <input
        className="mdl-textfield__input"
        type="text"
        id="post-title"
        onChange={onChange}
      />
      <label className="mdl-textfield__label" htmlFor="post-title">Title...</label>
    </div>
  )
}
