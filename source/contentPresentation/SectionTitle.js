import React from 'react' // eslint-disable-line no-unused-vars

export const SectionTitle = ({ sectionTitle, top }) => {
  return (
    <h2 style={{ position: 'absolute', top: top, paddingLeft: '32px' }}>
      {sectionTitle}
    </h2>
  )
}
