import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import '../../styles/MyDocuments.css';

export default function DocumentCard( {documentType, testDate, file, documentId, onDeleteAction} ) {

    return (
        <Card className="cardDoc" sx={{ maxWidth: 345 }} >
            <CardHeader
                action={
                    <IconButton aria-label="delete" onClick={() => onDeleteAction(documentId)} >
                        <DeleteIcon />
                    </IconButton>
                }
                title={documentType}
                subheader={testDate}
            />
            <CardMedia
                component="img"
                height="auto"
                className="imgCard"
                image={file}
                alt="document"
            />
        </Card>
    );
}
