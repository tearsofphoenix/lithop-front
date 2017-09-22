import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      <InfiniteScroll
          className="lp-articles-wrapper"
          pageStart={0}
          loadMore={props.loadFunc}
          hasMore={props.loading}
          loader={<div className="article-preview">Loading...</div>}
      >
        {
          props.articles.map(article => {
            return (
                <ArticlePreview article={article} key={article.slug} />
            );
          })
        }
      </InfiniteScroll>

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
