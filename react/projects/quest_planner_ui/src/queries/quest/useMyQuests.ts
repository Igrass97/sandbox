import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../auth';
import { PaginatedQueryParams, PaginatedResponse, Ticket } from '../../types';
import { RQ_CONFIG } from '../config';

interface QuestsQueryParams extends PaginatedQueryParams {
  team_id?: string;
  member_id?: string;
}

const fetchMyQuests = async ({ queryKey: [url] }: { queryKey: [string] }) => {
  const { data } = await httpClient.get<PaginatedResponse<Ticket>>(url);

  return data;
};

const groupTicketsByStatus = (tickets: Ticket[]) => {
  return tickets.reduce((acc, ticket) => {
    const status = ticket.t_status;
    if (!acc[status]) {
      acc[status] = { results: [], count: 0 };
    }

    acc[status].results.push(ticket);
    acc[status].count++;

    return acc;
  }, {} as Record<string, PaginatedResponse<Ticket>>);
};

export const useMyQuests = () => {
  const { data, ...q } = useQuery({
    queryKey: ['/ticket'],
    queryFn: fetchMyQuests,
    ...RQ_CONFIG,
  });

  const mapped = data ? groupTicketsByStatus(data.results) : undefined;

  return {
    data: mapped,
    ...q,
  };
};
