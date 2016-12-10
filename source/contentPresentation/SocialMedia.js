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

  fbShare = () => {
    if (this.props.fbSDK !== null) {
      console.log(this.props.fbSDK);
      this.props.fbSDK.ui({
        method: 'share',
        mobile_iframe: true,
        href: `https://wcac-d11de.firebaseapp.com/view/${this.props.initialTimestamp}`,
      }, function(response){});
    }
  }

  render = () => {
    const smStyle = {
      width: '25%',
      border: '1px dotted green',
      paddingRight: '32px',
      paddingTop: '28px',
      pointerEvents: 'auto',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start'
    }

    const innerColumn = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      border: '1px dotted purple'
    }

    const iconSharedStyle = {
      paddingTop: '4px',
      paddingBottom: '2px',
      paddingRight: '6px',
      paddingLeft: '6px',
      borderRadius: '50%',
      cursor: 'pointer',
      marginBottom: '8px'
    }

    const shareStyle = {
      ...iconSharedStyle,
      backgroundColor: this.state.share === false ? 'white' : 'orange',
      color: this.state.share === false ? 'grey' : 'white',
      border: this.state.share === false ? '1px solid grey' : '1px solid transparent'
    }
    const fbStyle = {
      ...iconSharedStyle,
      backgroundColor: this.state.fb === false ? 'white' : '#3b5998',
      color: this.state.fb === false ? 'grey' : '#f7f7f7',
      border: this.state.fb === false ? '1px solid grey' : '1px solid transparent'
    }
    const ttStyle = {
      ...iconSharedStyle,
      backgroundColor: this.state.twitter === false ? 'white' : '#9ad4ff',
      color: this.state.twitter === false ? 'grey' : 'white',
      border: this.state.twitter === false ? '1px solid grey' : '1px solid transparent'
    }
    const gpStyle = {
      ...iconSharedStyle,
      backgroundColor: this.state.gplus === false ? 'white' : '#ca1e04',
      color: this.state.gplus === false ? 'grey' : '#eeeeee',
      border: this.state.gplus === false ? '1px solid grey' : '1px solid transparent'
    }
    const emStyle = {
      ...iconSharedStyle,
      backgroundColor: this.state.email === false ? 'white' : 'white',
      color: this.state.email === false ? 'grey' : 'black',
      border: this.state.email === false ? '1px solid grey' : '1px solid black'
    }

    return (
      <div style={smStyle}>
        <div style={innerColumn}>
          <div style={shareStyle}>
            <div>
              <i
                className="mdi mdi-share-variant"
                onMouseOver={this.shareToggle}
                onMouseOut={this.shareToggle}
                style={{ fontSize: '16px' }}
              >
              </i>
            </div>
          </div>
          <div style={fbStyle}>
            <i
              className="mdi mdi-facebook"
              onMouseOver={this.fbToggle}
              onMouseOut={this.fbToggle}
              onClick={this.fbShare}
              style={{ fontSize: '16px' }}
            >
            </i>
          </div>
          <div style={ttStyle}>
            <i
              className="mdi mdi-twitter"
              onMouseOver={this.ttToggle}
              onMouseOut={this.ttToggle}
              style={{ fontSize: '16px' }}
            >
            </i>
          </div>
          <div style={gpStyle}>
            <i
              className="mdi mdi-google-plus"
              onMouseOver={this.gpToggle}
              onMouseOut={this.gpToggle}
              style={{ fontSize: '16px' }}
            >
            </i>
          </div>
          <div style={emStyle}>
            <i
              className="mdi mdi-email"
              onMouseOver={this.emToggle}
              onMouseOut={this.emToggle}
              style={{ fontSize: '16px' }}
            >
            </i>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    browserWidth: state.browserWidth,
    fbSDK: state.fbSDK
  }
}

export default connect(mapStateToProps)(SocialMedia)
