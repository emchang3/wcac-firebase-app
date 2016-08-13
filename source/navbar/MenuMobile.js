import React from 'react'
import { connect } from 'react-redux'

import AboutMobile from './AboutMobile'

import { hShift } from './Animation'


class MenuMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: '-200px'
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

  render() {
    return (
      <div>
        <div id='menu-button'>
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onClick={this.menuOut}
          >
            <i className="material-icons">menu</i>
          </button>
        </div>
        <div id='mobile-menu' style={{ left: this.state.style.left, height: window.innerHeight }}>
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect"
            style={{ paddingLeft: '13px', paddingRight: '0px', textAlign: 'left', width: '100%' }} onClick={this.menuIn}
          >
            <i className="material-icons" style={{ position: 'relative' }}>menu</i>
          </button>
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
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(MenuMobile)
