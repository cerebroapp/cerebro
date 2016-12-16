import React from 'react'

import WithFetchedFile from './WithFetchedFile'
import ReactMarkdown from 'react-markdown'
import styles from './styles/index.css'

const Markdown = ({ path }) => (
  <WithFetchedFile path={path}>
    {(source) => <ReactMarkdown source={source} className={styles.previewText} />}
  </WithFetchedFile>
)

Markdown.propTypes = {
  path: React.PropTypes.string.isRequired
}

export default Markdown
