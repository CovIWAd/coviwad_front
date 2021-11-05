import React, {useState} from "react";
import FileUploader from "../../components/documents/FileUploader";
import {Button} from "@mui/material";
import DocumentType from "../../components/documents/DocumentType";

export default function AddDocument() {
  //File Uploader state
  const [images, setImages] = useState([]);
  const onUpload = (img) => {
    setImages(img);
  }

  //Document type state
  const [type, setType] = useState("");
  const onChangeType = (type) => {
    setType(type);
  }
  const [isValid, setIsValid] = useState(false);
  const onChangeValid = (isValid) => {
    setIsValid(isValid);
  }

  //Submit
  const onSubmit = () => {
    console.log(images,type,isValid)
  }

  return (
    <>
      <div>
        <h4>Ajouter des documents</h4>
        <FileUploader onUpload={onUpload} images={images}/>
        <DocumentType onChangeType={onChangeType} onChangeValid={onChangeValid} type={type} isValid={isValid}/>
        <div className="validate_document">
          <Button variant={"contained"} onClick={onSubmit}>Valider</Button>
        </div>
      </div>
    </>
  );
}
