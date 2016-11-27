import React, { PropTypes, Component } from 'react';
import Loading from 'main/components/Loading';
import detectLanguage from '../detectLanguage';
import translate from '../translate';
import getTargetLanguage from '../getTargetLanguage';
import { LANGS, DISPLAY_NAMES } from '../constants';
import { bind } from 'lodash-decorators';
import Select from 'react-select';
import styles from './styles.css';


const OPTIONS = LANGS.map(lang => ({
  value: lang,
  label: DISPLAY_NAMES[lang]
}));

// Detect source language and detect target language by it

export default class Preview extends Component {
  propTypes: {
    text: PropTypes.string,
    targetLang: PropTypes.string,
    sourceLang: PropTypes.string,
    translation: PropTypes.string,
    openUrl: PropTypes.func,
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
    this.props.openUrl('http://translate.yandex.com/');
  }
  /**
   * Get handler for chaning source or target language
   *
   * @param  {String} field
   * @return {Function}
   */
  onChangeLanguage(field) {
    return ({value}) => {
      this.setState({[field]: value}, () => {
        const {sourceLang, targetLang} = this.state;
        translate(this.props.text, `${sourceLang}-${targetLang}`).then(
          this.handleTranslation,
          this.handleError
        );
      });
    };
  }
  render() {
    const { error, loading, translation, sourceLang, targetLang } = this.state;
    if (error) return <div>Can't translate.</div>;
    if (loading) return <Loading />;
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
          →
          <Select
            className={styles.select}
            value={targetLang}
            options={OPTIONS}
            clearable={false}
            onChange={this.onChangeLanguage('targetLang')}
          />
        </div>
        {translation.map(text => <div>{text}</div>)}
        <div className={styles.poweredBy} onClick={this.openYandexTranslate}>
          Powered by Yandex.Translate
        </div>
      </div>
    );
  }
}
