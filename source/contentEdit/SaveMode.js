import React from 'react'


export const SaveMode = ({ onChange, browserWidth, saveMode }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', paddingRight: '8px' }}>
      <span style={{ paddingTop: '2px' }}>
        { saveMode === 'draft' ? `${saveMode.toLowerCase()}` : `${saveMode.toUpperCase()}` }
      </span>
      <div style={{ paddingLeft: '16px', paddingRight: '8px' }}>
        <label
          htmlFor="saveSwitch"
          className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
        >
          <input type="checkbox"
            id="saveSwitch"
            className="mdl-switch__input"
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  )
}
