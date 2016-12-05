import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

class MonthNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('MonthNav render');
    const mnStyle = {
      width: this.props.browserWidth > 400 ? '10%' : '0%',
      border: '1px dotted green'
    }

    return (
      <div style={mnStyle}>
        months.
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(MonthNav)
