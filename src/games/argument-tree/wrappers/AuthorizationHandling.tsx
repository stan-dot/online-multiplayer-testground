export type AuthorizationHandling = {
  status: boolean;
  loginCallback: Function;
  logoutCallback: Function;
};
export const DEFAULT_AUTHORIZATION_HANDLING: AuthorizationHandling = {
  status: false,
  loginCallback: () => console.log('loginCallback'),
  logoutCallback: () => console.log('logoutCallback'),
};
