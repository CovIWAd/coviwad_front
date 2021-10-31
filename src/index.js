import React from 'react';
import ReactDOM from 'react-dom';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { keycloak } from "./keycloak";

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak.instance}>
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
