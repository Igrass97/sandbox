import { Divider, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export const PageHeader = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>{title}</h1>
        {children}
      </Stack>
      <Divider />
    </>
  );
};
