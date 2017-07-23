import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingIndicator from './LoadingIndicator';

class OAuthContainer extends React.Component {
  static propTypes = {
  }

  componentDidMount() {
    console.info(this.props);
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h2><LoadingIndicator/>&nbsp;Authorization in Progress</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OAuthContainer);
