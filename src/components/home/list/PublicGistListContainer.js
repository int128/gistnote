import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../infrastructure/PromiseState';

import GistCriteria from '../../../models/GistCriteria';

import { listGists, listNextGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class PublicGistListContainer extends React.Component {
  static propTypes = {
    gistList: PropTypes.instanceOf(PromiseState).isRequired,
    gistListPagenation: PropTypes.instanceOf(PromiseState).isRequired,
    gist: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    this.props.listGists(GistCriteria.PUBLIC);
  }

  render() {
    const { gistList, gistListPagenation, gist, listNextGists } = this.props;
    return gistList.mapIf({
      loading: () => <li className="list-group-item"><LoadingIndicator/></li>,
      rejected: payload => <ErrorIndicator error={payload}/>,
      resolved: payload =>
        <div>
          <GistList gists={payload}
            activeGist={gist.mapIfResolved()}
            nextAction={() => listNextGists(gistListPagenation.mapIfResolved())}
            nextActionInProgress={gistListPagenation.isLoading()}/>
        </div>,
    });
  }
}

const mapStateToProps = state => ({
  gistList: state.gistList,
  gistListPagenation: state.gistListPagenation,
  gist: state.gist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  listGists,
  listNextGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistListContainer);
