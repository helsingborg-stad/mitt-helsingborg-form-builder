import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '../../../types/FormTypes';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Typography, List } from '@material-ui/core';
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

const emptyForm: Form = {
  name: '',
  description: '',
  steps: [],
  subform: false,
  id: '',
};
interface Props {
  forms: Form[];
  count: number;
  deleteForm: (id: string) => void;
}
const FormList: React.FC<Props> = ({ forms, deleteForm }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, selectForm] = useState(emptyForm);
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

  const mainForms = forms.filter((f) => !f.subform);
  const subforms = forms.filter((f) => f.subform);

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
        Main Forms
      </Typography>
      <div className={classes.demo}>
        <List>
          {mainForms.map((form, i) => {
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
      <Typography variant="h5" className={classes.title}>
        Subforms
      </Typography>
      <div className={classes.demo}>
        <List>
          {subforms.map((form, i) => {
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
