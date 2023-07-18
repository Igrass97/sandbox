import { Box } from '@mui/material';
import { Ticket } from '../../../types';
import { BoardColumn } from './BoardColumn';

export const Board = ({
  todoQuests,
  inProgressQuests,
  doneQuests,
}: {
  todoQuests: Ticket[];
  inProgressQuests: Ticket[];
  doneQuests: Ticket[];
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: '1fr',
        gridColumnGap: 16,
        gridRowGap: 0,
        maxWidth: '1350px',
        my: 0,
        mx: 'auto',
        pb: 2,
      }}
    >
      <BoardColumn title="To Do" tickets={todoQuests} status="TD" />
      <BoardColumn title="In Progress" tickets={inProgressQuests} status="IP" />
      <BoardColumn title="Done" tickets={doneQuests} status="DO" />
    </Box>
  );
};
