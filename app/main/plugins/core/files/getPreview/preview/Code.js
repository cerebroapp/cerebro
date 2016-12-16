import React from 'react'

import WithFetchedFile from './WithFetchedFile'
import Prism from 'prismjs'
import styles from './styles/index.css'

const Highlight = ({ source, lang }) => {
  const prismLang = Prism.languages[lang] || Prism.languages.markup
  const innerHtml = {
    __html: Prism.highlight(source, prismLang)
  }
  return (
    <pre className={`language-${lang}`}>
      <code
        className={`language-${lang}`}
        dangerouslySetInnerHTML={innerHtml}
      />
    </pre>
  )
}

Highlight.propTypes = {
  source: React.PropTypes.string.isRequired,
  lang: React.PropTypes.string,
}

const Code = ({ path }) => {
  const lang = path.match(/\.([^\.]+)$/)[1]
  return (
    <WithFetchedFile path={path}>
      {
        (source) => (
          <div className={styles.previewCode}>
            <Highlight source={source} lang={lang} />
          </div>
        )
      }
    </WithFetchedFile>
  )
}

Code.propTypes = {
  path: React.PropTypes.string.isRequired
}

export default Code
