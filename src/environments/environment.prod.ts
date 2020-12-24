import { config } from './../config';
// import { config } from 'config';


//Production Environment
export const environment = {
  production: true,
  apiURL: config.apiUrl,
  //Soruce: https://github.com/bbachi/keycloak-todos/blob/master/src/environments/environment.prod.ts
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080/auth/realms/mmcomputer',
    // concrete Address commes here
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/shop',

    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'app-mmcomputer',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email offline_access',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};