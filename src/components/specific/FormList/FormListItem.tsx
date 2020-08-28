import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '../../../types/FormTypes';
import { ListItem, ListItemText, IconButton, ListItemAvatar, Avatar } from '@material-ui/core';
import { Delete as DeleteIcon, FormatAlignLeft as FormIcon } from '@material-ui/icons';

interface Props {
  form: Form;
  index: number;
  onDelete: () => void;
}

const FormListItem: React.FC<Props> = (props) => {
  const { form, index, onDelete } = props;
  const history = useHistory();

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <ListItem
      button
      onClick={() => {
        history.push(`/edit/${form.id}`);
      }}
      key={form.id}
    >
      <ListItemAvatar>
        <Avatar>
          <FormIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={form.name && form.name !== '' ? `${index + 1}. ${form.name}` : 'Unnamed form'} />
      <div style={{ position: 'absolute', right: '5px', top: '-3px', textAlign: 'right' }}>
        <IconButton onClick={onDeleteClick}>
          <Avatar>
            <DeleteIcon />
          </Avatar>
        </IconButton>
      </div>
    </ListItem>
  );
};

export default FormListItem;
