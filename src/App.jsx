import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/Routes";
import {useKeycloak} from "@react-keycloak/web";
import ButtonAppBar from "./views/navbar/Navbar";


function App() {

    const {keycloak} = useKeycloak();

    return (
      <BrowserRouter>
          {keycloak.authenticated && (
          <ButtonAppBar/> )}
          <AppRoutes/>
      </BrowserRouter>
    );
}

export default App;
