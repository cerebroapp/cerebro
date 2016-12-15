import React, { PropTypes, Component } from 'react'
import { debounce, bind } from 'lodash-decorators'
import Loading from 'main/components/Loading'

if (typeof window !== 'undefined') {
  require('pdfjs-dist/build/pdf.combined') // eslint-disable-line global-require
  require('pdfjs-dist/web/compatibility') // eslint-disable-line global-require
}

import styles from './styles.css'


export default class Pdf extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      pages: 1,
      renderedPages: {},
      loading: true,
      viewports: {},
    }
  }

  componentDidMount() {
    this.fetchPdf(this.props.path)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.path !== this.props.path) {
      this.setState({ loading: true })
      this.fetchPdf(newProps.path)
    }
  }

  @bind()
  @debounce(100)
  onScroll() {
    const { clientHeight } = this.refs.wrapper
    for (let i = 1; i <= this.state.pages; i++) {
      const page = this.refs[`page-${i}`]
      const { top, bottom } = page.getBoundingClientRect()
      if (bottom < 0) continue
      if (top > clientHeight) break
      if (bottom > 0) {
        this.showPage(i)
      }
    }
  }

  showPage(page) {
    const { pdf, renderedPages, viewports } = this.state
    if (renderedPages[page]) return
    pdf.getPage(page).then(content => {
      const viewport = content.getViewport(1.0)
      this.setState({
        renderedPages: {
          ...renderedPages,
          [page]: true,
        },
        viewports: {
          ...viewports,
          [page]: viewport,
        }
      })
      const canvas = this.refs[`page-${page}`]
      const canvasContext = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      content.render({ canvasContext, viewport })
    })
  }

  fetchPdf(path) {
    window.PDFJS.getDocument(path).then(pdf => {
      this.setState({
        loading: false,
        pages: pdf.numPages,
        renderedPages: {},
        pdf,
      }, () => {
        this.showPage(1)
      })
    })
  }

  /**
   * Render canvas element for each page
   */
  renderPages() {
    const result = []
    for (let i = 1; i <= this.state.pages; i++) {
      let id = `page-${i}`
      const viewport = this.state.viewports[i.toString()] || this.state.viewports['1']
      const style = {}
      if (viewport) {
        style.width = `${viewport.width}px`
        style.height = `${viewport.height}px`
      }
      result.push(<canvas ref={id} key={id} style={style} />)
    }
    return result
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <div className={styles.previewPdf} ref="wrapper" onScroll={this.onScroll}>
        {this.renderPages()}
      </div>
    )
  }
}
