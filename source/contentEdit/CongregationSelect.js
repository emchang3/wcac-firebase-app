import React from 'react'

export class CongregationSelect extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{ paddingLeft: '8px', paddingTop: '8px', paddingBottom: '8px' }}>
        <label
          className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
          htmlFor="english"
          style={{ display: 'block' }}
        >
          <input
            className="mdl-radio__button"
            id="english"
            name="congregation"
            type="radio"
            value="english"
            onClick={this.props.onClick}
          />
          <span className="mdl-radio__label">English</span>
        </label>
        <label
          className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
          htmlFor="cantonese"
          style={{ display: 'block' }}
        >
          <input
            className="mdl-radio__button"
            id="cantonese"
            name="congregation"
            type="radio"
            value="cantonese"
            onClick={this.props.onClick}
          />
          <span className="mdl-radio__label">Cantonese</span>
        </label>
        <label
          className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
          htmlFor="mandarin"
          style={{ display: 'block' }}
        >
          <input
            className="mdl-radio__button"
            id="mandarin"
            name="congregation"
            type="radio"
            value="mandarin"
            onClick={this.props.onClick}
          />
          <span className="mdl-radio__label">Mandarin</span>
        </label>
        <label
          className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
          htmlFor="youth"
          style={{ display: 'block' }}
        >
          <input
            className="mdl-radio__button"
            id="youth"
            name="congregation"
            type="radio"
            value="youth"
            onClick={this.props.onClick}
          />
          <span className="mdl-radio__label">Youth Group</span>
        </label>
      </div>
    )
  }
}
