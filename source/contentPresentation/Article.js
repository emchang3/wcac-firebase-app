import React from 'react'
import { connect } from 'react-redux'

import { endsWith } from 'lodash'


class Article extends React.Component {
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

    return (
      <div className={className}>
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
    content: state.content
  }
}

export default connect(mapStateToProps)(Article)
