import '../../styles/App.scss';
import '../../styles/MyDocuments.css';
import React, {useEffect, useState} from "react";
import AddDocument from "./AddDocument";
import DocumentCard from "../../components/documents/DocumentCard";
import {useKeycloak} from "@react-keycloak/web";


export default function MyDocument() {
    const {keycloak} = useKeycloak();

    const [isOpen, setIsOpen] = React.useState(false);

    const onAddClick = () => {
        setIsOpen(true);
    };

    const onCloseClick = () => {
        setIsOpen(false);
    }


    const [docs, setDocs] = useState([]);

    useEffect(() => {

        async function fetchDocs() {
            //ALL NEWS
            await fetch(`http://localhost:8082/api/documents/user/${keycloak.tokenParsed.sub}`,
                {
                    method: "GET",
                    headers: new Headers({
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Origin": "*",
                        Authorization: `Bearer ${keycloak.token}`
                    }),
                    mode: "cors"
                })
                .then(async (res) => {
                    let r = await res.json();
                    setDocs(r)
                });
        }

        fetchDocs();
        console.log(docs);
    }, []);

    const onDeleteAction = (documentId) => {
        // TODO
        console.log("to do");
        return;
    }

    return (
        <>
            <div>
                <h2 className="text-center">My documents</h2>

                {isOpen ?
                    (<>

                            <button className="btn ceriseBackground leftButton "
                                    onClick={onCloseClick}
                            > x Close
                            </button>
                            <AddDocument onCloseClick={onCloseClick}/>
                        </>
                    )

                    : (
                        <button className="btn turquoiseBackground leftButton"
                                onClick={onAddClick}
                        >+ Add a file</button>
                    )}


            </div>

            <div>
                {docs.length != 0 && docs.map((c) => {
                    return  <DocumentCard key = {c.documentId}
                                         // onDeleteAction={onDeleteAction}
                                          documentId = {c.documentId}
                                          documentType={c.documentType}
                                          testDate={c.testDate}
                                          file={c.file}
                    />
                    }
                )}

            </div>
        </>
    );
}