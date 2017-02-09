import React, { PropTypes, Component } from 'react'
import FileDetails from 'main/components/FileDetails'
import styles from './styles.css'

export default class Preview extends Component {
  static propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
  }
  render() {
    const { path, name, icon } = this.props
    return (
      <div>
        {icon &&
          <div className={styles.previewIcon}>
            <img src={icon} alt="" />
          </div>
        }
        <div className={styles.previewName}>{name}</div>
        <FileDetails path={path} key={path} skipName />
      </div>
    )
  }
}
