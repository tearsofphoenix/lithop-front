import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import ArticlePreview from './ArticlePreview';
import InfiniteScroll from 'react-infinite-scroller';
import {
  APPLY_TAG_FILTER
} from '../constants/actionTypes';
import Loader from './Loader';

const mapDispatchToProps = dispatch => ({
  loadArticlesByTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload })
});

class CategoryItem extends Component {
  static propTypes = {
    data: PropTypes.array,
    category: PropTypes.string,
    loadArticlesByTag: PropTypes.func,
    articleList: PropTypes.object,
    hideMore: PropTypes.bool
  };
  constructor(props, context) {
    super(props, context);
    this.state = {data: props.data};
  }
  componentDidMount() {
    if (!this.state.data) {
      const { category } = this.props;
      this._reloadData(category);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({data: nextProps.data});
    } else {
      if (!this.state.data) {
        if (this.props.category !== nextProps.category) {
          this._reloadData(nextProps.category);
        }
      }
    }
  }

  _reloadData = (category) => {
    this.props.loadArticlesByTag(category, page => agent.Articles.byTag(category, page), agent.Articles.byTag(category));
  };
  _loadMoreFunc = () => {
  };
  render() {
    const {category, hideMore = false, articleList = {}} = this.props;
    const {articlesPool = {}} = articleList;
    const url = `/tag/${category}`;
    let {data} = this.state;
    if (!data) {
      const info = articlesPool[category] || {};
      const { articles = [] } = info;
      data = articles;
    }
    return (<div>
      <section className="lp-clearfix">
        {category && <header className="lp-category-header">
          <div className="lp-header-inner">
            <span className="lp-header-title">
              {hideMore ? category : <Link to={url}>{category}</Link>}
            </span>
            {!hideMore && <Link to={url} className="lp-flex-center">
              <span className="">更多</span>
              <span className="lp-header-icon">
                <svg className="svgIcon-use" width="19" height="19" viewBox="0 0 19 19">
                  <path d="M7.6 5.138L12.03 9.5 7.6 13.862l-.554-.554L10.854 9.5 7.046 5.692" fillRule="evenodd"/>
                </svg>
              </span>
            </Link>
            }
          </div>
        </header>
        }
        <InfiniteScroll pageStart={0} loadMore={this._loadMoreFunc} hasMore loader={<div />}>
        {
          data.map((looper, idx) => {
            return (<ArticlePreview key={idx} article={looper} />)
          })
        }
        </InfiniteScroll>
      </section>
      <Loader />
    </div>);
  }
}

export default connect((state) => ({
  articleList: state.articleList
}), mapDispatchToProps)(CategoryItem);
