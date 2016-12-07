import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

class SocialMedia extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fb: false,
      twitter: false,
      gplus: false,
      email: false,
      share: false
    }
  }
  fbToggle = (event) => {
    this.setState({
      fb: this.state.fb === false ? true : false
    })
  }
  ttToggle = (event) => {
    this.setState({
      twitter: this.state.twitter === false ? true : false
    })
  }
  gpToggle = (event) => {
    this.setState({
      gplus: this.state.gplus === false ? true : false
    })
  }
  emToggle = (event) => {
    this.setState({
      email: this.state.email === false ? true : false
    })
  }
  shareToggle = (event) => {
    this.setState({
      share: this.state.share === false ? true : false
    })
  }

  render = () => {
    const smStyle = {
      // width: this.props.browserWidth > 600 ? '25%' : '0%',
      width: '25%',
      border: '1px dotted green',
      textAlign: 'right',
      paddingRight: '48px',
      pointerEvents: 'auto'
    }

    const shareStyle = {
      // border: `1px solid ${ this.state.share === false ? 'black' : 'white' }`,
      backgroundColor: this.state.share === false ? 'transparent' : 'orange',
      color: this.state.share === false ? 'black' : 'white',
      padding: '8px',
      borderRadius: '50%',
      cursor: 'pointer'
    }

    // this.shareToggle()

    return (
      <div style={smStyle}>
        <i
          className="mdi mdi-share-variant"
          style={shareStyle}
          onMouseOver={this.shareToggle}
          onMouseOut={this.shareToggle}
        >
        </i>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(SocialMedia)
