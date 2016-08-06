import React, { PropTypes, Component } from 'react';
import Loading from 'main/components/Loading';
import translate from '../translate';
import { LANGS, DISPLAY_NAMES } from '../constants';
import { bind } from 'lodash-decorators';
import { shell } from 'electron';

import styles from './styles.css';

export default class Preview extends Component {
  propTypes: {
    text: PropTypes.string,
    to: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      from: null,
      to: props.to,
    }
  }

  @bind()
  handleTranslation({lang, text}) {
    const [from, to] = lang.split('-');
    this.setState({
      loading: false,
      translation: text,
      from,
      to
    })
  }

  @bind()
  handleError() {
    this.setState({error: true});
  }

  componentDidMount() {
    const { text, to } = this.props;
    translate(text, to).then(
      this.handleTranslation,
      this.handleError
    );
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
        const {from, to} = this.state;
        translate(this.props.text, `${from}-${to}`).then(
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
    const { error, loading, translation, from, to } = this.state;
    if (error) return <div>Can't translate.</div>;
    if (loading) return <Loading />;
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <select value={from} onChange={this.onChangeLanguage('from')}>
            {this.renderLanguages()}
          </select>
          →
          <select value={to} onChange={this.onChangeLanguage('to')}>
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
