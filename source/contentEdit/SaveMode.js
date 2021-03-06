import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

const SaveMode = ({ onChange, saveMode, inList, itemId, language }) => {
  return (
    <div
      className='myFlex'
      style={{
        // display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: inList && inList === true ? '0px' : '12px',
        paddingRight: '8px'
      }}
    >
      <span style={{ paddingTop: '2px' }}>
        {
          saveMode === 'draft' ? (
            language === 'EN' ? `${saveMode.toLowerCase()}` : (
              language === '检体' ? '草稿' : '草稿'
            )
          ) : (
            language === 'EN' ? `${saveMode.toUpperCase()}` : (
              language === '检体' ? '发布' : '發布'
            )
          )
        }
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
            checked={ saveMode === 'draft' ? false : true }
          />
        </label>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(SaveMode)
