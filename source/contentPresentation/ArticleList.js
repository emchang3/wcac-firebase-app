import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import SimpleArticle from './SimpleArticle' // eslint-disable-line no-unused-vars

const ArticleList = ({ browserWidth, category, contentOrder, categoryPage }) => {
  let contentList = []

  if (category && contentOrder) {
    const generalOrder = contentOrder[`${category}`]
    // const numPages = Math.ceil(generalOrder.length / 10)

    let currentItems = []
    let c = (categoryPage - 1) * 10
    while (c / 10 < categoryPage && c < generalOrder.length) {
      currentItems.push(generalOrder[c])
      c++
    }

    const articleContainerStyle = {
      position: 'relative',
      width: browserWidth > 800 ? '50%' : '90%',
      left: browserWidth > 800 ? '25%' : '5%',
      maxHeight: '300px',
      // maxHeight: '300px',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'space-between',
      // border: '1px dotted red',
      overflowY: 'hidden'
    }

    contentList = currentItems.map((initialTimestamp) => {
      return (
        <div className='myFlex' style={articleContainerStyle} key={initialTimestamp}>
          <SimpleArticle
            initialTimestamp={initialTimestamp}
            spot={currentItems.indexOf(initialTimestamp)}
          />
          <div
            className='coverBottom'
            style={{
              position: 'absolute',
              left: '0%',
              width: '100%',
              top: '50%',
              height: '50%',
              pointerEvents: 'auto'
              // border: '1px solid green'
            }}
          >
            <a
              href={`/view/${initialTimestamp}`}
              style={{
                position: 'absolute',
                bottom: '0%',
                right: '0%',
                color: 'black',
                textDecoration: 'none'
              }}
            >
              <button
                className="mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect"
              >
                Read more...
              </button>
            </a>
          </div>
        </div>
      )
    })
  }

  const pageStyle = {
    position: 'absolute',
    width: '100%',
    // height: '100%',
    top: '50px',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // border: '1px solid blue',
    pointerEvents: 'none'
  }

  return (
    <div style={pageStyle}>
      {contentList}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    browserWidth: state.browserWidth,
    browserHeight: state.browserHeight,
    contentOrder: state.contentOrder,
    categoryPage: state[`${ownProps.category}Page`]
  }
}

export default connect(mapStateToProps)(ArticleList)
