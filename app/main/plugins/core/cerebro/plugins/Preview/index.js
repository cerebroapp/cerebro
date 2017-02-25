import React, { PropTypes, Component } from 'react'
import Preload from 'main/components/Preload'
import KeyboardNav from 'main/components/KeyboardNav'
import KeyboardNavItem from 'main/components/KeyboardNavItem'
import ActionButton from './ActionButton.js'
import getReadme from '../getReadme'
import ReactMarkdown from 'react-markdown'
import styles from './styles.css'
import trackEvent from 'lib/trackEvent'
import * as format from '../format'
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
    this.onComplete = this.onComplete.bind(this)
    this.state = {
      showDescription: false,
    }
  }

  pluginAction(plugin, runningAction) {
    return () => {
      this.setState({ runningAction })
      trackEvent({
        category: 'Plugins',
        event: runningAction,
        label: plugin
      })
      client[runningAction](plugin)
    }
  }

  onComplete() {
    this.setState({ runningAction: null })
    this.props.onComplete()
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
    const githubRepo = repo && repo.match(/^.+github.com\/([^\/]+\/[^\/]+).*?/)
    const runningAction = this.state.runningAction
    return (
      <div className={styles.preview} key={name}>
        <h2>{format.name(name)} ({version})</h2>
        <p>{format.description(description)}</p>
        <KeyboardNav>
          <div className={styles.header}>
            {
              !isInstalled &&
                <ActionButton
                  action={this.pluginAction(name, 'install')}
                  text={runningAction === 'install' ? 'Installing...' : 'Install'}
                  onComplete={this.onComplete}
                />
            }
            {
              isInstalled &&
                <ActionButton
                  action={this.pluginAction(name, 'uninstall')}
                  text={runningAction === 'uninstall' ? 'Uninstalling...' : 'Uninstall'}
                  onComplete={this.onComplete}
                />
            }
            {
              isUpdateAvailable &&
                <ActionButton
                  action={this.pluginAction(name, 'update')}
                  text={runningAction === 'update' ? 'Updating...' : `Update (${installedVersion} → ${version})`}
                  onComplete={this.onComplete}
                />
            }
            {
              githubRepo &&
                <KeyboardNavItem onSelect={() => this.setState({ showDescription: true })}>Details</KeyboardNavItem>
            }
          </div>
        </KeyboardNav>
        {this.state.showDescription && this.renderDescription(githubRepo[1])}
      </div>
    )
  }
}
