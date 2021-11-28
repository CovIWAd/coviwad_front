import {
    Route, BrowserRouter as Routes, Switch
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NewsReader from "../views/news/NewsReader";
import Home from "../views/home/Home";
import MyDocuments from "../views/documents/MyDocuments";
import {useKeycloak} from "@react-keycloak/web";
import ButtonAppBar from "../views/navbar/Navbar";
import React from "react";
import MyProfile from "../views/users/MyProfile";

export default function AppRoutes() {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
        <Routes>
          <ButtonAppBar/>
          <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/news" component={NewsReader}/>
                <PrivateRoute exact roles={['app-user']} path="/documents" component={MyDocuments}/>
                <PrivateRoute exact roles={['app-user', 'app-admin']} path="/profile" component={MyProfile}/>
          </Switch>
        </Routes>


    );
}
