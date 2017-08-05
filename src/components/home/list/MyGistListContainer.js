import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PromiseState from '../../../infrastructure/PromiseState';

import GistCriteria from '../../../models/GistCriteria';

import { listGists, listNextGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class MyGistListContainer extends React.Component {
  static propTypes = {
    gistList: PropTypes.instanceOf(PromiseState).isRequired,
    gistListPagenation: PropTypes.instanceOf(PromiseState).isRequired,
    gist: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    this.props.listGists(GistCriteria.MY);
  }

  render() {
    const { gistList, gistListPagenation, gist, editingGist, listNextGists } = this.props;
    return gistList.mapIf({
      loading: () => <li className="list-group-item"><LoadingIndicator/></li>,
      rejected: payload => <ErrorIndicator error={payload}/>,
      resolved: payload =>
        <div>
          <NewLink active={editingGist.mapIfResolved(payload => payload.isNew())}/>
          <GistList gists={payload}
            activeGist={gist.mapIfResolved()}
            nextAction={() => listNextGists(gistListPagenation.mapIfResolved())}
            nextActionInProgress={gistListPagenation.isLoading()}/>
        </div>,
    });
  }
}

const NewLink = ({active}) => (
  <Link to="/new"
    className={`list-group-item gn-gists-list-item ${active ? 'gn-gists-list-item-active' : ''}`}>
    <span className="glyphicon glyphicon-file"></span> New Gist
  </Link>
);

const mapStateToProps = state => ({
  gistList: state.gistList,
  gistListPagenation: state.gistListPagenation,
  gist: state.gist,
  editingGist: state.editingGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  listGists,
  listNextGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyGistListContainer);
