import React from 'react'


export const SaveMode = ({ onChange, saveMode, inList, itemId }) => {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: inList && inList === true ? '0px' : '12px',
        paddingRight: '8px'
      }}
    >
      <span style={{ paddingTop: '2px' }}>
        { saveMode === 'draft' ? `${saveMode.toLowerCase()}` : `${saveMode.toUpperCase()}` }
      </span>
      <div style={{ paddingLeft: '16px', paddingRight: '8px' }}>
        <label
          htmlFor={ inList && inList === true ? `saveSwitch${itemId}` : 'saveSwitch' }
          className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
        >
          <input type="checkbox"
            id={ inList && inList === true ? `saveSwitch${itemId}` : 'saveSwitch' }
            className="mdl-switch__input"
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  )
}
