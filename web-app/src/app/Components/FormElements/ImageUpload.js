import React from "react";
import { fetchPostFileApi } from "../../Services/fetchUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUpload} from '@fortawesome/free-solid-svg-icons';
import { Image } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import "./ImageUpload.scss";


export class ImageUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      imageRequired:true,
      image: {
        preview: "",
        raw: "",
      },
    };
  }

  handleChange = (e) => {
    if (e.target.files.length) {
      var stateCopy = Object.assign({}, this.state);
      stateCopy.image["preview"] = URL.createObjectURL(e.target.files[0]);
      stateCopy.image["raw"] = e.target.files[0];
      this.setState(stateCopy);
    }
  };

  handleUpload = async (e) => {
    e.preventDefault();
    if(this.state.image.preview !== ""){
    const formData = new FormData();
    formData.append("file", this.state.image.raw);
    try {
      const fileUploadResponse = await fetchPostFileApi("files", formData);
      this.props.setFileName(fileUploadResponse);
    } catch (ex) {
      console.log("Error in uploading file", ex);
    }
  }
  else{
    this.setState({imageRequired:true});
  }
  };

  render() {
    const { image } = this.state;
    return (
      <div className="container">
        <label htmlFor="upload-button">
        {image.preview ? ( <Image src={image.preview} width="160" height="160" roundedCircle />)
          : (
            <>
              <span className="fa-stack fa-2x mt-3 mb-2">
              <FontAwesomeIcon icon={faUserCircle} size="2x"></FontAwesomeIcon>
              </span>
              {/* <h5 className="text-center">Upload your photo</h5> */}
            </>
          )}
        </label>
        <input
          type="file"
          id="upload-button"
          className="hiddenInput"
          onChange={this.handleChange}
        />
        { !this.state.imageRequired
            ? <div className="alert alert-danger mt-2">Image Required.</div>
            : ''
          }
        <Button className="" onClick={this.handleUpload}> 
           Upload {faUpload && <FontAwesomeIcon icon={faUpload}/>}
       </Button>
       <br/>
       <br />
      </div>
    );
  }
}
