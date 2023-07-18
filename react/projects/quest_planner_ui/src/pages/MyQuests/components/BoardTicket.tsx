import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { Ticket } from '../../../types';
import { useDraggerData } from '../draggerdata/dragger';
import { BugReport, Science, StarBorderOutlined } from '@mui/icons-material';

const TypeIcons = {
  BU: <BugReport fontSize="small" color="error" />,
  ST: <StarBorderOutlined fontSize="small" color="success" />,
  SP: <Science fontSize="small" color="disabled" />,
};

export const BoardTicket = ({
  ticket,
  ...props
}: { ticket: Ticket } & Record<string, unknown>) => {
  const setDragData = useDraggerData(state => state.setDragData);

  const handleDragStart = (
    _e: React.DragEvent<HTMLDivElement>,
    quest: Ticket
  ) => {
    setDragData(quest);
  };

  return (
    <Paper
      variant="outlined"
      draggable
      onDragStart={e => handleDragStart(e, ticket)}
      onDragEnd={() => setDragData(undefined)}
      sx={{
        maxWidth: '250px',
        height: '120px',
        margin: '0.5rem auto',
        cursor: 'pointer',
        p: 1,
      }}
      {...props}
    >
      <Stack justifyContent="space-between" height="100%">
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {ticket.id}
          </Typography>
          {ticket.assignee && (
            <Avatar sx={{ width: '30px', height: '30px' }}>
              <Typography>{ticket.assignee[0].toUpperCase()}</Typography>
            </Avatar>
          )}
        </Stack>
        <Typography>{ticket.title}</Typography>
        {TypeIcons[ticket.t_type]}
      </Stack>
    </Paper>
  );
};
