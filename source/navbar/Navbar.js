import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from './Search'
import About from './About'
import Language from './Language'

import { hShiftR, hExpand } from './Animation'


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        right: '166px',
        width: '200px'
      }
    }
  }

  left = () => {
    hShiftR(this, 150, 'px', 2, 300)
    if (window.innerWidth < 1206 && this.props.language === 'EN') {
      hExpand(this, -125, 'px', 2, 300)
    }
  }
  back = () => {
    hShiftR(this, -150, 'px', 0.5, 300)
    if (window.innerWidth < 1206 && this.props.language === 'EN') {
      hExpand(this, 125, 'px', 0.5, 300)
    }
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
  }

  render() {
    return (
      <div id='navbar'>
        <div id='logo'>
          <a href='/'>
            <i
              className="material-icons"
              style={{ position: 'relative', top: '7px' }}
            >
              local_hospital
            </i>
          </a>
        </div>
        <div id='site-title' style={{ width: this.state.style.width }}>
          <strong>
            {
              this.props.language === 'EN' ? 'WCAC' : (
                this.props.language === '检体' ? '惠顿华人宣道会' : '惠頓華人宣道會'
              )
            }
          </strong>
        </div>
        <div id='movable' style={{ right: this.state.style.right }}>
          <div className='navItem' style={{ height: '50px', lineHeight: '50px' }}>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
              {
                this.props.language === 'EN' ? 'Contact' : (
                  this.props.language === '检体' ? '联系我们' : '聯繫我們'
                )
              }
            </button>
          </div>
          <div className='navItem' style={{ height: '50px', lineHeight: '50px' }}>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
              {
                this.props.language === 'EN' ? 'Ministries' : (
                  this.props.language === '检体' ? '事工' : '事工'
                )
              }
            </button>
          </div>
          <div className='navItem' style={{ height: '50px', lineHeight: '50px' }}>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
              {
                this.props.language === 'EN' ? 'Sermons' : (
                  this.props.language === '检体' ? '讲道' : '講道'
                )
              }
            </button>
          </div>
          <div className='navItem' style={{ height: '50px', lineHeight: '50px' }}>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
              {
                this.props.language === 'EN' ? 'Announcements' : (
                  this.props.language === '检体' ? '公告' : '公告'
                )
              }
            </button>
          </div>
          <div className='navItem' style={{ height: '50px', lineHeight: '50px' }}>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
              {
                this.props.language === 'EN' ? 'Events' : (
                  this.props.language === '检体' ? '活动' : '活動'
                )
              }
            </button>
          </div>
          <About />
        </div>
        <Search left={this.left} back={this.back} />
        <Language />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  // console.log('App mapStateToProps state', state);
  return {
    language: state.language,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(Navbar)
