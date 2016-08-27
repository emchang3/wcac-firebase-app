import React from 'react'
import { connect } from 'react-redux'
import { capitalize } from 'lodash'

import DeletePost from './DeletePost'
import { SaveMode } from './SaveMode'

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
    const payload = this.props.content
    payload.mode = nextState.saveMode || this.state.saveMode
    this.props.savePost(payload)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ saveMode: nextProps.content.mode })
  }

  saveModeToggle = (event) => {
    event.target.checked === true
      ? this.setState({ saveMode: 'publish' })
      : this.setState({ saveMode: 'draft' })
  }

  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          <a
            href={`/edit/${this.props.content.initialTimestamp}`}
            style={{ color: 'black' }}
          >
            {capitalize(this.props.content.title)}
          </a>
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {capitalize(this.props.content.category)}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {capitalize(this.props.content.congregation)}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          <SaveMode
            onChange={this.saveModeToggle}
            saveMode={this.state.saveMode}
            inList={true}
            itemId={this.props.content.initialTimestamp}
          />
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          <DeletePost itemId={this.props.content.initialTimestamp} />
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
