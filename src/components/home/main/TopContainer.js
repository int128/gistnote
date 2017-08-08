import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../infrastructure/PromiseState';

import { login } from '../../../state/oauth/actionCreators';

class ViewGistContainer extends React.Component {
  static propTypes = {
    session: PropTypes.instanceOf(PromiseState).isRequired,
  }

  render() {
    return (
      <div>
        <div className="clearfix"></div>
        <div className="jumbotron text-center">
          <img src="/logo.png" alt="logo"/>
          <h1>Gistnote</h1>
          <p>Evernote like Gist client app</p>
          {this.props.session.mapIf({
            invalid: () => <SignIn action={this.props.login}/>,
            rejected: () => <SignIn action={this.props.login}/>,
          })}
        </div>
        <div className="text-center gn-copyright">
          <p>Gistnote is a Gist client app based on JavaScript. &copy; Hidetake Iwata, 2015.</p>
          <p>Thanks to <a href="http://findicons.com/icon/591630/sticky_notes">Metro Uinvert Dock Icon</a>.</p>
        </div>
      </div>
    );
  }
}

const SignIn = ({action}) => (
  <p>
    <button className="btn btn-primary" onClick={action}>
      <span className="glyphicon glyphicon-user"></span> Sign in with GitHub
    </button>
  </p>
);

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewGistContainer);
