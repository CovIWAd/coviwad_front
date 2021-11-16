import React from "react";
import keycloak from "./keycloak";
import AppRoutes from "./routes/Routes";
import { ReactKeycloakProvider } from '@react-keycloak/web'


function App() {
  const eventLogger = (event, error) => {
    console.log('onKeycloakEvent', event, error)
  }

  const tokenLogger = (tokens) => {
    console.log('onKeycloakTokens', tokens)
  }

  return (
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={eventLogger}
        onTokens={tokenLogger}
      >
        <AppRoutes/>
      </ReactKeycloakProvider>
    );
}

export default App;
