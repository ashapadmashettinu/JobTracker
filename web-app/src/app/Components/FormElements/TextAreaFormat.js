import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./TextAreaFormat.scss";


class TextAreaFormat extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="textareaformat" className="ck-editor__editable">
        <CKEditor

          editor={ClassicEditor}
          data={this.props.description ? this.props.description : "<p>Enter Description</p>"}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.handleDescriptionChange(event, data)
            // const data = editor.getData();
            // console.log({ event, editor, data });
          }}
        />{" "}
      </div>
    );
  }
}

export default TextAreaFormat;
