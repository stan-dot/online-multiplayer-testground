import React from 'react';
import { AuthorizationContext } from './Authorization.wrapper';
import { AuthorizationHandling } from './AuthorizationHandling';

export function LoginToggleMenu() {
  const AuthorizationHandler: AuthorizationHandling =
    React.useContext(AuthorizationContext);

  return AuthorizationHandler.status ? (
    <button
      onClick={() => AuthorizationHandler.logoutCallback(false)}
      style={{ color: 'inherit' }}
      data-testid="logout-button"
      data-cy="logout-button"
    >
      Logout
      <p data-cy="logout-icon" />
    </button>
  ) : (
    <p>here authorization popup</p>
  );
}
