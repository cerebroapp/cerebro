import React, { PropTypes, Component } from 'react'
import Preload from 'main/components/Preload'
import KeyboardNav from 'main/components/KeyboardNav'
import KeyboardNavItem from 'main/components/KeyboardNavItem'
import ActionButton from './ActionButton.js'
import getReadme from '../getReadme'
import ReactMarkdown from 'react-markdown'
import styles from './styles.css'
import trackEvent from 'lib/trackEvent'
import { client } from 'lib/plugins'

const isRelative = (src) => !src.match(/^(https?:|data:)/)
const urlTransform = (repo, src) => {
  if (isRelative(src)) {
    return `http://raw.githubusercontent.com/${repo}/master/${src}`
  }
  return src
}

export default class Preview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    description: PropTypes.string,
    repo: PropTypes.string,
    installedVersion: PropTypes.string,
    isInstalled: PropTypes.bool.isRequired,
    isUpdateAvailable: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onShowDescription = this.onShowDescription.bind(this)
    this.state = {
      showDescription: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({ showDescription: false })
    }
  }

  onShowDescription() {
    this.setState({ showDescription: true })
  }

  pluginAction(plugin, action) {
    trackEvent({
      category: 'Plugins',
      event: action,
      label: plugin
    })
    return () => client[action](plugin)
  }

  renderDescription(repo) {
    return (
      <Preload promise={getReadme(repo)}>
        {
          (content) => (
            <ReactMarkdown
              source={content}
              className={styles.markdown}
              transformImageUri={(src) => urlTransform(repo, src)}
            />
          )
        }
      </Preload>
    )
  }

  render() {
    const {
      name,
      version,
      description,
      repo,
      isInstalled,
      installedVersion,
      isUpdateAvailable
    } = this.props
    const match = repo && repo.match(/^.+github.com\/([^\/]+\/[^\/]+).*?/)
    return (
      <div className={styles.preview} key={name}>
        <h2>{name} ({version})</h2>
        <p>{description}</p>
        <KeyboardNav>
          <div className={styles.header}>
            {
              !isInstalled &&
                <ActionButton
                  action={this.pluginAction(name, 'install')}
                  text="Install"
                  loadingText="Installing"
                />
            }
            {
              isInstalled &&
                <ActionButton
                  action={this.pluginAction(name, 'uninstall')}
                  text="Uninstall"
                  loadingText="Uninstalling"
                />
            }
            {
              isUpdateAvailable &&
                <ActionButton
                  action={this.pluginAction(name, 'update')}
                  text={`Update (${installedVersion} → ${version})`}
                  loadingText="Updating"
                />
            }
            {
              match &&
                <KeyboardNavItem onSelect={this.onShowDescription}>Details</KeyboardNavItem>
            }
          </div>
        </KeyboardNav>
        {this.state.showDescription && this.renderDescription(match[1])}
      </div>
    )
  }
}
