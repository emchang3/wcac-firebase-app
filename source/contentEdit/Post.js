import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import Draft from 'draft-js'

import { savePost } from '../actions'

import { CongregationSelect } from './CongregationSelect'

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
      category: '',
      title: ''
    }

    this.focus = () => {
      this.refs.editor.focus()
    }
    this.onChange = (editorState) => {
      this.setState({editorState})
    }

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    // this.readOnlyToggle = () => this._readOnlyToggle()
  }

  componentWillUpdate = (nextProps, nextState) => {
    const rawContentState = Draft.convertToRaw(nextState.editorState.getCurrentContent())
    const title = nextState.title || this.state.title
    const uid = this.props.uid
    const saveMode = nextState.saveMode || this.state.saveMode
    const congregation = nextState.congregation
    const payload = {
      uid: uid,
      title: title,
      content: rawContentState,
      congregation: congregation,
      mode: saveMode
    }
    this.props.savePost(payload)
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
    event.target.checked === true ? (
      this.setState({ saveMode: 'publish' })
    ) : (
      this.setState({ saveMode: 'draft' })
    )
  }

  updateTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  congregationChange = (event) => {
    this.setState({ congregation: event.target.value })
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
          <div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input"
                type="text"
                id="post-title"
                onChange={this.updateTitle}
              />
              <label className="mdl-textfield__label" htmlFor="post-title">Title...</label>
            </div>
            <div className="RichEditor-root">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  ref="editor"
                  spellCheck={true}
                  readOnly={this.props.readOnly}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black' }}>
              <div style={{ paddingLeft: '8px', paddingTop: '8px', paddingBottom: '8px' }}>
                <label
                  className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
                  htmlFor="flash1"
                  style={{ display: 'block' }}
                >
                  <input
                    className="mdl-radio__button"
                    id="flash1"
                    name="flash"
                    type="radio"
                    value="on"
                  />
                  <span className="mdl-radio__label">Always on</span>
                </label>
                <label
                  className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
                  htmlFor="flash2"
                  style={{ display: 'block' }}
                >
                  <input
                    className="mdl-radio__button"
                    id="flash2"
                    name="flash"
                    type="radio"
                    value="off"
                  />
                  <span className="mdl-radio__label">Always off</span>
                </label>
                <label
                  className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
                  htmlFor="flash3"
                  style={{ display: 'block' }}
                >
                  <input
                    className="mdl-radio__button"
                    id="flash3"
                    name="flash"
                    type="radio"
                    value="auto"
                  />
                  <span className="mdl-radio__label">Automatic</span>
                </label>
              </div>

              <CongregationSelect onClick={this.congregationChange} />

              <div style={{ paddingTop: '8px', paddingRight: '32px' }}>
                <label
                  htmlFor="saveSwitch"
                  className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
                >
                  <input type="checkbox"
                    id="saveSwitch"
                    className="mdl-switch__input"
                    onChange={this.saveModeToggle}
                  />
                  <span className="mdl-switch__label">Draft/Publish</span>
                </label>
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
    uid: state.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePost: (uid, title, content, mode) => dispatch(savePost(uid, title, content, mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditorExample)
