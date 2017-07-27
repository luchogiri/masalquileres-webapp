import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class DropZone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop = (acceptedFiles) => {
    this.setState({
      files: acceptedFiles
    });

    this.props.handleUpload(acceptedFiles);
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  render() {
    return (
      <div>
        <div>
          <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
            <div>Intenta arrastrar archivos aquí, o haz click para seleccionar archivos a subir</div>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick}>
            Seleccionar archivos
          </button>
          {this.state.files.length > 0 ? <div>
              <h2>Subiendo {this.state.files.length} archivos...</h2>
              <div>{this.state.files.map((file) => <img key={file} src={file.preview} /> )}</div>
            </div> : null}
        </div>
      </div>
    );
  }
};
