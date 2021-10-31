import React, {useCallback} from "react";
import "./App.scss";
//import { Login, Register } from "./components/login/index";
import {useKeycloak} from "@react-keycloak/web";

function App() {
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

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLogginActive: true
//         };
//     }
//
//     componentDidMount() {
//         //right by default
//         this.rightSide.classList.add("right");
//     }
//
//     changeState() {
//         const { isLogginActive } = this.state;
//
//         if (isLogginActive) { // right side for login
//             this.rightSide.classList.remove("right");
//             this.rightSide.classList.add("left");
//         } else { //left side for register
//             this.rightSide.classList.remove("left");
//             this.rightSide.classList.add("right");
//         }
//         this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
//     }
//
//     render() {
//         const { isLogginActive } = this.state;
//         const current = isLogginActive ? "Register" : "Login";
//         const currentActive = isLogginActive ? "login" : "register";
//         return (
//             <div className="App">
//                 <div className="login">
//                     <div className="container" ref={ref => (this.container = ref)}>
//                         {isLogginActive && (
//                             <Login containerRef={ref => (this.current = ref)} />
//                         )}
//                         {!isLogginActive && (
//                             <Register containerRef={ref => (this.current = ref)} />
//                         )}
//                     </div>
//                     <RightSide
//                         current={current}
//                         currentActive={currentActive}
//                         containerRef={ref => (this.rightSide = ref)}
//                         onClick={this.changeState.bind(this)}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }
//
// const RightSide = props => {
//     return (
//         <div
//             className="right-side"
//             ref={props.containerRef}
//             onClick={props.onClick}
//         >
//             <div className="inner-container">
//                 <div className="text">{props.current}</div>
//             </div>
//         </div>
//     );
// };

export default App;
