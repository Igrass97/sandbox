import * as z from 'zod';
import { TICKET_STATUSES, TICKET_TYPES } from '../../types';

// django/projects/quest_planner/ticket/models.py

export const CreateQuestFieldSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(255),
  t_type: z.enum(TICKET_TYPES),
  t_status: z.enum(TICKET_STATUSES),
  assignee: z.string().email(),
});
