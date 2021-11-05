import {useKeycloak} from "@react-keycloak/web";
import React, {useCallback} from "react";

export default function Home() {
  const { keycloak } = useKeycloak();
  //const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  //const [id, setId] = useState(-1);

  /*useEffect(() => {
      console.log("LOGIN ?"+keycloak.authenticated)
     // keycloak.loadUserInfo().then((userInfo) => {
     //   setName(userInfo.name);
     //   setEmail(userInfo.email);
     //   //setId(userInfo.is);
     // })
  },[keycloak.authenticated]);*/

  const login = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const logout = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  return (
    <div>
      <h1>CovIWAd</h1>
      {keycloak.authenticated ? (
        <div>
          <h2>Bonjour!</h2>
          {/*<h5>{email}</h5>*/}
          <button onClick={logout}>Logout</button>
        </div>

      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
