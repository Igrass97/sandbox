import { Box, Typography } from '@mui/material';
import { Ticket, TicketStatus } from '../../../types';
import { BoardTicket } from './BoardTicket';
import { useDraggerData } from '../draggerdata/dragger';
import { useTransitionQuestStatus } from '../../../queries/quest/useTransitionQuestStatus';

export const BoardColumn = ({
  title,
  tickets,
  status,
}: {
  title: string;
  tickets: Ticket[];
  status: TicketStatus;
}) => {
  const { optimisticUpdateBoard, mutate: transitionQuest } =
    useTransitionQuestStatus();

  const dragData = useDraggerData(state => state.data);
  const setDragData = useDraggerData(state => state.setDragData);

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (!dragData) return;

    transitionQuest({ newStatus: status, questID: dragData.id });
    optimisticUpdateBoard({ newQuest: { ...dragData, t_status: status } });
    setDragData(undefined);
  };

  const isDraggingInThisColumn = tickets.find(t => t.id === dragData?.id);

  return (
    <Box
      sx={{
        bgcolor: isDraggingInThisColumn
          ? 'primary.main'
          : dragData
          ? 'success.hover'
          : '#00000026',
        borderRadius: 2,
        mt: 2,
        p: 3,
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Typography variant="subtitle2">{title}</Typography>
      {tickets.map(t => (
        <BoardTicket ticket={t} key={t.id} />
      ))}
    </Box>
  );
};
