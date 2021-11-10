import {Route, Redirect} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const {keycloak} = useKeycloak();

    const isAuthorized = (roles) => {
        if (keycloak && roles) {
            return roles.some(r => {
                const realm =  keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                return realm || resource;
            });
        }
        return false;
    }

    return (
      <Route
        {...rest}
        render={props => {
            return keycloak?.authenticated ?
              (isAuthorized(roles) ? <Component {...props} /> : <Redirect to={"/"}/> )
              : keycloak.login()
        }}
      />
    )


}

export default PrivateRoute
