import React, {Component} from 'react';
import ArticlePreview from './ArticlePreview';

export default
class SearchView extends Component {
  render() {
    const {data} = this.props;
    console.log(8, data);
    const child = data.map((looper, idx) => {
      return (<ArticlePreview key={idx} article={looper} />)
    });
    console.log(12, child);
    return (<div>
      <section className="lp-clearfix">{child}
      </section>
    </div>);
  }
}
