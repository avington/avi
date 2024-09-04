import { useAuth0 } from '@auth0/auth0-react';
import styles from './auth0-auth-button.module.scss';

export function Auth0AuthButton() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    console.log('user', user);
    return (
      // user is authenticated
      <div>
        Hello {user?.name ?? ''}{' '}
        <button
          className={styles['button']}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Log out
        </button>
      </div>
    );
  } else {
    return (
      <button className={styles['button']} onClick={() => loginWithRedirect()}>
        Log in
      </button>
    );
  }
}

export default Auth0AuthButton;
