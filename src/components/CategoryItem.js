import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import ArticlePreview from './ArticlePreview';

import {
  APPLY_TAG_FILTER
} from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  loadArticlesByTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload })
});

class CategoryItem extends Component {
  static propTypes = {
    category: PropTypes.string,
    loadArticlesByTag: PropTypes.func,
    articleList: PropTypes.object,
    hideMore: PropTypes.bool
  };
  componentDidMount() {
    const {category} = this.props;
    this._reloadData(category);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this._reloadData(nextProps.category);
    }
  }

  _reloadData = (category) => {
    this.props.loadArticlesByTag(category, page => agent.Articles.byTag(category, page), agent.Articles.byTag(category));
  };

  render() {
    const {category, hideMore = false, articleList = {}} = this.props;
    const {articlesPool = {}} = articleList;
    const url = `/tag/${category}`;
    const info = articlesPool[category] || {};
    const {articles = []} = info;
    console.log(33, Object.keys(articlesPool), articlesPool['小列岛'], this.props, this.props.category, articles);
    return (<div>
      <section className="lp-clearfix">
        <header className="lp-category-header">
          <div className="lp-header-inner">
            <span className="lp-header-title">
              {hideMore ? category : <Link to={url}>{category}</Link>}
            </span>
            {!hideMore && <Link to={url} className="lp-flex-center">
              <span className="">更多</span>
              <span className="lp-header-icon">
                <svg className="svgIcon-use" width="19" height="19" viewBox="0 0 19 19">
                  <path d="M7.6 5.138L12.03 9.5 7.6 13.862l-.554-.554L10.854 9.5 7.046 5.692" fillRule="evenodd"></path>
                </svg>
              </span>
            </Link>
            }
          </div>
        </header>

        {
          articles.map((looper, idx) => {
            return (<ArticlePreview key={idx} article={looper} />)
          })
        }
      </section>
    </div>);
  }
}

export default connect((state) => ({
  articleList: state.articleList
}), mapDispatchToProps)(CategoryItem);
