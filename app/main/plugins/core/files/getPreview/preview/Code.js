import React from 'react'

import WithFetchedFile from './WithFetchedFile'
import Highlight from 'react-highlight'
import styles from './styles.css'

const Code = ({ path }) => {
  const language = path.match(/\.(.+)$/)[1]
  return (
    <WithFetchedFile path={path}>
      {
        (source) => (
          <div className={styles.previewCode}>
            <Highlight className={language}>
              {source}
            </Highlight>
          </div>
        )
      }
    </WithFetchedFile>
  )
}

Code.propTypes = {
  path: React.PropTypes.string.isRequired
}

export default Code
