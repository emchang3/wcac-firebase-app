import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import { deletePost } from '../actions'

const DeletePost = ({ itemId, uid, deletePost }) => {
  return (
    <div
      className='myFlex'
      style={{
        justifyContent: 'flex-end'
      }}
    >
      <i
        className="mdi mdi-delete"
        onClick={ () => deletePost(itemId, uid) }
        style={{ cursor: 'pointer' }}
      >
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
