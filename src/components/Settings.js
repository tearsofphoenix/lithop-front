import ListErrors from './ListErrors';
import React from 'react';
import ReactDom from 'react-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import AvatarCropper from "react-avatar-cropper";
console.log(6, AvatarCropper);
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      cropperOpen: false,
      croppedImg: "http://www.fillmurray.com/400/400",
      image: null,
      username: '',
      bio: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }
      user.image = this.state.croppedImg;
      this.props.onSubmitForm(user);
    };
  }

  handleFileChange = (dataURI) => {
    this.setState({
      image: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true
    });
  }

  handleCrop = (dataURI) => {
    this.setState({
      cropperOpen: false,
      image: null,
      croppedImg: dataURI
    });
  };
  handleRequestHide = (event) => {
    console.log(event);
    this.setState({
      cropperOpen: false
    });
  };

  componentWillMount() {
    if (this.props.currentUser) {
      const image = this.props.currentUser.image || '';
      Object.assign(this.state, {
        image,
        croppedImg: image,
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      const image = nextProps.currentUser.image || '';
      this.setState(Object.assign({}, this.state, {
        image,
        croppedImg: image,
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>

          <fieldset className="form-group">
              <div className="avatar-photo">
                <FileUpload handleFileChange={this.handleFileChange} />
                <div className="avatar-edit">
                  <span>Click to Pick Avatar</span>
                  <i className="fa fa-camera"></i>
                </div>
                <img src={this.state.croppedImg} />
              </div>
              {this.state.cropperOpen &&
              <AvatarCropper
                  onRequestHide={this.handleRequestHide}
                  cropperOpen={this.state.cropperOpen}
                  onCrop={this.handleCrop}
                  image={this.state.image}
                  width={400}
                  height={400}
              />
              }
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class FileUpload extends React.Component {

  handleFile = (e) => {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  }

  render() {
    return (<input ref="in" type="file" accept="image/*" onChange={this.handleFile} />);
  }
}

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Logout
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
