import React from 'react'
import { connect } from 'react-redux'

import { changeLanguage } from '../actions'

import { vExpand, hExpand } from './Animation'

class Language extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        height: '0px'
      },
      expanded: 'contracted'
    }
  }

  openMenu = () => {
    if (this.state.expanded === 'contracted') {
      this.setState({
        expanded: 'animating'
      })
      vExpand(this, 150, 'px', 2, 300, () => {
        window.addEventListener('click', this.closeMenu)
        this.setState({
          expanded: 'expanded'
        })
      })
    }
    if (this.state.expanded === 'expanded') {
      this.setState({
        expanded: 'animating'
      })
      vExpand(this, -150, 'px', 0.5, 300, () => {
        this.setState({
          expanded: 'contracted'
        })
      })
    }
  }
  closeMenu = (event) => {
    if (event.target !== document.getElementById('language-menu')) {
      if (this.state.expanded === 'expanded') {
        this.setState({
          expanded: 'animating'
        })
        vExpand(this, -150, 'px', 0.5, 300, () => {
          this.setState({
            expanded: 'contracted'
          })
        })
      }
      window.removeEventListener('click', this.closeMenu)
    }
  }

  changeLang = (lang) => {
    this.props.changeLang(lang)
  }

  render() {
    return (
      <div
        id='site-language'
        style={{
          width: '66px',
          right: this.props.browserWidth < 1145 ? '0px' : '50px',
          pointerEvents: 'auto',
          top: '8px'
        }}
      >
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
          }}
          onClick={this.openMenu}
        >
          {this.props.language}
        </button>
        <div
          id='language-menu'
          style={{
            height: this.state.style.height,
            width: '63px',
            overflow: 'hidden',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            backgroundColor: 'white'
          }}
        >
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeLang.bind(null, this.props.language !== '粵語' ? '粵語' : 'EN')}
          >
            { this.props.language !== '粵語' ? '粵語' : 'EN' }
          </button>
          <br />
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeLang.bind(null, this.props.language !== '繁體' ? '繁體' : 'EN')}
          >
            { this.props.language !== '繁體' ? '繁體' : 'EN' }
          </button>
          <br />
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.changeLang.bind(null, this.props.language !== '检体' ? '检体' : 'EN')}
          >
            { this.props.language !== '检体' ? '检体' : 'EN' }
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('Language mapStateToProps state', state);
  return {
    language: state.language,
    browserWidth: state.browserWidth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLang: (lang) => { dispatch(changeLanguage(lang)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Language)
