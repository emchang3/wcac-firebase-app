import React from 'react'
import { connect } from 'react-redux'

import AboutMobile from './AboutMobile'

import { hShift, fade } from './Animation'

class MenuMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: '-200px',
        opacity: '0'
      },
      menuOut: 'hidden'
    }
  }

  menuOut = () => {
    if (this.state.menuOut === 'hidden') {
      this.setState({
        menuOut: 'animating'
      })
      hShift(this, 200, 'px', 2, 300, () => {
        window.addEventListener('click', this.handleNavBlur)
        this.setState({
          menuOut: 'shown'
        })
      })
    }
  }
  menuIn = () => {
    if (this.state.menuOut === 'shown') {
      this.setState({
        menuOut: 'animating'
      })
      hShift(this, -200, 'px', 0.5, 300, () => {
        this.setState({
          menuOut: 'hidden'
        })
      })
    }
  }
  handleNavBlur = (event) => {
    const mobileMenu = document.getElementById('mobile-menu')
    const about = document.getElementById('about-mobile')
    if (event.target !== mobileMenu && event.target !== about) {
      this.menuIn()
      window.removeEventListener('click', this.handleNavBlur)
    }
  }

  menuButtonDown = () => {
    this.setState({
      style: {
        ...this.state.style,
        opacity: '0.7'
      }
    })
  }
  menuButtonUp = () => {
    fade(this, -0.7, 0.5, 350)
  }
  menuButtonOver = () => {
    this.setState({
      style: {
        ...this.state.style,
        opacity: '0.15'
      }
    })
  }
  menuButtonOut = () => {
    this.setState({
      style: {
        ...this.state.style,
        opacity: '0'
      }
    })
  }

  render() {
    return (
      <div style={{ pointerEvents: 'auto' }}>
        <div id='menu-button'>
          <div
            onClick={this.menuOut}
            onMouseDown={this.menuButtonDown}
            onMouseUp={this.menuButtonUp}
            onMouseOver={this.menuButtonOver}
            onMouseOut={this.menuButtonOut}
            style={{
              position: 'absolute',
              paddingLeft: '4px',
              // paddingTop: '9px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '2px',
                top: '8px',
                width: '36px',
                height: '36px',
                backgroundColor: `rgba(117, 117, 117, ${this.state.style.opacity})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              }}
            >
              <i className="mdi mdi-menu"></i>
            </div>
          </div>
        </div>
        <div
          id='mobile-menu'
          style={{
            left: this.state.style.left,
            height: this.props.browserHeight,
            // backgroundColor: 'white'
          }}
        >
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect"
            style={{ width: '100%', textAlign: 'left' }}
            onClick={this.menuIn}
          >
            <i className="mdi mdi-menu" style={{ position: 'relative', color: 'black' }}></i>
          </button>
          <a href='/category/announcements'>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect"
              style={{ width: '100%', textAlign: 'left' }}
            >
              {
                this.props.language === 'EN' ? 'Announcements' : (
                  this.props.language === '检体' ? '公告' : '公告'
                )
              }
            </button>
          </a>
          <a href='/category/events'>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect"
              style={{ width: '100%', textAlign: 'left' }}
            >
              {
                this.props.language === 'EN' ? 'Events' : (
                  this.props.language === '检体' ? '活动' : '活動'
                )
              }
            </button>
          </a>
          <a href='/category/ministries'>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect"
              style={{ width: '100%', textAlign: 'left' }}
            >
              {
                this.props.language === 'EN' ? 'Ministries' : (
                  this.props.language === '检体' ? '事工' : '事工'
                )
              }
            </button>
          </a>
          <a href='/category/sermons'>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect"
              style={{ width: '100%', textAlign: 'left' }}
            >
              {
                this.props.language === 'EN' ? 'Sermons' : (
                  this.props.language === '检体' ? '讲道' : '講道'
                )
              }
            </button>
          </a>
          <AboutMobile language={this.props.language} />
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect"
            style={{ width: '100%', textAlign: 'left' }}
          >
            {
              this.props.language === 'EN' ? 'Contact' : (
                this.props.language === '检体' ? '联系我们' : '聯繫我們'
              )
            }
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    browserWidth: state.browserWidth,
    browserHeight: state.browserHeight
  }
}

export default connect(mapStateToProps)(MenuMobile)
