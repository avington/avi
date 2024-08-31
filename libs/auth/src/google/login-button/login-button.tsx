import { GoogleLogin } from '@react-oauth/google';
import styles from './login-button.module.scss';
import { useSessionStorage } from '@avi/shared/hooks';

export function LoginButton() {
  const [_, setToken] = useSessionStorage<string>('token', '');

  return (
    <>
      <GoogleLogin
        auto_select={true}
        useOneTap={true}
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          setToken(credentialResponse?.credential ?? '');
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />{' '}
      <span>test</span>
    </>
  );
}

export default LoginButton;
