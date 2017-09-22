import React from 'react';
import { Link } from 'react-router';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            首页
          </Link>
        </li>

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
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            首页
          </Link>
        </li>

        <li className="nav-item">
          <Link to="editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;写新文章
          </Link>
        </li>

        <li className="nav-item">
          <Link to="settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;设置
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
