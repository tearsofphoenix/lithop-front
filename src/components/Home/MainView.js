import ArticleList from '../ArticleList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import CategoryList from '../CategoryList';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
        <li className="nav-item">
          <a href=""
             className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
             onClick={ clickHandler }>
            我的
          </a>
        </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
      <li className="nav-item">
        <a
            href=""
            className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
            onClick={ clickHandler }>
          全部
        </a>
      </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
      <li className="nav-item">
        <a href="" className="nav-link active">
          <i className="ion-pound"></i> { props.tag }
        </a>
      </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
  loadMore: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  const {tags} = props;
  return (
      <div className="lp-main-view">
          <CategoryList categories={tags} />
      </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
