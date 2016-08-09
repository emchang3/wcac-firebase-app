import React from 'react'
import { connect } from 'react-redux'

import { vExpand } from './Animation'

class AboutMobile extends React.Component {
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
      vExpand(this, 200, 'px', 2, 300, () => {
        this.setState({
          expanded: 'expanded'
        })
      })
    }
    if (this.state.expanded === 'expanded') {
      this.setState({
        expanded: 'animating'
      })
      vExpand(this, -200, 'px', 0.5, 300, () => {
        this.setState({
          expanded: 'contracted'
        })
      })
    }
  }

  render() {
    return (
      <div>
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect" style={{ width: '100%', textAlign: 'left' }} onClick={this.openMenu}>
          {
            this.props.language === 'EN' ? (
              'About'
            ) : (
              this.props.language === '检体' ? (
                '关于我们'
              ) : (
                '關於我們'
              )
            )
          }
        </button>
        <div style={{ height: this.state.style.height, overflowY: 'hidden', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect" style={{ width: '100%', textAlign: 'left' }}>
            {
              this.props.language === 'EN' ? (
                'Statement of Faith'
              ) : (
                this.props.language === '检体' ? (
                  '信仰'
                ) : (
                  '信仰'
                )
              )
            }
          </button>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect" style={{ width: '100%', textAlign: 'left' }}>
            {
              this.props.language === 'EN' ? (
                'Mission'
              ) : (
                this.props.language === '检体' ? (
                  '任务'
                ) : (
                  '任務'
                )
              )
            }
          </button>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect" style={{ width: '100%', textAlign: 'left' }}>
            {
              this.props.language === 'EN' ? (
                'Staff'
              ) : (
                this.props.language === '检体' ? (
                  '同工'
                ) : (
                  '同工'
                )
              )
            }
          </button>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect" style={{ width: '100%', textAlign: 'left' }}>
            {
              this.props.language === 'EN' ? (
                'Jobs'
              ) : (
                this.props.language === '检体' ? (
                  '工作'
                ) : (
                  '工作'
                )
              )
            }
          </button>
        </div>
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

export default connect(mapStateToProps)(AboutMobile)
