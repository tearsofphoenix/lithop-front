import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import { Masonry, WindowScroller, CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, AutoSizer } from 'react-virtualized';

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
    this.state = {
      articles: [],
      overscanByPixels: 0,
      columnWidth: 200,
      gutterSize: 10,
    };

    this._cache = new CellMeasurerCache({
      defaultHeight: 280,
      defaultWidth: 1000,
      fixedWidth: true,
    });
  }

  _renderAutoSizer = ({height, scrollTop}) => {
    this._height = height;
    this._scrollTop = scrollTop;

    const {overscanByPixels} = this.state;

    return (
        <AutoSizer
            disableHeight
            height={height}
            onResize={this._onResize}
            overscanByPixels={overscanByPixels}
            scrollTop={this._scrollTop}>
          {this._renderMasonry}
        </AutoSizer>
    );
  };

  _initCellPositioner = () => {
    if (typeof this._cellPositioner === 'undefined') {
      const {columnWidth, gutterSize} = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  };

  _renderMasonry = ({width}) => {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const {height, overscanByPixels} = this.state;
    const {articlesCount} = this.props;
    const h = Number(this._height || 10);
    console.error(73, h);
    return (
        <Masonry
            autoHeight
            cellCount={articlesCount}
            cellMeasurerCache={this._cache}
            cellPositioner={this._cellPositioner}
            cellRenderer={this._cellRenderer}
            height={h}
            overscanByPixels={overscanByPixels}
            ref={ref => this._masonry = ref}
            scrollTop={this._scrollTop}
            width={width}
        />
    );
  };

  _calculateColumnCount = () => {
    const {columnWidth, gutterSize} = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  };

  _cellRenderer = ({index, key, parent, style}) => {
    const {columnWidth} = this.state;

    const {articles} = this.props;
    const article = articles[index % articles.length];
    console.log(100, articles, article);
    return (
        <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
          <div
              style={{
                ...style,
                width: columnWidth,
              }}>
            <div
                style={{
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                }}
            />
            <ArticlePreview article={article} />
          </div>
        </CellMeasurer>
    );
  };

  render() {
    const props = this.props;
    if (!props.articles) {
      return (
          <div className="article-preview">Loading...</div>
      );
    }

    if (props.articles.length === 0) {
      return (
          <div className="article-preview">
            No articles are here... yet.
          </div>
      );
    }
    const {overscanByPixels} = this.state;
    return (
        <div className="lp-articlelist">
          <WindowScroller overscanByPixels={overscanByPixels}>
            {this._renderAutoSizer}
          </WindowScroller>
          <ListPagination
              pager={ props.pager }
              articlesCount={ props.articlesCount }
              currentPage={ props.currentPage } />
        </div>
    );
  }
}
