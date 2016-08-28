import React from 'react'
import { connect } from 'react-redux'


const CreatePost = ({ language }) => {
  return (
    <a href='/create_new'>
      <button
        className="mdl-button mdl-js-button mdl-js-ripple-effect"
        style={{ width: '200px' }}
      >
        {
          language === 'EN' ? 'Create New Entry' : (
            language === '检体' ? '创建新条目' : '創建新條目'
          )
        }
      </button>
    </a>
  )
}


const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(CreatePost)
