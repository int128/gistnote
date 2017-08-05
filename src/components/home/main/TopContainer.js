import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ViewGistContainer extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <div className="clearfix"></div>
        <div className="jumbotron text-center">
          <img src="/logo.png" alt="logo"/>
          <h1>Gistnote</h1>
          <p>Evernote like Gist client app</p>
          {authenticated ? null : (
            <p><Link to="/login" className="btn btn-primary">Sign in with GitHub</Link></p>
          )}
        </div>
        <div className="text-center gn-copyright">
          <p>Gistnote is a Gist client app based on JavaScript. &copy; Hidetake Iwata, 2015.</p>
          <p>Thanks to <a href="http://findicons.com/icon/591630/sticky_notes">Metro Uinvert Dock Icon</a>.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewGistContainer);
