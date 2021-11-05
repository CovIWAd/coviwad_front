import React from "react";
import FileUploader from "../../components/documents/FileUploader";
import {Button} from "@mui/material";
import DocumentType from "../../components/documents/DocumentType";

export default function AddDocument() {

  return (
    <>
      <div>
        <h4>Ajouter des documents</h4>
        <FileUploader/>
        <DocumentType/>
        <div className="validate_document">
          <Button variant={"contained"}>Valider</Button>
        </div>
      </div>
    </>
  );
}
