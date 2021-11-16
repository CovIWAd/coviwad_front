import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: "http://localhost:5000/auth",
  realm: "SpringBootKeycloak",
  clientId: "front-app",
});

export default keycloak;

