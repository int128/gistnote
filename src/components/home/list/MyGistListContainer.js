import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PromiseResponse, { LOADING, RESOLVED, REJECTED } from '../../../models/PromiseResponse';

import { fetchMyGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class MyGistListContainer extends React.Component {
  static propTypes = {
    fetchedGists: PropTypes.instanceOf(PromiseResponse).isRequired,
    fetchedGist: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchMyGists();
  }

  render() {
    const { fetchedGists, fetchedGist, editingGist } = this.props;
    switch (fetchedGists.state) {
      case LOADING:
        return <li className="list-group-item"><LoadingIndicator/></li>;
      case RESOLVED:
        return (
          <div>
            <NewLink active={editingGist.data && editingGist.data.isNew()}/>
            <GistList gists={fetchedGists.data} activeGist={fetchedGist.data}/>
          </div>
        );
      case REJECTED:
        return <ErrorIndicator error={fetchedGists.error}/>;
      default:
        return null;
    }
  }
}

const NewLink = ({active}) => (
  <Link to="/new"
    className={`list-group-item gn-gists-list-item ${active ? 'gn-gists-list-item-active' : ''}`}>
    <span className="glyphicon glyphicon-file"></span> New Gist
  </Link>
);

const mapStateToProps = state => ({
  fetchedGists: state.fetchedGists,
  fetchedGist: state.fetchedGist,
  editingGist: state.editingGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMyGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyGistListContainer);
