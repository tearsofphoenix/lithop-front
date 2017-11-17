import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import AvatarCropper from "react-avatar-cropper";
import request from 'superagent-bluebird-promise';
import Agent from '../../agent';

const kUploadURL = 'http://up-z2.qiniu.com';
const kDownloadURL = 'http://oy26nqeof.bkt.clouddn.com';

const isFunction = function (fn) {
  var getType = {};
  return fn && getType.toString.call(fn) === '[object Function]';
};

function formatMaxSize(size){
  size = size.toString().toUpperCase();
  var bsize,m=size.indexOf('M'),k=size.indexOf('K');
  if(m > -1){
    bsize = parseFloat(size.slice(0, m)) * 1024 * 1024
  }else if(k > -1){
    bsize = parseFloat(size.slice(0, k)) * 1024
  }else{
    bsize = parseFloat(size)
  }
  return Math.abs(bsize)
}

export default
class ImageUpload extends Component {
  static propTypes = {
    didUpload: PropTypes.func
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      cropperOpen: false,
      image: null,
      croppedImg: null
    };
  }

  handleFileChange = (dataURI) => {
    this.setState({
      image: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: false
    });
  };

  handleFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    this.upload(file);
    if (!file) return;

    reader.onload = (img) => {
      findDOMNode(this.fileinput).value = '';
      this.handleFileChange(img.target.result);
    };
    reader.readAsDataURL(file);
  };

  handleCrop = (dataURI) => {
    this.setState({
      cropperOpen: true,
      image: null,
      croppedImg: dataURI
    });
  };
  handleRequestHide = (event) => {
    this.setState({
      cropperOpen: false
    });
  };

  upload = (file) => {
    if (!file || file.size === 0) return null;
    let key = file.name;
    Agent.File.uptoken()
      .then(response => {
        console.log(84, response);
        const {uptoken} = response;
        const r = request
          .post(kUploadURL)
          .field('key', key)
          .field('token', uptoken)
          .field('x:filename', file.name)
          .field('x:size', file.size)
          .attach('file', file, file.name)
          .set('Accept', 'application/json');
        r.then(resp => {
          const url = `${kDownloadURL}/${file.name}`;
          this.setState({image: url});
          this.props.didUpload(url);
        });
      });
  };

  render() {
    return (<div className="avatar-photo">
        <input ref={node => this.fileinput = node} type="file" accept="image/*" onChange={this.handleFile} />
        <div className="avatar-edit">
          <span style={{color: '#222'}}>选择图片</span>
          <i className="fa fa-camera"></i>
        </div>
        <img src={this.state.image} />
        {this.state.cropperOpen &&
        <AvatarCropper
          onRequestHide={this.handleRequestHide}
          cropperOpen
          onCrop={this.handleCrop}
          image={this.state.image}
          width={400}
          height={400}
        />
        }
      </div>
    );
  }
}
