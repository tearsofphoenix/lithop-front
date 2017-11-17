import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SEARCH_ARTICLE } from '../constants/actionTypes'
import agent from '../agent';

const mapDispatchToProps = dispatch => ({
  searchArticle: (value, payload) => dispatch({ type: SEARCH_ARTICLE, payload })
});

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <ul className="nav navbar-nav pull-xs-right white">

          <li className="nav-item">
            <Link to="login" className="nav-link">
              登入
            </Link>
          </li>

          <li className="nav-item">
            <Link to="register" className="nav-link">
              注册
            </Link>
          </li>

        </ul>
    );
  }
  return null;
};

class LoggedInView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showSearchInput: false
    };
  }

  showSearchInput = () => {
    const { showSearchInput } = this.state;
    this.setState({ showSearchInput: !showSearchInput });
  };

  searchArticle = (event) => {
    const {value} = event.target;
    // this.props.searchArticle(value);
    agent.Articles.search(value);
  };

  render() {
    const props = this.props
    if (props.currentUser) {
      const searchStyle = {
        width: this.state.showSearchInput ? '190px' : '1px',
        cursor: this.state.showSearchInput ? 'text' : 'pointer',
        paddingLeft: this.state.showSearchInput ? '10px' : 0
      };
      return (
          <ul className="nav navbar-nav pull-xs-right white">
            <li className="nav-item lp-flex">
              <a className="nav-link lp-search-icon" onClick={ this.showSearchInput }>
                <span className="svgIcon svgIcon--search svgIcon--25px u-top0 u-baseColor--iconLight">
                  <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                    <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path>
                  </svg>
                </span>
              </a>
              <input className="lp-search-input" style={ searchStyle } type="search" placeholder="搜索 ..."
                     onChange={this.searchArticle}
                     required="true" />
            </li>

            <li className="nav-item">
              <Link to="editor" className="nav-link">
                <i className="ion-compose"></i>&nbsp;
              </Link>
            </li>

            <li className="nav-item">
              <Link
                  to={ `@${props.currentUser.username}` }
                  className="nav-link">
                <img src={ props.currentUser.image } className="user-pic" alt={ props.currentUser.username } />
              </Link>
            </li>

          </ul>
      );
    }
    return null;
  }
}

class Header extends React.Component {
  static propTypes = {
    searchArticle: PropTypes.func
  };

  render() {
    return (
        <nav className="navbar navbar-light">
          <div className="container">

            <Link to="/" className="navbar-brand">
              { this.props.appName.toLowerCase() }
            </Link>

            <LoggedOutView currentUser={ this.props.currentUser } />

            <LoggedInView currentUser={ this.props.currentUser } searchArticle={this.props.searchArticle} />
          </div>
        </nav>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Header);
