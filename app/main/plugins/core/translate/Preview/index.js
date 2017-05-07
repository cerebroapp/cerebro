import React, { PropTypes, Component } from 'react'
import Loading from 'main/components/Loading'
import { Button } from 'main/components/Form'
import detectLanguage from '../detectLanguage'
import translate from '../translate'
import getTargetLanguage from '../getTargetLanguage'
import { LANGS, DISPLAY_NAMES } from '../constants'
import { bind } from 'lodash-decorators'
import sortBy from 'lodash/sortBy'
import Select from 'react-select'
import styles from './styles.css'


const OPTIONS = sortBy(LANGS, lang => DISPLAY_NAMES[lang]).map(lang => ({
  value: lang,
  label: DISPLAY_NAMES[lang]
}))

const WEB_URL = 'http://translate.yandex.com/'

// Detect source language and detect target language by it
class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      loading: true,
      sourceLang: props.sourceLang,
      targetLang: props.targetLang,
      translation: props.translation,
    }
  }

  componentDidMount() {
    const { text, sourceLang, targetLang, userLang } = this.props
    const detect = sourceLang ? Promise.resolve(sourceLang) : detectLanguage(text)
    detect.then(from => {
      const to = targetLang || getTargetLanguage(from, userLang)
      return translate(text, `${from}-${to}`)
    }).then(this.handleTranslation).catch(this.handleError)
  }

  /**
   * Get handler for chaning source or target language
   *
   * @param  {String} field
   * @return {Function}
   */
  onChangeLanguage(field) {
    return ({ value }) => {
      this.setState({ [field]: value }, this.updateTranslation )
    }
  }

  updateTranslation(){
    const { sourceLang, targetLang } = this.state
    translate(this.props.text, `${sourceLang}-${targetLang}`).then(
      this.handleTranslation,
      this.handleError
    )
  }

  swapLanguages() {
    return () => {
      this.setState(
        {
          sourceLang: this.state.targetLang,
          targetLang: this.state.sourceLang
        },
        this.updateTranslation
      )
    }
  }

  @bind()
  handleTranslation({ lang, text }) {
    const [sourceLang, targetLang] = lang.split('-')
    this.setState({
      loading: false,
      translation: text,
      sourceLang,
      targetLang
    })
  }

  @bind()
  handleError() {
    this.setState({ error: true })
  }

  render() {
    const { error, loading, translation, sourceLang, targetLang } = this.state
    if (error) return <div>Can't translate.</div>
    if (loading) return <Loading />
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <Select
            className={styles.select}
            value={sourceLang}
            options={OPTIONS}
            clearable={false}
            onChange={this.onChangeLanguage('sourceLang')}
          />
          <Button
            label="⇄"
            description='Swap languages'
            onClick={this.swapLanguages()}
          />
          <Select
            className={styles.select}
            value={targetLang}
            options={OPTIONS}
            clearable={false}
            onChange={this.onChangeLanguage('targetLang')}
          />
        </div>
        {translation.map(text => <div>{text}</div>)}
        <div className={styles.poweredBy} onClick={() => this.props.openUrl(WEB_URL)}>
          Powered by Yandex.Translate
        </div>
      </div>
    )
  }
}

Preview.propTypes = {
  openUrl: PropTypes.func.isRequired,
  userLang: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  targetLang: PropTypes.string,
  sourceLang: PropTypes.string,
  translation: PropTypes.string,
}

export default Preview
