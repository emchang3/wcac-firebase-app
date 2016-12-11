import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import SimpleArticle from './SimpleArticle' // eslint-disable-line no-unused-vars
import PageInput from './PageInput'
import SocialMedia from '../socialMedia/SocialMedia'
import MonthNav from './MonthNav'

const ArticleList = ({ browserWidth, category, contentOrder, categoryPage }) => {
  let contentList = []
  let numPages = 1

  if (category && contentOrder) {
    const generalOrder = contentOrder[`${category}`]
    numPages = Math.ceil(generalOrder.length / 10)

    let currentItems = []
    let c = (categoryPage - 1) * 10
    while (c / 10 < categoryPage && c < generalOrder.length) {
      currentItems.push(generalOrder[c])
      c++
    }

    const articleContainerStyle = {
      position: 'relative',
      justifyContent: 'center',
      overflowY: 'hidden',
      border: '1px dotted blue'
    }
    if (browserWidth > 600) {
      articleContainerStyle.minHeight = '300px'
    }

    contentList = currentItems.map((initialTimestamp) => {
      return (
        <div className='myFlex' style={articleContainerStyle} key={initialTimestamp}>
          { browserWidth > 400 ? <SocialMedia initialTimestamp={initialTimestamp} /> : null }
          <SimpleArticle
            initialTimestamp={initialTimestamp}
            spot={currentItems.indexOf(initialTimestamp)}
          />
        </div>
      )
    })
  }

  const pageStyle = {
    position: 'absolute',
    width: '100%',
    top: '100px',
    pointerEvents: 'none',
    justifyContent: 'center'
  }

  return (
    <div className='myFlex' style={pageStyle}>
      <div style={{ width: browserWidth > 600 ? '60%' : '90%' }}>
        {contentList}
      </div>
      {
        numPages > 1 ? (
          <PageInput category={category} categoryPage={categoryPage} numPages={numPages} />
        ) : null
      }
    </div>
  )
}
// { browserWidth > 600 ? <MonthNav /> : null }

const mapStateToProps = (state, ownProps) => {
  return {
    browserWidth: state.browserWidth,
    browserHeight: state.browserHeight,
    contentOrder: state.contentOrder,
    categoryPage: state[`${ownProps.category}Page`]
  }
}

export default connect(mapStateToProps)(ArticleList)
