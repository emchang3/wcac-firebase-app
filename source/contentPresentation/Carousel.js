import React, { Component } from 'react'
import Article from './Article'

import { hShift } from '../navbar/Animation'


export class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: '0%'
      },
      articles: props.articles
    }
  }

  leftShift = () => {
    hShift(this, -50, '%', 2, 750, this.postLeft)
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
    hShift(this, 50, '%', 2, 750, this.postRight)
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
      <div className='container cont-box' style={{ top: this.props.top || '20%' }}>
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
