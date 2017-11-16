import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Alert from 'react-s-alert';
import Tags from './Tags';
import MetaBar from '../MetaBar';
import Footer from '../Footer';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

const kCategories = [
  {
    name: '主页',
    id: '',
    url: ''
  },
  {
    name: '生石化',
    id: 'shengshishua'
  },
  {
    name: '小列岛',
    id: 'xliedao'
  }
];

class Home extends React.Component {
  componentWillMount() {
    const tab = 'all';
    const articlesPromise = agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTags = () => {
    return (<div className="col-md-2">
      <div className="sidebar">

        <p>热门标签</p>

        <Tags
            tags={this.props.tags}
            onClickTag={this.props.onClickTag} />

      </div>
    </div>);
  };

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <MetaBar categories={kCategories} />

        <div className="container page">
          <MainView tab="all" />
        </div>

        <Footer />
        <Alert stack timeout={3000} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
