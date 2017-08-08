import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import PromiseState from '../infrastructure/PromiseState';

import { acquireSession } from '../state/oauth/actionCreators';

import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';

class OAuthContainer extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    session: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    const { code, state } = queryString.parse(this.props.location.search);
    if (code && state) {
      this.props.acquireSession(code, state);
    }
  }

  render() {
    return (
      <div className="container text-center">
        {this.props.session.mapIf({
          invalid: () => <p><Link to="/" className="btn btn-default">Back</Link></p>,
          loading: () => (
            <div className="jumbotron">
              <LoadingIndicator/>
              <p>Signing In...</p>
            </div>
          ),
          rejected: payload => (
            <div>
              <ErrorIndicator error={payload}/>
              <p><Link to="/" className="btn btn-default">Back</Link></p>
            </div>
          ),
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  acquireSession,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OAuthContainer);
