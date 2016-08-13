import React from 'react'

export class CategorySelect extends React.Component {
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
      <div style={{ paddingLeft: '8px', paddingTop: '8px', paddingBottom: '8px', paddingRight: '16px' }}>
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect"
          onClick={this.openOptions}
          style={{ paddingBottom: '8px' }}
        >
          Category
        </button>
        <div style={{ display: this.state.display, paddingLeft: '8px' }}>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="announcements"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="announcements"
              name="category"
              type="radio"
              value="announcements"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Announcement</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="events"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="events"
              name="category"
              type="radio"
              value="events"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Event</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="ministries"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="ministries"
              name="category"
              type="radio"
              value="ministries"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Ministry</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="statement"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="statement"
              name="category"
              type="radio"
              value="statement"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Statement of Faith</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="mission"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="mission"
              name="category"
              type="radio"
              value="mission"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Mission</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="staff"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="staff"
              name="category"
              type="radio"
              value="staff"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Staff</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="jobs"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            <input
              className="mdl-radio__button"
              id="jobs"
              name="category"
              type="radio"
              value="jobs"
              onClick={this.props.onClick}
            />
            <span className="mdl-radio__label">Jobs</span>
          </label>
        </div>
      </div>
    )
  }
}
