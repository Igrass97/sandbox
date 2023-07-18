import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../auth';
import { Ticket, TicketStatus, TicketType } from '../../types';

export interface TicketCreateFields {
  title: string;
  description: string;
  t_type: TicketType;
  t_status: TicketStatus;
  assignee: string;
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  const createTicket = (ticketData: TicketCreateFields) => {
    return httpClient.post(`/ticket/`, ticketData);
  };

  return useMutation(createTicket, {
    onSuccess: () => queryClient.invalidateQueries(['/ticket']),
  });
};
