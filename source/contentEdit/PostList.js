import React from 'react'
import { connect } from 'react-redux'

import { sortBy, reverse } from 'lodash'

import PostListItem from './PostListItem'
import { Return } from './Return'


const PostList = ({ uid, content, language, browserWidth }) => {
  if (uid !== undefined && uid !== null) {
    const contentList = reverse(sortBy(content, (contentItem) => {
      return contentItem.timestamp
    })).map((contentItem) => {
      return <PostListItem content={contentItem} key={contentItem.initialTimestamp} />
    })
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: browserWidth < 1145 ? '80%' : '60%',
            paddingTop: '80px'
          }}
        >
          <Return url={'/admin'} language={language} />

          <h2>
            {
              language === 'EN' ? 'Posts' : (
                language === '检体' ? '条目' : '條目'
              )
            }
          </h2>

          <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">
                  {
                    language === 'EN' ? 'Title' : (
                      language === '检体' ? '标题' : '標題'
                    )
                  }
                </th>
                <th className="mdl-data-table__cell--non-numeric">
                  {
                    language === 'EN' ? 'Category' : (
                      language === '检体' ? '类别' : '類別'
                    )
                  }
                </th>
                <th className="mdl-data-table__cell--non-numeric">
                  {
                    language === 'EN' ? 'Congregation' : (
                      language === '检体' ? '会堂' : '會堂'
                    )
                  }
                </th>
                <th
                  className="mdl-data-table__cell--non-numeric"
                  style={{ textAlign: 'right', paddingRight: '26px' }}
                >
                  {
                    language === 'EN' ? 'Save Mode' : (
                      language === '检体' ? '保存模式' : '保存模式'
                    )
                  }
                </th>
                <th className="mdl-data-table__cell--non-numeric" style={{ textAlign: 'right' }}>
                </th>
              </tr>
            </thead>
            <tbody>
              {contentList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{`You're not authorized to be here.`}</h2>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    browserWidth: state.browserWidth,
    language: state.language,
    content: state.content
  }
}

export default connect(mapStateToProps)(PostList)
