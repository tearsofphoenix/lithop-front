import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default
class MetaBar extends Component {
  static propTypes = {
    tags: PropTypes.array
  };
  render() {
    let {tags = []} = this.props;
    if (tags.length > 0 && tags[0] !== '主页') {
      tags.unshift('主页');
    }
    return (<div className="lp-meta-bar">
      <div className="lp-broderTopLightest">
        <ul>
          <div>
          {tags.map((looper, idx) => {
            const url = idx === 0 ? '' : `/tag/${looper}`;
            return (
              <li key={idx}>
                <Link to={url}>
                  <div>{looper}</div>
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
