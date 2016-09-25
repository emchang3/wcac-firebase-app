import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import Draft from 'draft-js'
import { isEmpty } from 'lodash'

const {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw
} = Draft

const { Map } = Immutable


class SimpleArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      saveMode: 'draft',
      congregation: '',
      category: 'uncategorized',
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      sermonLink: '',
      initialTimestamp: ''
    }

    this.onChange = (editorState) => {
      this.setState({editorState})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.content && nextProps.initialTimestamp !== null) {

      const initialTimestamp = nextProps.initialTimestamp
      const rawContentState = nextProps.content[initialTimestamp].content

      if (isEmpty(rawContentState.entityMap)) {
        rawContentState.entityMap = {};
      }

      const blockArray = convertFromRaw(rawContentState)
      const myES = EditorState.createWithContent(blockArray)

      const title = nextProps.content[initialTimestamp].title
      const congregation = nextProps.content[initialTimestamp].congregation
      const category = nextProps.content[initialTimestamp].category
      const uid = nextProps.content[initialTimestamp].uid
      const saveMode = nextProps.content[initialTimestamp].mode

      if (title !== this.state.title) {
        const payload = {
          uid: uid,
          title: title,
          editorState: myES,
          congregation: congregation,
          category: category,
          initialTimestamp: initialTimestamp,
          saveMode: saveMode
        }

        if (category === 'events') {
          const startDateTime = new Date(nextProps.content[initialTimestamp].startDateTime)
          const endDateTime = new Date(nextProps.content[initialTimestamp].endDateTime)

          const startYear = `${startDateTime.getUTCFullYear()}`
          const startMonth = startDateTime.getUTCMonth() < 10
            ? `0${startDateTime.getUTCMonth() + 1}`
            : `${startDateTime.getUTCMonth() + 1}`
          const startDay = startDateTime.getUTCDate() < 10
            ? `0${startDateTime.getUTCDate()}`
            : `${startDateTime.getUTCDate()}`
          const startDate = `${startYear}-${startMonth}-${startDay}`

          const startHour = startDateTime.getUTCHours() < 10
            ? `0${startDateTime.getUTCHours()}`
            : `${startDateTime.getUTCHours()}`
          const startMinute = startDateTime.getUTCMinutes() < 10
            ? `0${startDateTime.getUTCMinutes()}`
            : `${startDateTime.getUTCMinutes()}`
          const startTime = `${startHour}:${startMinute}`

          const endYear = `${endDateTime.getUTCFullYear()}`
          const endMonth = endDateTime.getUTCMonth() < 10
            ? `0${endDateTime.getUTCMonth() + 1}`
            : `${endDateTime.getUTCMonth() + 1}`
          const endDay = endDateTime.getUTCDate() < 10
            ? `0${endDateTime.getUTCDate()}`
            : `${endDateTime.getUTCDate()}`
          const endDate = `${endYear}-${endMonth}-${endDay}`

          const endHour = endDateTime.getUTCHours() < 10
            ? `0${endDateTime.getUTCHours()}`
            : `${endDateTime.getUTCHours()}`
          const endMinute = endDateTime.getUTCMinutes() < 10
            ? `0${endDateTime.getUTCMinutes()}`
            : `${endDateTime.getUTCMinutes()}`
          const endTime = `${endHour}:${endMinute}`

          payload.startDate = startDate
          payload.startTime = startTime
          payload.endDate = endDate
          payload.endTime = endTime
        }

        if (category === 'sermons') {
          const sermonLink = nextProps.content[initialTimestamp].sermonLink
          payload.sermonLink = sermonLink
        }

        this.setState(payload)
      }
    }
  }

  render() {
    const { editorState } = this.state

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    let individualStyle = {
      width: '100%',
      maxHeight: '300px'
    }

    let whenString = ''
    if (this.state.category === 'events') {
      whenString += 'When: '
      whenString += `${this.state.startDate.slice(5, 7)}/${this.state.startDate.slice(8, 10)}/${this.state.startDate.slice(0,4)}, `
      parseInt(this.state.startTime.slice(0, 2)) > 12 ? (
          whenString += `${parseInt(this.state.startTime.slice(0, 2)) - 12}${this.state.startTime.slice(2, 5)} PM`
        ) : (
          parseInt(this.state.startTime.slice(0, 2)) === 0 ? (
            whenString += `${parseInt(this.state.startTime.slice(0, 2)) + 12}${this.state.startTime.slice(2, 5)} AM`
          ) : whenString += `${this.state.startTime} AM`
        )
      this.state.startDate === this.state.endDate
        ? whenString += ' - '
        : whenString += ` - ${this.state.endDate.slice(5, 7)}/${this.state.endDate.slice(8, 10)}/${this.state.endDate.slice(0, 4)}, `
      parseInt(this.state.endTime.slice(0, 2)) > 12 ? (
          whenString += `${parseInt(this.state.endTime.slice(0, 2)) - 12}${this.state.endTime.slice(2, 5)} PM`
        ) : (
          parseInt(this.state.endTime.slice(0, 2)) === 0 ? (
            whenString += `${parseInt(this.state.endTime.slice(0, 2)) + 12}${this.state.endTime.slice(2, 5)} AM`
          ) : whenString += `${this.state.endTime} AM`
        )
    }

    return (
      <div
        id={this.state.initialTimestamp}
        style={individualStyle}
      >
        <div
          style={{
            paddingLeft: '48px',
            paddingRight: '48px',
            paddingTop: '24px',
            paddingBottom: '24px'
          }}
        >
          <h3>{this.state.title}</h3>
          {
            this.state.initialTimestamp ? (
              <h6>Posted on: {new Date(parseInt(this.state.initialTimestamp)).toLocaleString()}</h6>
            ) : null
          }
          {
            this.state.category === 'events' ? (
              <h5>
                {whenString}
              </h5>
            ) : null
          }
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
            readOnly={true}
          />
        </div>
      </div>
    )
  }
}


const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return null
  }
}


const mapStateToProps = (state) => {
  return {
    content: state.content,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(SimpleArticle)
