import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../auth';
import { PaginatedResponse, Ticket, TicketStatus } from '../../types';

export const useTransitionQuestStatus = () => {
  const queryClient = useQueryClient();

  const transitionQuestStatus = ({
    newStatus,
    questID,
  }: {
    newStatus: TicketStatus;
    questID: number | string;
  }) => {
    return httpClient.patch(`/ticket/${questID}/`, {
      t_status: newStatus,
    });
  };

  const optimisticUpdateBoard = ({
    newQuest,
  }: {
    newQuest: Partial<Ticket>;
  }) => {
    queryClient.setQueryData(['/ticket'], () => {
      const originalData: PaginatedResponse<Ticket> | undefined =
        queryClient.getQueryData(['/ticket']);

      if (!originalData) return;

      const questIndex = originalData?.results.findIndex(
        ticket => newQuest.id === ticket.id
      );

      if (questIndex < 0) return;

      const newData = { ...originalData };
      newData.results[questIndex] = {
        ...newData.results[questIndex],
        ...newQuest,
      };

      return newData;
    });
  };

  return { ...useMutation(transitionQuestStatus), optimisticUpdateBoard };
};
