import React from 'react'
import { connect } from 'react-redux'

const Results = ({ browserWidth, content, contentOrder, language, search }) => {
  const query = new RegExp(search, 'i')
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
  console.log(resultList);



  const resultBox = {
    position: 'absolute',
    width: browserWidth > 800 ? '50%' : '90%',
    left: browserWidth > 800 ? '25%' : '5%',
  }

  return (
    <div className='myFlex' style={resultBox}>
      <h3>
        {
          search && search.length > 0 ? (
            language === 'EN' ? `Search Results for '${search}':` : (
              language === '检体'
                ? `为 '${search}' 搜索的结果:`
                : `為 '${search}' 搜索的結果:`
            )
          ) : null
        }
      </h3>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    language: state.language,
    content: state.content,
    contentOrder: state.contentOrder,
    browserWidth: state.browserWidth
  }
}

export default connect(mapStateToProps)(Results)
