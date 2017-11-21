import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Alert from 'react-s-alert';
import Tags from './Tags';
import MetaBar from '../MetaBar';
import Footer from '../Footer';
import agent from '../../agent';
import { connect } from 'react-redux';
import SearchView from '../SearchView';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import CategoryItem from '../CategoryItem';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  searchResults: state.article.searchResults
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    const tab = 'all';
    const articlesPromise = agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {searchResults} = this.props;
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <MetaBar tags={this.props.tags} />

        <div>
          {!searchResults && <MainView tab="all" />}
          {searchResults && <div className="lp-main-view"><SearchView data={searchResults} /></div>}
        </div>

        <Footer />
        <Alert stack timeout={3000} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
