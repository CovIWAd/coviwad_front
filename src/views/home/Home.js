import {useKeycloak} from "@react-keycloak/web";
import React, {useCallback, useEffect} from "react";
import {format} from 'date-fns';
import '../../styles/Home.scss';
import '../../styles/App.scss';
import logo from "../../logo.png";
import {usePosition} from 'use-position';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Home() {
    const {keycloak} = useKeycloak();

    const login = useCallback(() => {
        keycloak.login();
    }, [keycloak]);


    const [open, setOpen] = React.useState(false);


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    /*
        const logout = useCallback(() => {
            keycloak.logout();
        }, [keycloak]);
    */


    // to locate of the user
    const watch = true;
    const {
        latitude,
        longitude,
        timestamp,
        error,
    } = usePosition(watch, {enableHighAccuracy: true});


    useEffect(() => {
        console.log(latitude);
        console.log(longitude);
        console.log(timestamp);
// TESTER

        async function addPosition() {

            await fetch(`http://localhost:8080/api/geolocation`, //TODO mettre la bonne route!!
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
                        'latitude' : latitude,
                        'longitude' : longitude,
                        'geolocationDate': format(new Date(timestamp), 'yyyy-MM-dd')
                    })
                })
                .then(async (res) => {
                    let r = await res.json();
                    console.log(r);

                });
        }

        if(keycloak.tokenParsed !== undefined && latitude !== undefined && longitude !== undefined && timestamp !== undefined){
            const interval = setInterval(() => {
                addPosition();
            }, 60000);
            return () => clearInterval(interval);
        }

    },[longitude,latitude]);

    const onPositiveClicked = () => {
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
                        //'userId': keycloak.tokenParsed.sub,
                    //'date': format(new Date(), 'yyyy-MM-dd')
                    })
                })
                .then(async (res) => {
                    let r = await res.json();
                    console.log(r);
                    setOpen(true);
                });
        }

        triggerPositive();
    }

    return (
        <div className="App">
            <div className="card">
                <div className="base-container">
                    <div className="content">
                        <div className="image">

                            <img src={logo} alt="logo"/>

                        </div>


                        <h1 className="turquoiseColor">CovIWAd</h1>

                        {keycloak.authenticated ? (
                            <div>
                                <h1 className="darkBlueColor">Hello {keycloak.tokenParsed.given_name +
                                " " +
                                keycloak.tokenParsed.family_name}!</h1>

                                <div>
                                    {/*  <button className="btn btnSituation greenBackground" >Je suis négatif</button>
                                        <button className="btn btnSituation orangeBackground" >Je suis cas contact</button>
                                        */}
                                    <button className="btn btnSituation ceriseBackground" onClick={onPositiveClicked}>Je
                                        suis positif
                                    </button>
                                </div>
                                {/*
                                    <button className="btn turquoiseBackground" onClick={logout}>Logout</button>*/}
                            </div>

                        ) : (
                            <div>
                                <h3 className="darkBlueColor">Welcome! </h3>
                                <h4 className="darkBlueColor"> To continue, activate your location and identify
                                    yourself.</h4>

                                <button className="btn turquoiseBackground" onClick={login}>Login</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Your situation is up to date ! You are positive to COVID.
                    </Alert>
                </Snackbar>
            </div>
        </div>

    );
}
