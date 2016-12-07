import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import { vScroll } from '../navbar/Animation'

const Scroller = ({ browserHeight, destination, top }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: top,
        height: '50px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
      <i className="mdi mdi-chevron-down"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          console.log('wat');
        }}
      >
      </i>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    browserHeight: state.browserHeights
  }
}

export default connect(mapStateToProps)(Scroller)
