import React, { PropTypes, Component } from 'react';
import Loading from 'main/components/Loading';
import detectLanguage from '../detectLanguage';
import translate from '../translate';
import getTargetLanguage from '../getTargetLanguage';
import { LANGS, DISPLAY_NAMES } from '../constants';
import { bind } from 'lodash-decorators';
import { shell } from 'electron';

import styles from './styles.css';

// Detect source language and detect target language by it

export default class Preview extends Component {
  propTypes: {
    text: PropTypes.string,
    targetLang: PropTypes.string,
    sourceLang: PropTypes.string,
    translation: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      sourceLang: props.sourceLang,
      targetLang: props.targetLang,
      translation: props.translation,
    }
  }

  @bind()
  handleTranslation({lang, text}) {
    const [sourceLang, targetLang] = lang.split('-');
    this.setState({
      loading: false,
      translation: text,
      sourceLang,
      targetLang
    })
  }

  @bind()
  handleError() {
    this.setState({ error: true });
  }

  componentDidMount() {
    const { text, sourceLang, targetLang, translation } = this.props;
    const detect = sourceLang ? Promise.resolve(sourceLang) : detectLanguage(text);
    detect.then(from => {
      const to = targetLang || getTargetLanguage(from);
      return translate(text, `${from}-${to}`);
    }).then(this.handleTranslation).catch(this.handleError);
  }
  /**
   * Handle click on "Powered by..."
   */
  openYandexTranslate() {
    shell.openExternal('http://translate.yandex.com/');
  }
  /**
   * Get handler for chaning source or target language
   *
   * @param  {String} field
   * @return {Function}
   */
  onChangeLanguage(field) {
    return (event) => {
      this.setState({[field]: event.target.value}, () => {
        const {sourceLang, targetLang} = this.state;
        translate(this.props.text, `${sourceLang}-${targetLang}`).then(
          this.handleTranslation,
          this.handleError
        );
      });
    };
  }
  /**
   * Render language options list for select
   * @return {Component}
   */
  renderLanguages() {
    return LANGS.map(lang => <option value={lang}>{DISPLAY_NAMES[lang]}</option>);
  }
  render() {
    const { error, loading, translation, sourceLang, targetLang } = this.state;
    if (error) return <div>Can't translate.</div>;
    if (loading) return <Loading />;
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <select value={sourceLang} onChange={this.onChangeLanguage('sourceLang')}>
            {this.renderLanguages()}
          </select>
          →
          <select value={targetLang} onChange={this.onChangeLanguage('targetLang')}>
            {this.renderLanguages()}
          </select>
        </div>
        {translation.map(text => <div>{text}</div>)}
        <div className={styles.poweredBy} onClick={this.openYandexTranslate}>
          Powered by Yandex.Translate
        </div>
      </div>
    );
  }
}
