import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../auth';
import { SelectChoice } from '../../types';
import { RQ_CONFIG } from '../config';

export const useTicketTypes = () => {
  const fetchTicketTypes = async ({
    queryKey: [url],
  }: {
    queryKey: [string];
  }) => {
    const { data } = await httpClient.get<SelectChoice[]>(url);

    return data;
  };

  return useQuery({
    queryKey: ['/ticket/types/'],
    queryFn: fetchTicketTypes,
    ...RQ_CONFIG,
  });
};
