import React from 'react'
import { connect } from 'react-redux'

class CongregationSelect extends React.Component {
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
          {
            this.props.language === 'EN' ? 'Congregation' : (
              this.props.language === '检体' ? '会堂' : '會堂'
            )
          }
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
              checked={ this.props.congregation === 'english' ? true : false }
            />
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'English' : (
                  this.props.language === '检体' ? '英语堂' : '英語堂'
                )
              }
            </span>
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
              checked={ this.props.congregation === 'cantonese' ? true : false }
            />
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Cantonese' : (
                  this.props.language === '检体' ? '粵语堂' : '粵語堂'
                )
              }
            </span>
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
              checked={ this.props.congregation === 'mandarin' ? true : false }
            />
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Mandarin' : (
                  this.props.language === '检体' ? '国语堂' : '國語堂'
                )
              }
            </span>
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
              checked={ this.props.congregation === 'youth' ? true : false }
            />
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Youth' : (
                  this.props.language === '检体' ? '青年团契' : '青年團契'
                )
              }
            </span>
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(CongregationSelect)
