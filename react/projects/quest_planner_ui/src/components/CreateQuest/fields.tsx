import {
  Title,
  MailOutline,
  DescriptionOutlined,
  RocketLaunchOutlined,
  LabelOutlined,
} from '@mui/icons-material';
import { InputAdornment, MenuItem } from '@mui/material';
import { useTicketStatuses } from '../../queries/quest/useTicketStatuses';
import { useTicketTypes } from '../../queries/quest/useTicketTypes';
import { TextInput } from '../TextInput';

export const TypeInput = () => {
  const { data: types } = useTicketTypes();

  return (
    <TextInput
      label="Type"
      disabled={!types}
      fullWidth
      name="t_type"
      select={!!types}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LabelOutlined />
          </InputAdornment>
        ),
      }}
    >
      {types?.map(type => (
        <MenuItem key={type.id} value={type.id}>
          {type.label}
        </MenuItem>
      ))}
      <MenuItem hidden disabled value={''}>
        Type
      </MenuItem>
    </TextInput>
  );
};

export const StatusInput = () => {
  const { data: statuses } = useTicketStatuses();

  return (
    <TextInput
      label="Status"
      disabled={!statuses}
      fullWidth
      name="t_status"
      select={!!statuses}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <RocketLaunchOutlined />
          </InputAdornment>
        ),
      }}
    >
      {statuses?.map(status => (
        <MenuItem key={status.id} value={status.id}>
          {status.label}
        </MenuItem>
      ))}
      <MenuItem hidden disabled value={''}>
        Status
      </MenuItem>
    </TextInput>
  );
};

export const TitleInput = () => {
  return (
    <TextInput
      fullWidth
      name="title"
      placeholder="Title"
      label="Title"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Title />
          </InputAdornment>
        ),
      }}
    />
  );
};

export const AssigneeInput = () => {
  return (
    <TextInput
      fullWidth
      name="assignee"
      placeholder="Assignee Email"
      type="email"
      label="Assignee Email"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MailOutline />
          </InputAdornment>
        ),
      }}
    />
  );
};

export const DescriptionInput = () => {
  return (
    <TextInput
      multiline
      rows={4}
      fullWidth
      name="description"
      label="Description"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <DescriptionOutlined />
          </InputAdornment>
        ),
      }}
    />
  );
};
