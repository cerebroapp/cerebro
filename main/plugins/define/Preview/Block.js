import React from 'react';
import styles from './styles.css';

export default ({ block }) => {
  const lines = block.split('\n');
  return (
    <div className={styles.definition}>
      {lines.map(line => <p>{line}</p>)}
    </div>
  );
}
