import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';

import GistOwner, * as ownerTypes from '../../../models/GistOwner';

import { selectPublicGists, selectMyGists } from '../../../state/gists/actionCreators';

import PublicGistListContainer from './PublicGistListContainer';
import MyGistListContainer from './MyGistListContainer';

class ListContainer extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    gistsOwner: PropTypes.instanceOf(GistOwner).isRequired,
  }

  render() {
    if (this.props.authenticated) {
      return this.renderAuthenticated();
    } else {
      return this.renderNotAuthenticated();
    }
  }

  renderNotAuthenticated() {
    return (
      <div>
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#public-gists" onClick={preventDefaultEvent()}>Public Gists</a>
          </li>
        </ul>
        <div className="list-group gn-gists-list">
          <PublicGistListContainer/>
        </div>
      </div>
    );
  }

  renderAuthenticated() {
    const { gistsOwner, selectPublicGists, selectMyGists } = this.props;
    return (
      <div>
        <ul className="nav nav-pills">
          <li className={activeIf(gistsOwner.type === ownerTypes.MY)}>
            <a href="#my-gists" onClick={preventDefaultEvent(selectMyGists)}>
              My
            </a>
          </li>
          <li className={activeIf(gistsOwner.type === ownerTypes.PUBLIC)}>
            <a href="#public-gists" onClick={preventDefaultEvent(selectPublicGists)}>
              Public
            </a>
          </li>
        </ul>
        <div className="list-group gn-gists-list">
          <Link to="/new" className="list-group-item gn-gists-list-item">
            <span className="glyphicon glyphicon-file"></span> New Gist
          </Link>
          {(() => {
            switch (gistsOwner.type) {
              case ownerTypes.PUBLIC:
                return <PublicGistListContainer/>;
              case ownerTypes.MY:
                return <MyGistListContainer/>;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  }
}

const activeIf = condition => condition ? 'active' : null;

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  gistsOwner: state.gistsOwner,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectPublicGists,
  selectMyGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
