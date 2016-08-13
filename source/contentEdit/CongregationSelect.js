import React from 'react'


export class CongregationSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'none'
    }
  }

  openOptions = (event) => {
    this.state.display === 'none'
      ? this.setState({ display: 'block' })
      : this.setState({ display: 'none' })
  }

  render() {
    return (
      <div
        style={{
          paddingLeft: '8px',
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingRight: '16px'
        }}
      >
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect"
          onClick={this.openOptions}
        >
          Congregation
        </button>
        <div style={{ display: this.state.display, paddingLeft: '8px' }}>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="english"
            style={{ display: 'block', paddingBottom: '2px' }}
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
            style={{ display: 'block', paddingBottom: '2px' }}
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
            style={{ display: 'block', paddingBottom: '2px' }}
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
            style={{ display: 'block', paddingBottom: '2px' }}
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
      </div>
    )
  }
}
