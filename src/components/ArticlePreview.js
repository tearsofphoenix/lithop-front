import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapStateToProps = state => ({
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
      FAVORITED_CLASS :
      NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (props.token) {
      if (article.favorited) {
        props.unfavorite(article.slug);
      } else {
        props.favorite(article.slug);
      }
    } else {
      console.log(Alert.error, 41);
      Alert.error('请先登录！', {
        position: 'top-right'
      });
    }
  };
  const imageStyle = {};
  if (article.image) {
    imageStyle.backgroundImage = `url(${article.image})`;
    imageStyle.backgroundSize = 'cover';
  }
  return (
      <div className="article-preview">
        <div className="article-preview-wrap">
          <div className="lp-article-image" style={imageStyle}>
            <Link to={ `article/${article.slug}` } />
          </div>

          <div className="lp-content-wrap">
            <div className="lp-flex1 lp-relative">
              <Link to={ `article/${article.slug}` } className="preview-link">
                <h1>{ article.title }</h1>
                <p>{ article.description }</p>
                <ul className="tag-list">
                  {
                    article.tagList.map(tag => {
                      return (
                          <li className="tag-default tag-pill tag-outline" key={ tag }>
                            { tag }
                          </li>
                      )
                    })
                  }
                </ul>
              </Link>
            </div>
            <div className="article-meta">
              <div>
                <Link to={ `@${article.author.username}` }>
                  <img src={ article.author.image } alt={ article.author.username } />
                </Link>

                <div className="info">
                  <Link className="author" to={ `@${article.author.username}` }>
                    { article.author.username }
                  </Link>
                  <span className="date">{ new Date(article.createdAt).toDateString() }</span>
                </div>
              </div>

              <div className="pull-xs-right">
                <button className={ favoriteButtonClass } onClick={ handleClick }>
                  <i className="ion-heart"></i> { article.favoritesCount }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);
