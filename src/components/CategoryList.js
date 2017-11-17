import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

export default
class CategoryList extends Component {
  static propTypes = {
    categories: PropTypes.array,
    loadFunc: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { categories = [] } = this.props;
    let child;
    if (categories.length === 0) {
      child = (<div />);
    } else {
      child = [];
      categories.forEach((looper, idx) => {
        if (looper !== '主页') {
          child.push(<div key={idx}>
            <CategoryItem category={looper}/>
          </div>);
        }
      });
    }
    return (
      <div>
        {child}
      </div>
    );
  }
}
