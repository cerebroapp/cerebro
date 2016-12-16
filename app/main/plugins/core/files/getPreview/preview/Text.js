import React from 'react'

import WithFetchedFile from './WithFetchedFile'
import styles from './styles/index.css'

const Text = ({ path }) => (
  <WithFetchedFile path={path}>
    {(source) => <pre className={styles.previewText}>{source}</pre>}
  </WithFetchedFile>
)

Text.propTypes = {
  path: React.PropTypes.string.isRequired,
}

export default Text
