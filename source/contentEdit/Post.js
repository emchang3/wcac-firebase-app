import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import Draft from 'draft-js'

import { savePost } from '../actions'

import { CongregationSelect } from './CongregationSelect'
import { CategorySelect } from './CategorySelect'
import { SaveMode } from './SaveMode'
import { Title } from './Title'
import { DateSelect } from './DateSelect'
import { SermonLink } from './SermonLink'


const {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
} = Draft

const {Map} = Immutable

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props);
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

  componentWillUpdate = (nextProps, nextState) => {
    const title = nextState.title || this.state.title
    const initialTimestamp = nextState.initialTimestamp

    if (initialTimestamp.toString().length > 0) {
      const rawContentState = Draft.convertToRaw(nextState.editorState.getCurrentContent())
      const uid = nextProps.uid
      const saveMode = nextState.saveMode || this.state.saveMode
      const congregation = nextState.congregation
      const category = nextState.category
      const sermonLink = nextState.sermonLink

      const payload = {
        uid: uid,
        title: title,
        content: rawContentState,
        congregation: congregation,
        mode: saveMode,
        category: category,
        initialTimestamp: initialTimestamp
      }

      if (category === 'events'
        && nextState.startDate.length > 0
        && nextState.startTime.length > 0
        && nextState.endDate.length > 0
        && nextState.endTime.length > 0
      ) {
        const startDateTime = new Date(`${nextState.startDate}T${nextState.startTime}`).getTime()
        const endDateTime = new Date(`${nextState.endDate}T${nextState.endTime}`).getTime()
        payload.startDateTime = startDateTime
        payload.endDateTime = endDateTime
      }

      if (category === 'sermons') {
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
      this.onChange(newState)
      return true
    }
    return false
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
        title: event.target.value,
        initialTimestamp: new Date().getTime()
      })
    ) : (
      this.setState({ title: event.target.value })
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

    if (this.props.uid !== undefined && this.props.uid !== null) {
      if (this.props.readOnly === false) {
        return (
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              style={{
                width: this.props.browserWidth < 1145 ? '80%' : '60%',
                paddingTop: '80px'
              }}
            >
              <div>
                <p>
                  <a href='/admin' style={{ color: 'black' }}>
                    <button className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
                      <i className="material-icons">arrow_back</i>
                    </button>
                  </a>
                  <span style={{ paddingLeft: '8px' }}>ADMIN</span>
                </p>
              </div>

              <h2>
                {
                  this.props.language === 'EN' ? 'Create New Content' : (
                    this.props.language === '检体' ? '创建新内容' : '創建新內容'
                  )
                }
              </h2>

              <Title onChange={this.updateTitle} language={this.props.language} />

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
                  />
                ) : ''
              }

              {
                this.state.category === 'sermons' ? (
                  <SermonLink setSermonLink={this.setSermonLink} />
                ) : ''
              }

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '1px solid black'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <CategorySelect onClick={this.categoryChange} />
                  <CongregationSelect onClick={this.congregationChange} />
                </div>
                <SaveMode
                  onChange={this.saveModeToggle}
                  browserWidth={this.props.browserWidth}
                  saveMode={this.state.saveMode}
                />
              </div>
            </div>
          </div>
        )
      }
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
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
]

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    browserWidth: state.browserWidth,
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePost: (uid, title, content, mode) => dispatch(savePost(uid, title, content, mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditorExample)
