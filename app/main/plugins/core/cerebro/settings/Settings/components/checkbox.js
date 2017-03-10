import React, { PropTypes } from 'react'
import styles from '../styles.css'

const Checkbox = (props) => (
  <div className={styles.item}>
    <div className={styles.itemValueWithoutLabel}>
      <label>
        <input
          type="checkbox"
          checked={!!props.value}
          onChange={props.onChange}
          className={styles.checkbox}
        />
        {props.description}
      </label>
    </div>
  </div>
)

Checkbox.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
}

export default Checkbox
