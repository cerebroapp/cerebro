import React, { PropTypes } from 'react'
import { Creatable } from 'react-select'
import styles from '../styles.css'

const Options = (props) => (
  <div className={styles.item}>
    <div className={styles.itemValue}>
      <Creatable
        multi={props.multi}
        value={props.value}
        placeholder={props.label}
        options={props.options}
        onChange={props.onChange}
      />
      {props.description
        ? <div className={styles.itemNotice}>{props.description}</div>
        : ''}
    </div>
  </div>
)

Options.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  multi: PropTypes.bool.isRequired,
}

export default Options
