import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import { publicRouter, router } from './router';
import { useAuthState, useBackendUserProfile } from './auth';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66dcac',
      // @ts-ignore
      hover: '#66dcac78',
    },
    success: {
      main: '#287a2c',
      // @ts-ignore
      hover: '#287a2c4f',
    },
  },
});

export const App = () => {
  const user = useAuthState(state => state.user);
  const { isLoading, enabled } = useBackendUserProfile();

  if (isLoading && enabled) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size="large" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {user && <RouterProvider router={router} />}
      {!user && <RouterProvider router={publicRouter} />}
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
