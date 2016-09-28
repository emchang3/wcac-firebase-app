import React from 'react'
import { connect } from 'react-redux'

import { hExpand } from './Animation'

const Search = ({ browserWidth }) => {
  return (
    <div
      id='search'
      style={{
        width: '50px',
        right: browserWidth < 1145 ? '66px' : '116px',
        pointerEvents: 'auto'
      }}
    >
      <button
        className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"
        style={{ position: 'absolute', marginTop: '10px', marginLeft: '10px' }}
      >
        <i className="material-icons">search</i>
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(Search)
