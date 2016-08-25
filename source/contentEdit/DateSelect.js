import React from 'react'


export const DateSelect = ({
  updateStartDate,
  updateStartTime,
  updateEndDate,
  updateEndTime,
  startDate,
  startTime,
  endDate,
  endTime
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}>
        <div style={{ paddingTop: '25px', paddingLeft: '16px', fontSize: '1.1em' }}>
          Start:
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '300px' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}>
        <div style={{ paddingTop: '25px', paddingLeft: '16px', fontSize: '1.1em' }}>
          End:
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '300px' }}>
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
