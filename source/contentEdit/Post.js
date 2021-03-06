import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import Draft from 'draft-js'
import { isEmpty, escape } from 'lodash'

import { savePost } from '../actions'

import CongregationSelect from './CongregationSelect'
import CategorySelect from './CategorySelect'
import SaveMode from './SaveMode'
import { Title } from './Title'
import DateSelect from './DateSelect'
import { SermonLink } from './SermonLink'
import { Return } from './Return'
import Language from '../navbar/Language'
import { EventLocation } from './Location'

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

class RichEditorExample extends React.Component {
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
      initialTimestamp: '',
      location: ''
    }

    // this.focus = () => {
    //   console.log('focus');
    //   this.refs.editor.focus()
    // }
    this.onChange = (editorState) => {
      this.setState({editorState})
    }

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
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
          title: escape(title),
          editorState: myES,
          congregation: congregation,
          category: category,
          initialTimestamp: initialTimestamp,
          saveMode: saveMode
        }

        if (category === 'events') {
          const location = nextProps.content[initialTimestamp].location
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
          payload.location = location
        }

        if (category === 'sermons') {
          const sermonLink = nextProps.content[initialTimestamp].sermonLink
          payload.sermonLink = sermonLink
        }

        this.setState(payload)
      }
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const title = nextState.title || this.state.title
    const initialTimestamp = nextState.initialTimestamp

    if (initialTimestamp.toString().length > 0 && nextState !== this.state) {
      const rawContentState = convertToRaw(nextState.editorState.getCurrentContent())
      const uid = nextProps.uid
      const saveMode = nextState.saveMode || this.state.saveMode
      const congregation = nextState.congregation
      const category = nextState.category

      const payload = {
        uid: uid,
        title: escape(title),
        content: rawContentState,
        congregation: congregation,
        mode: saveMode,
        category: category,
        initialTimestamp: initialTimestamp,
        timestamp: new Date().getTime()
      }

      if (category === 'events'
        && nextState.startDate.length > 0
        && nextState.startTime.length > 0
        && nextState.endDate.length > 0
        && nextState.endTime.length > 0
        && nextState.location.length > 0
      ) {
        const location = nextState.location
        const startDateTime = new Date(`${nextState.startDate}T${nextState.startTime}`).getTime()
        const endDateTime = new Date(`${nextState.endDate}T${nextState.endTime}`).getTime()
        payload.startDateTime = startDateTime
        payload.endDateTime = endDateTime
        payload.location = location
      }

      if (category === 'sermons') {
        const sermonLink = nextState.sermonLink
        payload.sermonLink = sermonLink
      }

      this.props.savePost(payload)
    }
  }

  componentDidUpdate = () => {
    componentHandler.upgradeAllRegistered()
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.setState({ editorState: newState })
    }
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  saveModeToggle = (event) => {
    event.target.checked === true
      ? this.setState({ saveMode: 'publish' })
      : this.setState({ saveMode: 'draft' })
  }

  updateTitle = (event) => {
    event.target.value.length > 0 && this.state.initialTimestamp.length === 0 ? (
      this.setState({
        title: escape(event.target.value),
        initialTimestamp: new Date().getTime()
      })
    ) : (
      this.setState({ title: escape(event.target.value) })
    )
  }

  congregationChange = (event) => {
    this.setState({ congregation: event.target.value })
  }

  categoryChange = (event) => {
    this.setState({ category: event.target.value })
  }

  updateStartDate = (event) => {
    this.setState({ startDate: event.target.value })
  }

  updateStartTime = (event) => {
    this.setState({ startTime: event.target.value + ':00' })
  }

  updateEndDate = (event) => {
    this.setState({ endDate: event.target.value })
  }

  updateEndTime = (event) => {
    this.setState({ endTime: event.target.value + ':00' })
  }

  setSermonLink = (event) => {
    this.setState({ sermonLink: event.target.value })
  }

  updateLocation = (event) => {
    this.setState({ location: event.target.value })
  }

  render() {
    const {editorState} = this.state

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }
    // <div
    //   className='myFlex'
    //   style={{
    //     justifyContent: 'flex-end',
    //     width: '100%'
    //   }}
    // >
    //   <Language />
    // </div>
    if (this.props.uid !== undefined && this.props.uid !== null) {
      return (
        <div>
          <div
            className='myFlex'
            style={{
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <div
              style={{
                width: this.props.browserWidth < 1145 ? '80%' : '60%',
                paddingTop: '80px'
              }}
            >
              <Return
                url={'/posts'}
                language={this.props.language}
              />

              <h2>
                {
                  this.props.initialTimestamp ? (
                    this.props.language === 'EN' ? 'Edit Entry' : (
                      this.props.language === '检体' ? '修改条目' : '修改條目'
                    )
                  ) : (
                    this.props.language === 'EN' ? 'Create New Entry' : (
                      this.props.language === '检体' ? '创建新条目' : '創建新條目'
                    )
                  )
                }
              </h2>

              <Title
                onChange={this.updateTitle}
                language={this.props.language}
                title={this.state.title}
              />

              <div className="RichEditor-root">
                <BlockStyleControls
                  editorState={editorState}
                  onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
                />
                <div className={className}>
                  <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    ref="editor"
                    spellCheck={true}
                  />
                </div>
              </div>

              {
                this.state.category === 'events' ? (
                  <DateSelect
                    updateStartDate={this.updateStartDate}
                    updateEndDate={this.updateEndDate}
                    updateStartTime={this.updateStartTime}
                    updateEndTime={this.updateEndTime}
                    startDate={this.state.startDate}
                    startTime={this.state.startTime}
                    endDate={this.state.endDate}
                    endTime={this.state.endTime}
                  />
                ) : null
              }

              {
                this.state.category === 'events' ? (
                  <EventLocation
                    onChange={this.updateLocation}
                    language={this.props.language}
                    location={this.state.location}
                  />
                ) : null
              }

              {
                this.state.category === 'sermons' ? (
                  <SermonLink setSermonLink={this.setSermonLink} sermonLink={this.state.sermonLink} />
                ) : null
              }

              <div
                className='myFlex'
                style={{
                  justifyContent: 'space-between'
                }}
              >
                <div
                  className='myFlex'
                  style={{
                    flexWrap: 'wrap'
                  }}
                >
                  <CategorySelect onClick={this.categoryChange} category={this.state.category} />
                  <CongregationSelect
                    onClick={this.congregationChange}
                    congregation={this.state.congregation}
                  />
                </div>
                <SaveMode onChange={this.saveModeToggle} saveMode={this.state.saveMode} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>{`You're not authorized to be here.`}</h2>
      </div>
    )
  }
}

// Custom overrides for "code" style.
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

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
]

const BlockStyleControls = (props) => {
  const {editorState} = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

var INLINE_STYLES = [
  {label: 'b', style: 'BOLD'},
  {label: 'i', style: 'ITALIC'},
  {label: 'u', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'}
]

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {
        INLINE_STYLES.map((type) => {
          let styledLabel
          switch (type.label) {
            case 'b':
              styledLabel = <strong>b</strong>
              break
            case 'i':
              styledLabel = <em>i</em>
              break
            case 'u':
              styledLabel = <u>u</u>
              break
            default:
              styledLabel = type.label
          }

          return (
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={styledLabel}
              onToggle={props.onToggle}
              style={type.style}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    browserWidth: state.browserWidth,
    language: state.language,
    content: state.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePost: (payload) => dispatch(savePost(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditorExample)
