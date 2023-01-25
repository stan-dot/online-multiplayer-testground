import React, { ReactElement, useEffect } from 'react';
import { AuthorizationHandling, DEFAULT_AUTHORIZATION_HANDLING } from './AuthorizationHandling';

export const AuthorizationContext = React.createContext(
  DEFAULT_AUTHORIZATION_HANDLING,
);
export function AuthorizationWrapper(props: {
  children: React.ReactNode;
}): ReactElement {
  const [authorized, setAuthorized] = React.useState(false);

  /* istanbul ignore next*/
  const handleServerResponse = (response: any) => {
    console.log('authentication status :', response.ifAuthenticated);
    setAuthorized(response.ifAuthenticated);
  };

  /* istanbul ignore next*/
  const handleLoginSubmission = (data: any): void => {
    console.log('sending credentials to server:', data);
    socket.emit('login', data);
  };
  const AUTHORIZATION_HANDLER: AuthorizationHandling = {
    status: authorized,
    loginCallback: handleLoginSubmission,
    logoutCallback: handleServerResponse,
  };

  return (
    <AuthorizationContext.Provider
      value={AUTHORIZATION_HANDLER}
      data-cy="authorization-context-provider"
    >
      {props.children}
    </AuthorizationContext.Provider>
  );
}
