import React, { Component } from "react";
import firebase from "../../services/firebase";

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: "",
      progress: 0,
      isUploadFile: false,
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState(() => ({ file, isUploadFile: true, }));
      this.handleUpload(file)
    }
  };

  handleUpload = (file) => {
    // const { image } = this.state;
    const uploadTask = firebase.storage().ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        firebase.storage()
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            this.props.handlerUpload(url);
            this.setState({ url, isUploadFile: false });
          });
      }
    );
  };
  render() {
    return (
      <div>
        <div>
            <input class="form-control" type="file" onChange={this.handleChange} />
        </div>
        <br />
        {this.state.isUploadFile ? (<span>Sedang mengupload...</span>) :
        this.state.file ?
        <b>{this.state.file.name}</b>: ""}
      </div>
    );
  }
}

export default FileUploader;