import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as iconActions from '../../actions/icons';

class NativeIcon extends Component {
  static propTypes = {
    className: PropTypes.string,
    icons: PropTypes.object,
    path: PropTypes.string,
    actions: {
      loadIcon: PropTypes.func,
    }
  }
  componentDidMount() {
    if (!this.src()) {
      this.props.actions.loadIcon(this.props.path);
    }
  }
  src() {
    const { icons, path } = this.props;
    return icons[path];
  }
  render() {
    const src = this.src();
    if (src) {
      return <img src={src} alt={src} className={this.props.className} />;
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    icons: state.icons.byPath
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(iconActions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NativeIcon);
