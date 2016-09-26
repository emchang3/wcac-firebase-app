import React from 'react'
import { connect } from 'react-redux'
import { capitalize } from 'lodash'

import DeletePost from './DeletePost'
import SaveMode from './SaveMode'

import { savePost } from '../actions'

class PostListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saveMode: this.props.content.mode
    }
  }

  componentDidMount = () => {
    componentHandler.upgradeAllRegistered()
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
  }

  componentWillUpdate = (nextProps, nextState) => {
    const payload = nextProps.content
    if (nextProps.content) {
      payload.mode = nextState.saveMode || this.state.saveMode
      this.props.savePost(payload)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    try {
      this.setState({ saveMode: nextProps.content.mode })
    } catch (e) {

    }
  }

  saveModeToggle = (event) => {
    event.target.checked === true
      ? this.setState({ saveMode: 'publish' })
      : this.setState({ saveMode: 'draft' })
  }

  render() {
    let its = ''
    let title = ''
    let category = ''
    let congregation = ''
    if (this.props.content) {
      its = this.props.content.initialTimestamp
      title = this.props.content.title
      category = this.props.content.category
      congregation = this.props.content.congregation
    }

    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          <a
            href={`/edit/${its}`}
            style={{ color: 'black' }}
          >
            {capitalize(title)}
          </a>
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {capitalize(category)}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {capitalize(congregation)}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          <SaveMode
            onChange={this.saveModeToggle}
            saveMode={this.state.saveMode}
            inList={true}
            itemId={its}
          />
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          <DeletePost itemId={its} />
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePost: (payload) => dispatch(savePost(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem)
