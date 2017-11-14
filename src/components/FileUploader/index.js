import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Qiniu from 'react-qiniu';

export default
class FileUploader extends Component {
  static propTypes = {
    uptoken: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      files: [],
      uploadKey: '',
      prefix: ''
    };
  }

  onUpload = (files) => {
    // set onprogress function before uploading
    files.map((f) => {
      f.onprogress = function(e) {
        console.log(e.percent);
      };
    });
  };

  onDrop = (files) => {
    this.setState({
      files: files
    });
    // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
    // and with each file, we attached two functions to handle upload progress and result
    // file.request => return super-agent uploading file request
    // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
    // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
    // see more example in example/app.js
    console.log('Received files: ', files);
  };

  render () {
    return (
      <div>
        <Qiniu onDrop={this.onDrop} size={150} token={this.props.uptoken} uploadKey={this.state.uploadKey} onUpload={this.onUpload}
        uploadUrl="http://up-z2.qiniu.com">
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Qiniu>
      </div>
    );
  }
}
