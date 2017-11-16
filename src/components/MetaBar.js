import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default
class MetaBar extends Component {
  static propTypes = {
    categories: PropTypes.array
  };
  render() {
    const {categories} = this.props;
    return (<div className="lp-meta-bar">
      <div className="lp-broderTopLightest">
        <ul>
          <div>
          {categories.map((looper, idx) => {
            const {url = `/category/${looper.id}`} = looper;
            return (
              <li key={idx}>
                <Link to={url}>
                  <div>{looper.name}</div>
                </Link>
              </li>
            );
          })}
          </div>
        </ul>
      </div>
    </div>);
  }
}
