import '../../styles/App.scss';
import '../../styles/MyDocuments.css';
import React from "react";
import AddDocument from "./AddDocument";

export default function MyDocument() {

    const [isOpen, setIsOpen] = React.useState(false);

    const onAddClick = () => {
        setIsOpen(true);
    };

    const onCloseClick = () => {
        setIsOpen(false);
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
        </>
    );
}