export type TicketType = 'ST' | 'BU' | 'SP';
export type TicketStatus = 'TD' | 'IP' | 'DO';

export const TICKET_TYPES = ['ST', 'BU', 'SP'] as const;
export const TICKET_STATUSES = ['TD', 'IP', 'DO'] as const;
export interface Ticket {
  title: string;
  created: string;
  updated: string;
  t_type: TicketType;
  t_status: TicketStatus;
  description: string;
  member: string;
  assignee: string;
  id: string;
}

export interface PaginatedQueryParams {
  page: number;
  page_size: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
}

export interface SelectChoice {
  id: string;
  label: string;
}
