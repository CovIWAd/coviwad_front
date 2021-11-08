import {Route, Link, Navigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const PrivateRoute = ({children}) => {
    const {keycloak} = useKeycloak();

    return keycloak.authenticated ? children : <Navigate to ="/" />;

}

export default PrivateRoute