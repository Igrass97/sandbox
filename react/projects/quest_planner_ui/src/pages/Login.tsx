import { Button } from '@mui/material';
import { useLogin } from '../auth';

export const Login = () => {
  const { mutate: login } = useLogin();

  return (
    <Button
      onClick={() => {
        login({ username: 'igrass97+basic', password: '159753' });
      }}
    >
      Login
    </Button>
  );
};

export default Login;
