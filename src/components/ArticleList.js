import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import {
  Masonry, WindowScroller, CellMeasurer, CellMeasurerCache,
  createMasonryCellPositioner, AutoSizer
} from 'react-virtualized';

export default class ArticleList extends Component {
  static propTypes = {
    pager: PropTypes.func,
    articles: PropTypes.array,
    loading: PropTypes.bool,
    articlesCount: PropTypes.number,
    currentPage: PropTypes.number,
    loadFunc: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 500,
      fixedWidth: true
    });

    this._columnHeights = {};

    this.state = {
      columnWidth: 500,
      height: 280,
      gutterSize: 10,
      overscanByPixels: 0,
      windowScrollerEnabled: true
    };

    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
  }

  render() {
    const { overscanByPixels } = this.state;
    const { articles = [] } = this.props;
    let child;
    if (articles.length === 0) {
      child = (<div></div>);
    } else {
      child = (
          <WindowScroller overscanByPixels={ overscanByPixels }>
            { this._renderAutoSizer }
          </WindowScroller>
      );
    }
    return (
        <div className="lp-articlelist">
          { child }
        </div>
    );
  }

  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer = ({ index, key, parent, style }) => {
    console.log(69, this.props);
    const { articles = [] } = this.props;
    const { columnWidth } = this.state;

    const article = articles[index % articles.length];

    return (
        <CellMeasurer cache={ this._cache } index={ index } key={ key } parent={ parent }>
          <div
              style={ {
                ...style,
                width: columnWidth
              } }>
            <ArticlePreview article={ article } />
          </div>
        </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  _onResize({ width }) {
    this._width = width;

    this._columnHeights = {};
    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
        <AutoSizer
            disableHeight
            height={ height }
            onResize={ this._onResize }
            overscanByPixels={ overscanByPixels }
            scrollTop={ this._scrollTop }>
          { this._renderMasonry }
        </AutoSizer>
    );
  }

  _renderMasonry = ({ width }) => {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { height, overscanByPixels, windowScrollerEnabled } = this.state;
    const {articles = []} = this.props;
    return (
        <Masonry
            autoHeight={ windowScrollerEnabled }
            cellCount={ articles.length }
            cellMeasurerCache={ this._cache }
            cellPositioner={ this._cellPositioner }
            cellRenderer={ this._cellRenderer }
            height={ windowScrollerEnabled ? this._height : height }
            overscanByPixels={ overscanByPixels }
            ref={ this._setMasonryRef }
            scrollTop={ this._scrollTop }
            width={ width }
        />
    );
  }

  _resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize
    });
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}
