import React from 'react';
import ReactDom from 'react-dom';

export default
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
    };

    render() {
        return (<input ref="in" type="file" accept="image/*" onChange={this.handleFile} />);
    }
}
