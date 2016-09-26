import React from 'react'
import { connect } from 'react-redux'

import { hExpand } from './Animation'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        width: '50px'
      },
      expanded: 'contracted',
      inputWidth: '0px'
    }
  }

  expandInput = () => {
    if (this.state.expanded === 'contracted') {
      this.props.left()
      this.setState({
        expanded: 'animating'
      })
      hExpand(this, 150, 'px', 2, 300, () => {
        document.getElementById('sample3').select()
        this.setState({
          expanded: 'expanded',
          inputWidth: '137.5px'
        })
      })
    }
  }
  contractInput = () => {
    if (this.state.expanded === 'expanded') {
      this.setState({
        expanded: 'animating',
        inputWidth: '0px'
      })
      hExpand(this, -150, 'px', 0.5, 300, () => {
        this.setState({
          expanded: 'contracted'
        })
      })
      this.props.back()
    }
  }

  render() {
    return (
      <div
        id='search'
        style={{
          width: this.state.style.width,
          right: this.props.browserWidth < 1145 ? '66px' : '116px',
          pointerEvents: 'auto'
        }}
      >
        <button
          className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"
          style={{ position: 'absolute', marginTop: '10px', marginLeft: '10px' }} onClick={this.expandInput}
        >
          <i className="material-icons">search</i>
        </button>
        <div
          className="mdl-textfield mdl-js-textfield"
          style={{
            position: 'absolute',
            marginTop: '-7px',
            width: this.state.inputWidth,
            right: '0px',
            marginRight: '12.5px'
          }}
        >
          <input
            className="mdl-textfield__input"
            type="text"
            id="sample3"
            onBlur={this.contractInput}
            style={{ color: 'grey' }}
          />
          <label className="mdl-textfield__label" htmlFor="sample3" style={{ color: 'grey' }}>
            {
              this.props.language === 'EN' ? (
                'Search this site...'
              ) : (
                this.props.language === '检体' ? (
                  '搜索这个网站...'
                ) : (
                  '搜索這個網站...'
                )
              )
            }
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(Search)
