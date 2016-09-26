import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

const DateSelect = ({
  updateStartDate,
  updateStartTime,
  updateEndDate,
  updateEndTime,
  startDate,
  startTime,
  endDate,
  endTime,
  language
}) => {
  return (
    <div>
      <div
        className='myFlex'
        style={{
          justifyContent: 'space-between',
          maxWidth: '300px'
        }}
      >
        <div style={{ paddingTop: '25px', paddingLeft: '16px', fontSize: '1.1em' }}>
          {
            language === 'EN' ? 'Start:' : (
              language === '检体' ? '从' : '從'
            )
          }
        </div>
        <div className="mdl-textfield mdl-js-textfield" style={{ width: '200px' }}>
          <input
            className="mdl-textfield__input"
            type="date"
            id="start-date"
            onChange={updateStartDate}
            value={startDate}
          />
        </div>
      </div>
      <div
        className='myFlex'
        style={{
          justifyContent: 'flex-end',
          maxWidth: '300px'
        }}
      >
        <div className="mdl-textfield mdl-js-textfield" style={{ width: '200px' }}>
          <input
            className="mdl-textfield__input"
            type="time"
            id="start-time"
            onChange={updateStartTime}
            value={startTime}
          />
        </div>
      </div>
      <br />
      <div
        className='myFlex'
        style={{
          justifyContent: 'space-between',
          maxWidth: '300px'
        }}
      >
        <div style={{ paddingTop: '25px', paddingLeft: '16px', fontSize: '1.1em' }}>
          {
            language === 'EN' ? 'End:' : (
              language === '检体' ? '到' : '到'
            )
          }
        </div>
        <div className="mdl-textfield mdl-js-textfield" style={{ width: '200px' }}>
          <input
            className="mdl-textfield__input"
            type="date"
            id="end-date"
            onChange={updateEndDate}
            value={endDate}
          />
        </div>
      </div>
      <div
        className='myFlex'
        style={{
          justifyContent: 'flex-end',
          maxWidth: '300px'
        }}
      >
        <div className="mdl-textfield mdl-js-textfield" style={{ width: '200px' }}>
          <input
            className="mdl-textfield__input"
            type="time"
            id="end-time"
            onChange={updateEndTime}
            value={endTime}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(DateSelect)
