import React, { PropTypes } from 'react'
import styles from './styles.css'

const Block = ({ block }) => {
  const lines = block.split('\n')
  return (
    <div className={styles.definition}>
      {lines.map(line => <p key={line}>{line}</p>)}
    </div>
  )
}

Block.propTypes = {
  block: PropTypes.string.isRequired
}

export default Block
