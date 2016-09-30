import React from 'react'
import { connect } from 'react-redux'

import { hExpand, fade } from '../navbar/Animation'
import { setSearch } from '../actions'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        width: '0px',
        opacity: 0
      },
      expanded: 'contracted'
    }
  }

  openInput = () => {
    if (this.state.expanded === 'contracted') {
      this.setState({
        expanded: 'animating'
      })
      hExpand(this, 250, 'px', 2, 300, () => {
        document.getElementById('searchinator').select()
        this.setState({
          expanded: 'expanded'
        })
      })
    }
  }

  closeInput = () => {
    if (this.state.expanded === 'expanded') {
      this.setState({
        expanded: 'animating'
      })
      hExpand(this, -250, 'px', 0.5, 300, () => {
        this.setState({
          expanded: 'contracted'
        })
      })
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

  search = (event) => {
    event.target.value.length >= 3
      ? this.props.setSearch(event.target.value)
      : this.props.setSearch('')
  }

  render() {
    const searchBox = {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // alignContent: 'center',
      width: '100%',
      height: '100%',
      paddingTop: '100px'
    }

    const innerBox = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // border: '1px solid blue'
    }

    const searchButton = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // alignContent: 'center',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      // border: '1px dotted red',
      backgroundColor: `rgba(117, 117, 117, ${this.state.style.opacity})`,
      marginRight: '8px',
      cursor: 'pointer'
    }

    const searchInput = {
      width: this.state.style.width
    }

    const inputInternals = {
      height: '40px',
      fontSize: '40px',
      fontWeight: '100'
    }

    return (
      <div className='myFlex' style={searchBox}>
        <h2>Site Search</h2>
        <div className='myFlex' style={innerBox}>
          <div
            className='myFlex'
            style={searchButton}
            onMouseDown={this.menuButtonDown}
            onMouseUp={this.menuButtonUp}
            onMouseOver={this.menuButtonOver}
            onMouseOut={this.menuButtonOut}
            onClick={this.openInput}
          >
            <i className="material-icons" style={{ fontSize: '40px' }}>search</i>
          </div>
          <div
            className="mdl-textfield mdl-js-textfield" style={searchInput}
          >
            <input
              className="mdl-textfield__input"
              type="text"
              id="searchinator"
              onBlur={this.closeInput}
              onChange={this.search}
              style={inputInternals}
            />
            <label
              className="mdl-textfield__label"
              htmlFor="searchinator"
            ></label>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (query) => dispatch(setSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
