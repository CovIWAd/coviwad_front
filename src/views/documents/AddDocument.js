import React, {useEffect, useState} from "react";
import {format} from 'date-fns';
import FileUploader from "../../components/documents/FileUploader";
import {Button} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DocumentType from "../../components/documents/DocumentType";
import {useKeycloak} from "@react-keycloak/web";


export default function AddDocument({onCloseClick, setDocs}) {
    const {keycloak} = useKeycloak();

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

    const [testDate, setTestDate] = useState(new Date());
    const onChangeTestDate = (date) => {
        setTestDate(date);
    }

    // Test is valid ?
    const [isValid, setIsValid] = useState(false);
    const onChangeValid = (isValid) => {
        setIsValid(isValid);
    }

    //  is test Positive ?
    const [isPositive, setIsPositive] = useState(false);
    const onChangeIsPositive = (isPositive) => {
        setIsPositive(isPositive);
    }

    //verification
    const [isFormValid, setIsFormValid] = useState(false);


    //change the value of isInvalid when type or images change
    useEffect(() => {
        setIsFormValid(images.length !== 0 && type !== "");
    }, [type, images]);


    // TODO faire quelque chose si le test est positif ? Prévenir qui ?

    // for alert

    const [open, setOpen] = React.useState(false);


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        onCloseClick();
    };

    // end of alert

    //Submit
    const onSubmit = () => {

        async function addDocument() {

            await fetch(`http://localhost:8082/api/geolocation`,
                {
                    method: "POST",
                    headers: new Headers({
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Origin": "*",
                        Authorization: `Bearer ${keycloak.token}`
                    }),
                    body: JSON.stringify({
                        'userId': keycloak.tokenParsed.sub,
                        'file': images[0].data_url,
                        'documentType': type,
                        'testDate': format(new Date(testDate), 'yyyy-MM-dd'),
                        'isPositive': isPositive
                    })
                })
                .then(async (res) => {
                    let r = await res.json();
                    console.log(r);
                    setDocs(oldDocs => {
                        oldDocs.push(r)
                        return oldDocs
                    })
                    setOpen(true);
                });
        }

        addDocument();

        if(isPositive){

            //TESTER
            async function triggerPositive() {

                await fetch(`http://localhost:8080/api/geolocation/positive`, //TODO mettre la bonne route!!
                    {
                        method: "POST",
                        headers: new Headers({
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Origin": "*",
                            Authorization: `Bearer ${keycloak.token}`
                        }),
                        body: JSON.stringify({
                            'idUserCovid': keycloak.tokenParsed.sub,
                            //'date': format(new Date(testDate), 'yyyy-MM-dd')
                        })
                    })
                    .then(async (res) => {
                        let r = await res.json();
                        console.log(r);
                    });
            }

            triggerPositive();
        }

    }


    return (
        <>
            <div>
                <FileUploader onUpload={onUpload} images={images}/>
                <DocumentType onChangeType={onChangeType} type={type}
                              onChangeValid={onChangeValid} isValid={isValid}
                              onChangeTestDate={onChangeTestDate} testDate={testDate}
                              onChangeIsPositive={onChangeIsPositive} isPositive={isPositive}
                />

                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Document successfully added!
                    </Alert>
                </Snackbar>

                <div className="validate_document">
                    <Button className="btn turquoiseBackground"
                            disabled={!isFormValid}
                            variant={"contained"}
                            onClick={onSubmit}>Validate</Button>
                </div>
            </div>
        </>
    );
}
