import { FormProvider } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { TitleInput, TypeInput, StatusInput, DescriptionInput } from './fields';
import { useCreateQuestForm } from './useCreateTicketForm';

export const CreateQuestDialog = ({
  open,
  onClose,
}: Omit<DialogProps, 'onClose'> & { onClose: () => void }) => {
  const { methods, handleSubmit, isLoading } = useCreateQuestForm(onClose);

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ elevation: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create new Quest 🧙🏼</DialogTitle>
          <DialogContent>
            <CreateQuestFields />
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={onClose}>
              CLOSE
            </Button>
            <LoadingButton loading={isLoading} variant="text" type="submit">
              CREATE
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export const CreateQuest = () => {
  const { methods, handleSubmit, isLoading } = useCreateQuestForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <CreateQuestFields />
        <LoadingButton loading={isLoading} variant="text" type="submit">
          CREATE
        </LoadingButton>
      </form>
    </FormProvider>
  );
};

export const CreateQuestFields = () => (
  <>
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <TitleInput />
      </Grid>
      <Grid item xs={6}>
        <TypeInput />
      </Grid>
      <Grid item xs={6}>
        <StatusInput />
      </Grid>
      {/* <Grid item xs={12}>
        <AssigneeInput />
      </Grid> */}
      <Grid item xs={12}>
        <DescriptionInput />
      </Grid>
    </Grid>
  </>
);
