import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startsWith } from 'lodash'

import Search from './Search'
import About from './AboutMobile'
import Language from './Language'
import MenuMobile from './MenuMobile'
import Title from './Title'

import { hShiftR, hExpand, fade } from './Animation'


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        right: '171px',
        opacity: 1
      }
    }
  }

  left = () => {
    hShiftR(this, 150, 'px', 2, 300)
    if (this.props.browserWidth < 480 && this.props.language === 'EN') {
      this.props.browserWidth < 445 ? (
        fade(this, -1, 2, 300)
      ) : (
        hExpand(this, -75, 'px', 2, 300)
      )
    }
    if (this.props.browserWidth < 445 && this.props.language !== 'EN') {
      fade(this, -1, 2, 300)
    }
  }
  back = () => {
    hShiftR(this, -150, 'px', 0.5, 300)
    if (this.props.browserWidth < 480 && this.props.language === 'EN') {
      this.props.browserWidth < 445 ? (
        fade(this, 1, 0.5, 300)
      ) : (
        hExpand(this, 75, 'px', 0.5, 300)
      )
    }
    if (this.props.browserWidth < 445 && this.props.language !== 'EN') {
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
        <div id='logo' style={{ opacity: this.props.browserWidth < 418 ? this.state.style.opacity : 1 }}>
          <a href='/'>
            <img
              src={
                startsWith(this.props.path, '/edit')
                  ? '../images/alliance.jpeg'
                  : 'images/alliance.jpeg'
              }
            />
          </a>
        </div>
        {
          this.props.browserWidth > 345
            ? <Title opacity={this.state.style.opacity} />
            : <div></div>
        }
        <Search left={this.left} back={this.back} />
        <Language />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    language: state.language,
    browserWidth: state.browserWidth,
    path: state.path
  }
}

export default connect(mapStateToProps)(Navbar)
