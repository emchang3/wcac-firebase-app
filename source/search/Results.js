import React from 'react'
import { connect } from 'react-redux'

import SimpleArticle from '../contentPresentation/SimpleArticle'
import PageInput from './PageInput'

const Results = ({ browserWidth, content, contentOrder, language, search, searchPage }) => {
  const query = new RegExp(search, 'i')
  let numPages = 1
  let resultList = []
  if (content && contentOrder) {
    for (var i = 0; i < contentOrder.general.length; i++) {
      const title = content[contentOrder.general[i]].title
      if (title.match(query)) {
        resultList.push(contentOrder.general[i])
        continue
      }
      const blocks = content[contentOrder.general[i]].content.blocks
      const blockKeys = Object.keys(blocks)
      for (var j = 0; j < blockKeys.length; j++) {
        if (blocks[j].text.match(query)) {
          resultList.push(contentOrder.general[i])
          break
        }
      }
    }
  }
  numPages = Math.ceil(resultList.length / 10)

  let currentItems = []
  let c = (searchPage - 1) * 10
  while (c / 10 < searchPage && c < resultList.length) {
    currentItems.push(resultList[c])
    c++
  }

  const articleContainerStyle = {
    position: 'relative',
    width: '100%',
    maxHeight: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    overflowY: 'hidden'
  }

  let contentList = []

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

  const resultBox = {
    position: 'absolute',
    width: browserWidth > 800 ? '50%' : '90%',
    left: browserWidth > 800 ? '25%' : '5%',
  }

  const pageStyle = {
    position: 'absolute',
    width: '100%',
    top: '50px',
    pointerEvents: 'none'
  }

  const subHeader = contentList.length > 0 ? (
    <span>
      {
        language === 'EN' ? `Search results for '${search}':` : (
          language === '检体'
            ? `为 '${search}' 搜索的结果:`
            : `為 '${search}' 搜索的結果:`
        )
      }
    </span>
  ) : (
    <span>
      {
        language === 'EN' ? `No search results for '${search}.'` : (
          language === '检体'
            ? `为 '${search}' 搜索沒有结果。`
            : `為 '${search}' 搜索沒有結果。`
        )
      }
    </span>
  )

  return (
    <div className='myFlex' style={resultBox}>
      {
        search && search.length > 0 ? (
          <h3>
            {subHeader}
          </h3>
        ) : null
      }
      {
        search && search.length > 0 ? (
          <div style={pageStyle}>
            {contentList}
            <PageInput numPages={numPages} />
          </div>
        ) : null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    language: state.language,
    content: state.content,
    contentOrder: state.contentOrder,
    browserWidth: state.browserWidth,
    searchPage: state.searchPage
  }
}

export default connect(mapStateToProps)(Results)
