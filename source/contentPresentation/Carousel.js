import React from 'react'
import { connect } from 'react-redux'

import Article from './Article'

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
      latestTouchX: null
    }
  }

  leftShift = () => {
    const distance = this.props.browserWidth > 800 ? -50 : -100
    hShift(this, distance, '%', 2, 750, this.postLeft)
  }
  postLeft = () => {
    this.setState({
      style: {
        left: '0%'
      },
      articles: [...this.state.articles.slice(1), this.state.articles[0]]
    })
  }
  rightShift = () => {
    const distance = this.props.browserWidth > 800 ? 50 : 100
    hShift(this, distance, '%', 2, 750, this.postRight)
  }
  postRight = () => {
    this.setState({
      style: {
        left: '0%'
      },
      articles: [this.state.articles[this.state.articles.length - 1], ...this.state.articles.slice(0, this.state.articles.length - 1)]
    })
  }

  componentDidMount = () => {
    // document.getElementById('splash').style.opacity = '0'
  }

  recordTouchStart = (event) => {
    if (event.touches.length === 1) {
      this.setState({ anchorDistance: event.touches[0].pageX })
    }
  }
  updateTouchDrag = (event) => {
    if (event.touches.length === 1) {
      const holdup = ((event.touches[0].pageX - this.state.anchorDistance) / this.props.browserWidth) * 100
      this.setState({
        style: {
          left: `${holdup}%`
        },
        latestTouchX: event.touches[0].pageX
      })
    }
  }
  fireAnimation = () => {
    const distanceTraveled = this.state.anchorDistance - this.state.latestTouchX
    const browserWidth = this.props.browserWidth
    if (distanceTraveled < 0) {
      const remainingDistance = ((browserWidth + distanceTraveled) / browserWidth) * 100
      hShift(this, remainingDistance, '%', 2, 750, this.postRight)
    }
    if (distanceTraveled > 0) {
      const remainingDistance = ((browserWidth - distanceTraveled) / browserWidth) * -100
      hShift(this, remainingDistance, '%', 2, 750, this.postLeft)
    }
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
        style={{ top: this.props.top || '20%' }}
      >
        <div style={this.state.style} className='container mov-box'>
          {myArticles}
        </div>
        <div className='cover coverLeft'>
          <button
            className="mdl-button mdl-js-button mdl-button--primary"
            onClick={this.rightShift}
            style={{ position: 'absolute', left: '0%', bottom: '0%' }}
          >
            <i className="material-icons">chevron_left</i>
          </button>
        </div>
        <div className='cover coverRight'>
          <button
          className="mdl-button mdl-js-button mdl-button--primary"
          onClick={this.leftShift}
          style={{ position: 'absolute', right: '0%', bottom: '0%' }}
        >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(Carousel)
