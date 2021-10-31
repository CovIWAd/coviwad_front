import Keycloak from "keycloak-js";

const instance = new Keycloak("./keycloak.json");

const initConfig = {
  onLoad: "login-required",
};

export const keycloak = {
  instance: instance,
  initConfig: initConfig,
};
