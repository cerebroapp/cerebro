import React, { PropTypes, Component } from 'react'

import { bind } from 'lodash-decorators'

import Loading from 'main/components/Loading'
import Header from './Header'
import Block from './Block'
import getDefinition from '../getDefinition'
import styles from './styles.css'

export default class Preview extends Component {
  static propTypes = {
    word: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.timeout = setTimeout(this.fetchDefinition, 100)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  @bind()
  fetchDefinition() {
    getDefinition(this.props.word).then(definition => {
      this.setState({
        ...definition,
        loading: false,
      })
    }).catch(() => {
      this.setState({ error: true })
    })
  }
  render() {
    const { error, loading, blocks, header, plain } = this.state
    if (error) return <div>Can't fetch dictionary results.</div>
    if (loading) return <Loading />
    return (
      <div className={styles.preview}>
        <Header header={header} />
        {blocks.map(block => <Block key={block} block={block} />)}
        {plain && <div>{plain}</div>}
      </div>
    )
  }
}
