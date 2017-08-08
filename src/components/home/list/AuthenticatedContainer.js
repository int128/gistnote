import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';

import GistCriteria from '../../../models/GistCriteria';

import { changeGistCriteria } from '../../../state/gists/actionCreators';

import PublicGistListContainer from './PublicGistListContainer';
import MyGistListContainer from './MyGistListContainer';

class AuthenticatedContainer extends React.Component {
  static propTypes = {
    gistCriteria: PropTypes.instanceOf(GistCriteria).isRequired,
  }

  render() {
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
  gistCriteria: state.gistCriteria,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeGistCriteria,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer);
