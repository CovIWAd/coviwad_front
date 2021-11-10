import {useKeycloak} from "@react-keycloak/web";
import React, {useCallback} from "react";
import '../../styles/Home.scss';
import '../../styles/App.scss';
import logo from "../../logo.png";


export default function Home() {
    const {keycloak} = useKeycloak();

    const login = useCallback(() => {
        keycloak.login();
    }, [keycloak]);

    const logout = useCallback(() => {
        keycloak.logout();
    }, [keycloak]);

    return (
            <div className="App">
                <div className="card">
                    <div className="base-container">
                        <div className="content">
                            <div className="image">
                                <img src={logo}/>
                            </div>


                            <h1 className="turquoiseColor">CovIWAd</h1>

                            {keycloak.authenticated ? (
                                <div>
                                    <h1 className="darkBlueColor">Hello {keycloak.tokenParsed.given_name+
                                    " " +
                                    keycloak.tokenParsed.family_name}!</h1>

                                    <div>
                                        <button className="btn btnSituation greenBackground" >Je suis négatif</button>
                                        <button className="btn btnSituation orangeBackground" >Je suis cas contact</button>
                                        <button className="btn btnSituation ceriseBackground" >Je suis positif</button>
                                    </div>
                                    <button className="btn turquoiseBackground" onClick={logout}>Logout</button>
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
            </div>

    );
}
