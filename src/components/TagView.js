
import React from 'react';
import CategoryItem from './CategoryItem';
import Footer from './Footer';
import MetaBar from './MetaBar';
import {connect} from 'react-redux';
import agent from '../agent';

class TagView extends React.Component {
  constructor() {
    super();

    this.state = {
      tags: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.tag !== nextProps.params.tag) {
      this.setState({tag: nextProps.params.tag});
    }
  }

  componentWillMount() {
    if (this.props.params.tag) {
      this.setState({tag: this.props.params.tag});
    }
    agent.Tags.getAll().then((resp) => {
      this.setState({tags: resp.tags});
    });
  }

  render() {
    const {tag} = this.props.params;
    return (
      <div>
        <MetaBar tags={this.state.tags} />

        <CategoryItem category={tag} hideMore />
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({tags: state.home.tags}))(TagView);
