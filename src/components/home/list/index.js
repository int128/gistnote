import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';
import PromiseState from '../../../infrastructure/PromiseState';

import GistCriteria from '../../../models/GistCriteria';

import { changeGistCriteria } from '../../../state/gists/actionCreators';

import PublicGistListContainer from './PublicGistListContainer';
import MyGistListContainer from './MyGistListContainer';

class ListContainer extends React.Component {
  static propTypes = {
    session: PropTypes.instanceOf(PromiseState).isRequired,
    gistCriteria: PropTypes.instanceOf(GistCriteria).isRequired,
  }

  render() {
    return this.props.session.mapIf({
      invalid: () => this.renderNotAuthenticated(),
      rejected: () => this.renderNotAuthenticated(),
      resolved: () => this.renderAuthenticated(),
    });
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
    const { gistCriteria, changeGistCriteria } = this.props;
    return (
      <div>
        <ul className="nav nav-pills">
          <li className={activeIf(gistCriteria.type === GistCriteria.types.MY)}>
            <a href="#my-gists"
              onClick={preventDefaultEvent(() => changeGistCriteria(GistCriteria.MY))}>
              My
            </a>
          </li>
          <li className={activeIf(gistCriteria.type === GistCriteria.types.PUBLIC)}>
            <a href="#public-gists"
              onClick={preventDefaultEvent(() => changeGistCriteria(GistCriteria.PUBLIC))}>
              Public
            </a>
          </li>
        </ul>
        <div className="list-group gn-gists-list">
          {(() => {
            switch (gistCriteria.type) {
              case GistCriteria.types.PUBLIC:
                return <PublicGistListContainer/>;
              case GistCriteria.types.MY:
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
  session: state.session,
  gistCriteria: state.gistCriteria,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeGistCriteria,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
