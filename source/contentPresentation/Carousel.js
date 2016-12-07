import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import Article from './Article' // eslint-disable-line no-unused-vars

import { hShift } from '../navbar/Animation'

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: '0%'
      },
      articles: props.articles,
      anchorDistance: null,
      latestTouchX: null,
      animating: false,
      enoughChange: false
    }
  }

  leftShift = () => {
    const distance = this.props.browserWidth > 800 ? -50 : -100
    this.setState({ animating: true })
    hShift(this, distance, '%', 2, 750, this.postLeft)
  }
  postLeft = () => {
    this.setState({
      style: {
        left: '0%'
      },
      articles: [...this.state.articles.slice(1), this.state.articles[0]],
      animating: false
    })
  }
  rightShift = () => {
    const distance = this.props.browserWidth > 800 ? 50 : 100
    this.setState({ animating: true })
    hShift(this, distance, '%', 2, 750, this.postRight)
  }
  postRight = () => {
    this.setState({
      style: {
        left: '0%'
      },
      articles: [this.state.articles[this.state.articles.length - 1], ...this.state.articles.slice(0, this.state.articles.length - 1)],
      animating: false
    })
  }

  // componentDidMount = () => {
  //   document.getElementById('splash').style.opacity = '0'
  // }

  recordTouchStart = (event) => {
    if (event.touches.length === 1) {
      this.setState({ anchorDistance: event.touches[0].pageX })
    }
  }
  updateTouchDrag = (event) => {
    if (event.touches.length === 1) {
      const xPosOrig = (this.state.anchorDistance / this.props.browserWidth) * 100
      const xPosInPerc = (event.touches[0].pageX / this.props.browserWidth) * 100
      const xPosChange = xPosOrig - xPosInPerc
      const xPosChangeAbs = Math.abs(xPosChange)
      if (xPosChangeAbs >= 15) {
        const xPos = xPosChange > 0 ? (xPosChange - 15) * -1 : (xPosChange + 15) * -1
        this.setState({
          style: {
            left: `${ xPos }%`
          },
          latestTouchX: event.touches[0].pageX,
          enoughChange: true
        })
      }
      else {
        this.setState({
          latestTouchX: event.touches[0].pageX,
          enoughChange: false
        })
      }
    }
  }
  fireAnimation = () => {
    if (this.state.enoughChange === true) {
      const browserWidth = this.props.browserWidth
      const distanceTraveled = ((this.state.anchorDistance - this.state.latestTouchX) / browserWidth) * 100
      if (distanceTraveled <= -30) {
        const remainingDistance = distanceTraveled + 100 + 15
        hShift(this, remainingDistance, '%', 2, 300, this.postRight)
      }
      if (distanceTraveled > -30 && distanceTraveled < 0) {
        const remainingDistance = distanceTraveled + 15
        hShift(this, remainingDistance, '%', 2, 300, this.postAnimation)
      }
      if (distanceTraveled >= 30) {
        const remainingDistance = 100 - distanceTraveled + 15
        hShift(this, remainingDistance * -1, '%', 2, 300, this.postLeft)
      }
      if (distanceTraveled < 30 && distanceTraveled > 0) {
        const remainingDistance = distanceTraveled - 15
        hShift(this, remainingDistance, '%', 2, 300, this.postAnimation)
      }
    }
  }
  postAnimation = () => {
    this.setState({
      style: {
        left: '0%'
      }
    })
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
  }

  render() {
    let myArticles = this.state.articles.map((initialTimestamp) => {
      return (
        <Article
          key={initialTimestamp}
          initialTimestamp={initialTimestamp} place={`article${this.state.articles.indexOf(initialTimestamp)}`}
        />
      )
    })
    return (
      <div
        className='container cont-box'
        onTouchStart={this.recordTouchStart}
        onTouchMove={this.updateTouchDrag}
        onTouchEnd={this.fireAnimation}
        style={{ top: this.props.top || '20%', height: this.props.browserHeight - 150 }}
      >
        <div style={this.state.style} className='container mov-box'>
          {myArticles}
        </div>
        {
          this.props.browserWidth > 800 ? (
            <div className='cover coverLeft'>
              <button
                className="mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect"
                onClick={this.rightShift}
                style={{ position: 'absolute', left: '0%', bottom: '0%' }}
              >
                <i className="mdi mdi-chevron-left"></i>
              </button>
            </div>
          ) : null
        }
        <div
          className='coverBottom'
          style={{
            position: 'absolute',
            left: this.props.browserWidth > 800 ? '25%' : '0%',
            width: this.props.browserWidth > 800 ? '50%' : '100%',
            top: '50%',
            height: '50%'
          }}
        >
          <a
            href={`/view/${this.state.articles[1]}`}
            style={{
              position: 'absolute',
              bottom: '0%',
              right: '0%',
              color: 'black',
              textDecoration: 'none'
            }}
          >
            <button
              className="mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect"
            >
              Read more...
            </button>
          </a>
        </div>
        {
          this.props.browserWidth > 800 ? (
            <div className='cover coverRight'>
              <button
                className="mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect"
                onClick={this.leftShift}
                style={{ position: 'absolute', right: '0%', bottom: '0%' }}
              >
                <i className="mdi mdi-chevron-right"></i>
              </button>
            </div>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    browserWidth: state.browserWidth,
    browserHeight: state.browserHeight
  }
}

export default connect(mapStateToProps)(Carousel)
