import { Button, FormControlLabel, Skeleton, Switch } from '@mui/material';
import { useMyQuests } from '../../queries/quest/useMyQuests';
import { Board } from './components/Board';
import { PageContainer } from '../../components/PageContainer';
import { AddOutlined } from '@mui/icons-material';
import { CreateQuestDialog } from '../../components/CreateQuest/CreateQuest';
import { useBoolean } from '../../hooks/useBoolean';
import { PageHeader } from '../../components/PageHeader';
import { useState } from 'react';
import { Book } from './components/Book';

export const MyQuests = () => {
  const [epicMode, setEpicMode] = useState(false);

  const [isCreateOpen, { on: handleCreateOpen, off: handleCreateClose }] =
    useBoolean(false);

  const { data: myQuests, isLoading } = useMyQuests();

  const todoQuests = myQuests?.TD?.results || [];
  const inProgressQuests = myQuests?.IP?.results || [];
  const doneQuests = myQuests?.DO?.results || [];

  return (
    <PageContainer>
      <PageHeader title="My Quests">
        <Button
          size="medium"
          variant="outlined"
          startIcon={<AddOutlined />}
          onClick={handleCreateOpen}
        >
          Create
        </Button>
      </PageHeader>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch value={epicMode} onChange={(_e, c) => setEpicMode(c)} />
            }
            label="Epic Mode"
          />
          {epicMode ? (
            <Book
              todoQuests={todoQuests}
              inProgressQuests={inProgressQuests}
              doneQuests={doneQuests}
            />
          ) : (
            <Board
              todoQuests={todoQuests}
              inProgressQuests={inProgressQuests}
              doneQuests={doneQuests}
            />
          )}
        </>
      )}
      <CreateQuestDialog open={isCreateOpen} onClose={handleCreateClose} />
    </PageContainer>
  );
};
