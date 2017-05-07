import React, { PropTypes } from 'react'
import styles from './styles.css'

const Button = ({ label, onClick, description }) => (
  <button
    title={description}
    onClick={({ target }) => onClick(target)}
    className={styles.button}>{label}</button>
)

Button.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
}

export default Button
