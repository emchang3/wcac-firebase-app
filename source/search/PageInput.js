import React from 'react'
import { connect } from 'react-redux'

import { setSearchPage } from '../actions'

class PageInput extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
    if (parseInt(this.props.searchPage) !== parseInt(document.getElementById('page-input').value)) {
      document.getElementById('page-input').value = this.props.searchPage
    }
  }

  try = (event) => {
    const inputVal = parseInt(event.target.value)
    if (event.key === 'Enter'
      && !isNaN(inputVal)
      && inputVal > 0
      && inputVal <= this.props.numPages
    ) {
      this.props.setSearchPage(event.target.value)
    }
  }

  nextPage = () => {
    if (this.props.searchPage + 1 <= this.props.numPages) {
      this.props.setSearchPage(this.props.searchPage + 1)
    }
  }

  lastPage = () => {
    if (this.props.searchPage - 1 >= 0) {
      this.props.setSearchPage(this.props.searchPage - 1)
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
          onClick={this.lastPage}
        >
          <i className="mdi mdi-chevron-left"></i>
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
            {this.props.searchPage}
          </label>
          <span className="mdl-textfield__error">Input is not a number!</span>
        </div>
        <div>
          {` / ${this.props.numPages}`}
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={this.nextPage}
        >
          <i className="mdi mdi-chevron-right"></i>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchPage: state.searchPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchPage: (page) => dispatch(setSearchPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageInput)
