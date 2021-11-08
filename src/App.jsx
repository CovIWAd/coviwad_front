import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./routes/routes";
import {useKeycloak} from "@react-keycloak/web";
import ButtonAppBar from "./views/navbar/Navbar";


function App() {

    const {keycloak} = useKeycloak();

    return (
      <Router>
          {keycloak.authenticated && (
          <ButtonAppBar/> )}
          <AppRoutes/>
      </Router>
    );
}

export default App;
