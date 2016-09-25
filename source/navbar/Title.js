import React from 'react'
import { connect } from 'react-redux'


const Title = ({ language, opacity }) => {
  return (
    <div
      id='site-title'
      style={{ opacity: opacity, paddingLeft: '16px' }}
    >
      {
        language === 'EN' ? (
          'WCAC'
        ) : (
          language === '检体' ? (
            '惠顿华人宣道会'
          ) : (
            '惠頓華人宣道會'
          )
        )
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(Title)
