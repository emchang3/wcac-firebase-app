import React from 'react'
import { connect } from 'react-redux'

const Tweet = ({ browserWidth, url }) => {
  const overlayStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }

  return (
    <div>
      <iframe src={`https://twitter.com/intent/tweet?text=${url}`} width={ browserWidth > 600 ? '60%' : '90%' }>
      </iframe>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(Tweet)
