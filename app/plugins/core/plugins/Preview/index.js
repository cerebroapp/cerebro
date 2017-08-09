import React, { PropTypes, Component } from 'react'
import { KeyboardNav, KeyboardNavItem, Preload } from 'cerebro-ui'
import ActionButton from './ActionButton.js'
import Settings from './Settings'
import getReadme from '../getReadme'
import ReactMarkdown from 'react-markdown'
import styles from './styles.css'
import { trackEvent } from 'lib/trackEvent'
import * as format from '../format'
import { client } from 'lib/plugins'
import plugins from 'plugins'

const isRelative = (src) => !src.match(/^(https?:|data:)/)
const urlTransform = (repo, src) => {
  if (isRelative(src)) {
    return `http://raw.githubusercontent.com/${repo}/master/${src}`
  }
  return src
}

class Preview extends Component {
  constructor(props) {
    super(props)
    this.onComplete = this.onComplete.bind(this)
    this.state = {
      showDescription: false,
      showSettings: false,
    }
  }

  onComplete() {
    this.setState({ runningAction: null })
    this.props.onComplete()
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
      isDebugging,
      installedVersion,
      isUpdateAvailable
    } = this.props
    const githubRepo = repo && repo.match(/^.+github.com\/([^\/]+\/[^\/]+).*?/)
    const { runningAction, showSettings } = this.state
    const settings = plugins[name] ? plugins[name].settings : null
    return (
      <div className={styles.preview} key={name}>
        <h2>{format.name(name)} ({version})</h2>
        <p>{format.description(description)}</p>
        <KeyboardNav>
          <div className={styles.header}>
            {
              settings &&
                <KeyboardNavItem
                  onSelect={() => this.setState({ showSettings: !this.state.showSettings })}
                >
                  Settings
                </KeyboardNavItem>
            }
            {showSettings && <Settings name={name} settings={settings} />}
            {
              !isInstalled && !isDebugging &&
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
                  text={
                    runningAction === 'update'
                      ? 'Updating...'
                      : `Update (${installedVersion} → ${version})`
                  }
                  onComplete={this.onComplete}
                />
            }
            {
              githubRepo &&
                <KeyboardNavItem
                  onSelect={() => this.setState({ showDescription: !this.state.showDescription })}
                >
                  Details
                </KeyboardNavItem>
            }
          </div>
        </KeyboardNav>
        {this.state.showDescription && this.renderDescription(githubRepo[1])}
      </div>
    )
  }
}

Preview.propTypes = {
  name: PropTypes.string.isRequired,
  settings: PropTypes.object,
  version: PropTypes.string.isRequired,
  description: PropTypes.string,
  repo: PropTypes.string,
  installedVersion: PropTypes.string,
  isInstalled: PropTypes.bool.isRequired,
  isDebugging: PropTypes.bool,
  isUpdateAvailable: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default Preview
