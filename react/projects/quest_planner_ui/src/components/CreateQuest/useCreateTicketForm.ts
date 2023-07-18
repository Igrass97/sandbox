import { SubmitHandler, useForm } from 'react-hook-form';
import {
  TicketCreateFields,
  useCreateTicket,
} from '../../queries/quest/useCreateTicket';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { CreateQuestFieldSchema } from './fieldSchema';

export const useCreateQuestForm = (callback?: () => void) => {
  const { mutate: createTicket, ...rest } = useCreateTicket();

  const methods = useForm<TicketCreateFields>({
    resolver: zodResolver(CreateQuestFieldSchema),
    defaultValues: {
      title: '',
      description: '',
      t_type: 'ST',
      t_status: 'TD',
    },
  });

  const { reset, handleSubmit } = methods;

  const handleCreateQuest: SubmitHandler<TicketCreateFields> = (
    values: TicketCreateFields
  ) => {
    createTicket(values, {
      onSuccess: () => {
        toast.success('Ticket created successfully');
        reset();
        callback?.();
      },
    });
  };

  return {
    handleSubmit: handleSubmit(handleCreateQuest),
    methods,
    ...rest,
  };
};
