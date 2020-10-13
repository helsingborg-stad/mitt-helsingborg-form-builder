import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, emptyForm } from '../../../types/FormTypes';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Typography, List, TextField } from '@material-ui/core';
import FormListItem from './FormListItem';
import DeleteModal from './DeleteModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      color: 'white',
      backgroundColor: '#424242', //theme.palette.primary.light,
      // backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

const formFilter = (filterString: string) => (form: Form): boolean => {
  if (form.name) {
    const match = form.name.toLowerCase().match(filterString.toLowerCase());
    if (!match) return false;
    return match.length > 0;
  }
  return false;
};

interface Props {
  forms: Form[];
  count: number;
  deleteForm: (id: string) => void;
}
const FormList: React.FC<Props> = ({ forms, deleteForm }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, selectForm] = useState(emptyForm);
  const [formFilterString, setFormFilter] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const show = () => {
    setShowModal(true);
  };
  const close = () => {
    setShowModal(false);
  };

  const delForm = (formId: string) => {
    deleteForm(formId);
  };

  return (
    <div>
      <Button
        onClick={() => {
          history.push('/edit');
        }}
        style={{ margin: '5px' }}
        variant="contained"
        color="primary"
      >
        Create new form
      </Button>

      <Typography variant="h5" className={classes.title}>
        Forms
      </Typography>
      <TextField
        value={formFilterString}
        fullWidth
        label="Filter forms"
        onChange={(e) => {
          setFormFilter(e.target.value);
        }}
      />
      <div className={classes.demo}>
        <List>
          {forms.filter(formFilter(formFilterString)).map((form, i) => {
            return (
              <FormListItem
                key={form.id || form.name}
                form={form}
                onDelete={() => {
                  selectForm(form);
                  show();
                }}
                index={i}
              />
            );
          })}
        </List>
      </div>

      <DeleteModal
        open={showModal}
        onClose={close}
        form={selectedForm}
        onDelete={() => {
          if (selectedForm.id) delForm(selectedForm.id);
        }}
      />
    </div>
  );
};

export default FormList;
