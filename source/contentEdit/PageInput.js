import React from 'react'
import { connect } from 'react-redux'

import { setPostsPage } from '../actions'

class PageInput extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
    if (parseInt(this.props.postsPage) !== parseInt(document.getElementById('page-input').value)) {
      document.getElementById('page-input').value = this.props.postsPage
    }
  }

  try = (event) => {
    const inputVal = parseInt(event.target.value)
    if (event.key === 'Enter'
      && !isNaN(inputVal)
      && inputVal > 0
      && inputVal <= this.props.numPages
    ) {
      this.props.setPostsPage(event.target.value)
    }
  }

  render() {
    const outerStyle = {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }

    const inputStyle = {
      width: '50px',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <div className='myFlex' style={outerStyle}>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={() => {
            if (this.props.postsPage > 1) {
              this.props.setPostsPage(this.props.postsPage - 1)
            }
          }}
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <div
          className="mdl-textfield mdl-js-textfield myFlex"
          style={inputStyle}
        >
          <input
            className="mdl-textfield__input"
            type="text"
            pattern="-?[0-9]*(\.[0-9]+)?"
            id="page-input"
            onKeyDown={this.try}
          />
          <label className="mdl-textfield__label" htmlFor="page-input">
            {this.props.postsPage}
          </label>
          <span className="mdl-textfield__error">Input is not a number!</span>
        </div>
        <div>
          {` / ${this.props.numPages}`}
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={() => {
            if (this.props.postsPage < this.props.numPages) {
              this.props.setPostsPage(this.props.postsPage + 1)
            }
          }}
        >
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postsPage: state.postsPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPostsPage: (page) => dispatch(setPostsPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageInput)
