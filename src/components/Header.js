import React from 'react';
import { Link } from 'react-router';

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

const LoggedInView = props => {
  if (props.currentUser) {
    const showSearchInput = () => {

    }
    return (
      <ul className="nav navbar-nav pull-xs-right white">
        <li className="nav-item">
          <a className="nav-link lp-search-icon" onClick={showSearchInput}>
            <i className="ion-search"></i>
          </a>
          <input className="lp-search-input" type="search" placeholder="Search Medium" required="true" />
        </li>

        <li className="nav-item">
          <Link to="editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;新文章
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
