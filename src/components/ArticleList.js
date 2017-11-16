import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';

export default class ArticleList extends Component {
  static propTypes = {
    pager: PropTypes.func,
    articles: PropTypes.array,
    loading: PropTypes.bool,
    articlesCount: PropTypes.number,
    currentPage: PropTypes.number,
    loadFunc: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { articles = [] } = this.props;
    let child;
    if (articles.length === 0) {
      child = (<div />);
    } else {
      child = articles.map((article, idx) => <div key={idx}>
        <ArticlePreview article={ article } />
      </div>);
    }
    return (
        <div className="lp-articlelist">
          { child }
        </div>
    );
  }
}
