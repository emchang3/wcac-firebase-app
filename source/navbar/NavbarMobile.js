import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from './Search'
import About from './AboutMobile'
import Language from './Language'
import MenuMobile from './MenuMobile'

import { hShiftR, hExpand, fade } from './Animation'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        right: '171px',
        width: window.innerWidth < 423 ? '100px' : '150px',
        opacity: 1
      }
    }
  }

  left = () => {
    hShiftR(this, 150, 'px', 2, 300)
    if (window.innerWidth < 480 && this.props.language === 'EN') {
      console.log('1st stage small');
      window.innerWidth < 445 ? (
        fade(this, -1, 2, 300)
      ) : (
        console.log('shrink'),
        hExpand(this, -75, 'px', 2, 300)
      )
    }
    if (window.innerWidth < 445 && this.props.language !== 'EN') {
      fade(this, -1, 2, 300)
    }
  }
  back = () => {
    hShiftR(this, -150, 'px', 0.5, 300)
    if (window.innerWidth < 480 && this.props.language === 'EN') {
      window.innerWidth < 445 ? (
        fade(this, 1, 0.5, 300)
      ) : (
        hExpand(this, 75, 'px', 0.5, 300)
      )
    }
    if (window.innerWidth < 445 && this.props.language !== 'EN') {
      fade(this, 1, 0.5, 300)
    }
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
  }

  render() {
    return (
      <div id='navbar'>
        <MenuMobile />
        <div id='logo' style={{ opacity: window.innerWidth < 418 ? this.state.style.opacity : 1 }}>
          <img src='images/alliance.jpeg' />
        </div>
        <div id='site-title' style={{ width: this.state.style.width, opacity: this.state.style.opacity }}>
          <strong>
            {
              this.props.language === 'EN' ? (
                'WCAC'
              ) : (
                this.props.language === '检体' ? (
                  '惠顿华人宣道会'
                ) : (
                  '惠頓華人宣道會'
                )
              )
            }
          </strong>
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
