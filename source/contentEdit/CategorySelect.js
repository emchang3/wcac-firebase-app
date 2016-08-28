import React from 'react'
import { connect } from 'react-redux'


class CategorySelect extends React.Component {
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
            this.props.language === 'EN' ? 'Category' : (
              this.props.language === '检体' ? '类别' : '類別'
            )
          }
        </button>
        <div style={{ display: this.state.display, paddingLeft: '8px', paddingTop: '8px' }}>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="announcements"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'announcements' ? (
                <input
                  className="mdl-radio__button"
                  id="announcements"
                  name="category"
                  type="radio"
                  value="announcements"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="announcements"
                  name="category"
                  type="radio"
                  value="announcements"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Announcements' : (
                  this.props.language === '检体' ? '公告' : '公告'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="events"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'events' ? (
                <input
                  className="mdl-radio__button"
                  id="events"
                  name="category"
                  type="radio"
                  value="events"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="events"
                  name="category"
                  type="radio"
                  value="events"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Events' : (
                  this.props.language === '检体' ? '活动' : '活動'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="ministries"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'ministries' ? (
                <input
                  className="mdl-radio__button"
                  id="ministries"
                  name="category"
                  type="radio"
                  value="ministries"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="ministries"
                  name="category"
                  type="radio"
                  value="ministries"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Ministries' : (
                  this.props.language === '检体' ? '事工' : '事工'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="sermons"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'sermons' ? (
                <input
                  className="mdl-radio__button"
                  id="sermons"
                  name="category"
                  type="radio"
                  value="sermons"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="sermons"
                  name="category"
                  type="radio"
                  value="sermons"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Sermons' : (
                  this.props.language === '检体' ? '讲道' : '講道'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="statement"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'statement' ? (
                <input
                  className="mdl-radio__button"
                  id="statement"
                  name="category"
                  type="radio"
                  value="statement"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="statement"
                  name="category"
                  type="radio"
                  value="statement"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Statement of Faith' : (
                  this.props.language === '检体' ? '信仰' : '信仰'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="mission"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'mission' ? (
                <input
                  className="mdl-radio__button"
                  id="mission"
                  name="category"
                  type="radio"
                  value="mission"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="mission"
                  name="category"
                  type="radio"
                  value="mission"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Mission' : (
                  this.props.language === '检体' ? '任务' : '任務'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="staff"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'staff' ? (
                <input
                  className="mdl-radio__button"
                  id="staff"
                  name="category"
                  type="radio"
                  value="staff"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="staff"
                  name="category"
                  type="radio"
                  value="staff"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Staff' : (
                  this.props.language === '检体' ? '同工' : '同工'
                )
              }
            </span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="jobs"
            style={{ display: 'block', paddingBottom: '2px' }}
          >
            {
              this.props.category === 'jobs' ? (
                <input
                  className="mdl-radio__button"
                  id="jobs"
                  name="category"
                  type="radio"
                  value="jobs"
                  onClick={this.props.onClick}
                  checked
                />
              ) : (
                <input
                  className="mdl-radio__button"
                  id="jobs"
                  name="category"
                  type="radio"
                  value="jobs"
                  onClick={this.props.onClick}
                />
              )
            }
            <span className="mdl-radio__label">
              {
                this.props.language === 'EN' ? 'Jobs' : (
                  this.props.language === '检体' ? '工作' : '工作'
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

export default connect(mapStateToProps)(CategorySelect)
