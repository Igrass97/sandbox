import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const PageContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
      {children}
    </Box>
  );
};
