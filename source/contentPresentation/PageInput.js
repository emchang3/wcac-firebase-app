import React from 'react'
import { connect } from 'react-redux'
import { capitalize } from 'lodash'

import { setCategoryPage } from '../actions'

class PageInput extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
    if (parseInt(this.props[`${this.props.category}Page`]) !== parseInt(document.getElementById('page-input').value)) {
      document.getElementById('page-input').value = this.props[`${this.props.category}Page`]
    }
  }

  try = (event) => {
    const inputVal = parseInt(event.target.value)
    if (event.key === 'Enter'
      && !isNaN(inputVal)
      && inputVal > 0
      && inputVal <= this.props.numPages
    ) {
      this.props.setCategoryPage(event.target.value)
    }
  }

  nextPage = () => {
    if (this.props[`${this.props.category}Page`] + 1 <= this.props.numPages) {
      this.props.setCategoryPage(this.props[`${this.props.category}Page`] + 1)
    }
  }

  lastPage = () => {
    if (this.props[`${this.props.category}Page`] - 1 >= 0) {
      this.props.setCategoryPage(this.props[`${this.props.category}Page`] - 1)
    }
  }

  render() {
    const outerStyle = {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'auto'
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
            {this.props[`${this.props.category}Page`]}
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

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps ownProps', ownProps);
  const cat = ownProps.category
  return {
    [`${cat}Page`]: state[`${cat}Page`]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('mapDispatchToProps ownProps', ownProps);
  const cat = ownProps.category
  return {
    setCategoryPage: (page) => dispatch(setCategoryPage(cat, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageInput)
