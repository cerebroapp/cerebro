import React from 'react'
import Preview from './Preview'
import { search } from 'cerebro-tools'
import uniq from 'lodash/uniq'
import initializeAsync from './initializeAsync'
import { shell } from 'electron'

let appsList = []

const toString = (app) => `${app.name} ${app.filename}`

const fn = ({ term, actions, display }) => {
  const result = search(appsList, term, toString).map(file => {
    const { path, name, description } = file
    return {
      id: path,
      title: name,
      term: name,
      subtitle: description || path,
      clipboard: path,
      onKeyDown: (event) => {
        if (event.ctrlKey && event.keyCode === 82) {
          // Show application by ctrl+R shortcut
          actions.reveal(path)
          event.preventDefault()
        }
      },
      onSelect: () => shell.openItem(path),
      getPreview: () => <Preview name={name} path={path} />
    }
  })
  display(result)
}

export default {
  fn,
  initializeAsync,
  onMessage: (apps) => {
    appsList = uniq([...appsList, ...apps])
  }
}
