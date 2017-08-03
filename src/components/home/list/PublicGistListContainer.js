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
    gist: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    this.props.listGists(GistCriteria.PUBLIC);
  }

  render() {
    const { gistList, gist, listNextGists } = this.props;
    switch (gistList.state) {
      case PromiseState.stateTypes.LOADING:
        return <li className="list-group-item"><LoadingIndicator/></li>;
      case PromiseState.stateTypes.RESOLVED:
        return <GistList gists={gistList.payload} activeGist={gist.payload}
          nextAction={() => listNextGists(gistList.payload)}/>
      case PromiseState.stateTypes.REJECTED:
        return <ErrorIndicator error={gistList.payload}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  gistList: state.gistList,
  gist: state.gist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  listGists,
  listNextGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistListContainer);
