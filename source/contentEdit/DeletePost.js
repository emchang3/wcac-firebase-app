import React from 'react'
import { connect } from 'react-redux'

import { deletePost } from '../actions'


const DeletePost = ({ itemId, uid, deletePost }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <i
        className="material-icons"
        onClick={ () => deletePost(itemId, uid) }
        style={{ cursor: 'pointer' }}
      >
        delete
      </i>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (initialTimestamp, uid) => dispatch(deletePost({
      initialTimestamp: initialTimestamp,
      uid: uid
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeletePost)
