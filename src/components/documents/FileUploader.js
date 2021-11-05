import React from "react";
import ImageUploading from "react-images-uploading";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../../styles/fileUploader.css";

export default function FileUploader({onUpload, images}) {
  const img = images;
  const maxNumber = 1;

  const onChange = (imageList) => {
    // data for submit
    onUpload(imageList);
  };

  return (
    <>
      <ImageUploading
        multiple
        value={img}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div
              className="upload_file"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </div>
            &nbsp;
            <Button onClick={onImageRemoveAll}>Remove all images</Button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" />
                <div className="image-item__btn-wrapper">
                  <Button startIcon={<EditIcon />} style={{marginRight: "8%", color: "#e88b15"}} onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button startIcon={<DeleteIcon />} style={{color: "#d4410e"}} onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  );
}
