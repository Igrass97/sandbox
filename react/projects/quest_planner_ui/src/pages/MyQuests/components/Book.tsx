import { Box, Stack, styled } from '@mui/material';
import { useMyQuests } from '../../../queries/quest/useMyQuests';
import { TICKET_TYPES, Ticket } from '../../../types';
import { useState } from 'react';

const Tab = styled('button')(({ selected }: { selected?: boolean }) => ({
  outline: 'none',
  backgroundColor: 'transparent',
  padding: '1.3rem',
  fontSize: '1.2rem',
  color: selected ? '#1f0f0c' : '#5a3535',
  border: 'none',
  borderBottom: !selected ? '3px solid #8e6a1d4a' : 'none',
  '&:not(:last-child)': {
    borderRight: '3px solid #8e6a1d4a',
  },
  cursor: 'pointer',
  flex: 1,
}));

export const Tabs = ({
  selectedTab,
  selectTab,
}: {
  selectedTab: string;
  selectTab: (t: string) => void;
}) => {
  return (
    <Stack direction="row">
      <Tab selected={selectedTab === 'TD'} onClick={() => selectTab('TD')}>
        To Do
      </Tab>
      <Tab selected={selectedTab === 'IP'} onClick={() => selectTab('IP')}>
        In Progress
      </Tab>
      <Tab selected={selectedTab === 'DO'} onClick={() => selectTab('DO')}>
        Completed
      </Tab>
    </Stack>
  );
};

export const Book = ({
  todoQuests,
  inProgressQuests,
  doneQuests,
}: {
  todoQuests: Ticket[];
  inProgressQuests: Ticket[];
  doneQuests: Ticket[];
}) => {
  const [selectedTab, setSelectedTab] = useState('TD');

  return (
    <Box
      height={600}
      width="100%"
      mx="auto"
      mt={2}
      border={4}
      borderColor="#8e6a1d4a"
      bgcolor="#DCBD87"
      sx={{ boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)' }}
      display="flex"
    >
      <Box flex={1} borderRight={6} borderColor="#8e6a1d4a">
        <Tabs selectedTab={selectedTab} selectTab={setSelectedTab} />
      </Box>
      <Box flex={1}></Box>
    </Box>
  );
};
