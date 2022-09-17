import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { KeyboardNav, KeyboardNavItem } from '@cerebroapp/cerebro-ui'
import { client } from 'lib/plugins'
import plugins from 'plugins'
import ReactMarkdown from 'react-markdown'

import ActionButton from './ActionButton.js'
import Settings from './Settings'
import getReadme from '../getReadme'
import styles from './styles.module.css'
import * as format from '../format'

function Description({ repoName }) {
  const isRelative = (src) => !src.match(/^(https?:|data:)/)

  const urlTransform = (src) => {
    if (isRelative(src)) return `http://raw.githubusercontent.com/${repoName}/master/${src}`
    return src
  }

  const [readme, setReadme] = useState(null)

  useEffect(() => { getReadme(repoName).then(setReadme) }, [])

  if (!readme) return null

  return (
    <ReactMarkdown className={styles.markdown} transformImageUri={(src) => urlTransform(src)}>
      {readme}
    </ReactMarkdown>
  )
}

Description.propTypes = {
  repoName: PropTypes.string.isRequired
}

function Preview({ onComplete, plugin }) {
  const [runningAction, setRunningAction] = useState(null)
  const [showDescription, setShowDescription] = useState(null)
  const [showSettings, setShowSettings] = useState(null)

  const onCompleteAction = () => {
    setRunningAction(null)
    onComplete()
  }

  const pluginAction = (pluginName, runningActionName) => () => [
    setRunningAction(runningActionName),
    client[runningAction](pluginName)
  ]

  const {
    name, version, description, repo,
    isInstalled = false,
    isDebugging = false,
    installedVersion,
    isUpdateAvailable = false
  } = plugin

  const githubRepo = repo && repo.match(/^.+github.com\/([^\/]+\/[^\/]+).*?/)
  const settings = plugins[name] ? plugins[name].settings : null
  return (
    <div className={styles.preview} key={name}>
      <h2>{`${format.name(name)} (${version})`}</h2>

      <p>{format.description(description)}</p>
      <KeyboardNav>
        <div className={styles.header}>

          { settings && (
          <KeyboardNavItem onSelect={() => setShowSettings((prev) => !prev)}>
            Settings
          </KeyboardNavItem>
          )}

          {showSettings && <Settings name={name} settings={settings} />}

          { !isInstalled && !isDebugging && (
          <ActionButton
            action={pluginAction(name, 'install')}
            text={runningAction === 'install' ? 'Installing...' : 'Install'}
            onComplete={onCompleteAction}
          />
          )}

          { isInstalled && (
          <ActionButton
            action={pluginAction(name, 'uninstall')}
            text={runningAction === 'uninstall' ? 'Uninstalling...' : 'Uninstall'}
            onComplete={onCompleteAction}
          />
          )}

          { isUpdateAvailable && (
          <ActionButton
            action={pluginAction(name, 'update')}
            text={runningAction === 'update' ? 'Updating...' : `Update (${installedVersion} → ${version})`}
            onComplete={onCompleteAction}
          />
          )}

          { githubRepo && (
          <KeyboardNavItem onSelect={() => setShowDescription((prev) => !prev)}>
            Details
          </KeyboardNavItem>
          )}

        </div>
      </KeyboardNav>
      {showDescription && <Description repoName={githubRepo[1]} />}
    </div>
  )
}

Preview.propTypes = {
  plugin: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default Preview
