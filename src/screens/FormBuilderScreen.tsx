import React, { useState, useEffect, useContext } from 'react';
import FormBuilder from '../components/specific/FormBuilder';
import { Form } from '../types/FormTypes';
import { useParams, Link, Redirect, useLocation } from 'react-router-dom';
import FormContext from '../contexts/FormContext';
import NotificationContext from '../contexts/NotificationsContext';

const emptyForm = {
  name: '',
  description: '',
  id: '',
  steps: [],
};

const FormBuilderScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Form>(emptyForm);
  const [redirectComp, setRedirectComp] = useState(<> </>);
  const { id } = useParams();
  const location = useLocation<{ form?: Form }>();

  const { updateForm, createForm, getForm } = useContext(FormContext);
  const { showNotification } = useContext(NotificationContext);

  const loadForm = (id: string): void => {
    if (loading) {
      getForm(id)
        .then((res: { data: Form }) => {
          setForm(res.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log('load error', JSON.stringify(e, null, 2));
          showNotification(`Something went wrong: ${e.message}`, 'error');
        });
    }
  };

  const create = (form: Form) => {
    createForm(form)
      .then((res: { data: { Item: Form } }) => {
        console.log('create response', res);
        const formId = res.data.Item.id;
        console.log('new id:', formId);
        setRedirectComp(<Redirect to={`/edit/${formId}`} />);
        showNotification('Form successfully created!', 'success');
      })
      .catch((e) => {
        showNotification(`Something went wrong: ${e.message}`, 'error');
      });
  };

  const update = (form: Form) => {
    if (id && id !== '') {
      updateForm(id, form)
        .then((res) => {
          showNotification('Form successfully updated!', 'success');
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 400') {
            showNotification(
              `Request failed with status code 400. This means that the validation failed, i.e. some required field was left empty, probably. `,
              'error',
            );
          } else {
            showNotification(`Something went wrong: ${e.message}`, 'error');
          }
        });
    }
  };

  const copy = (form: Form) => {
    getForm(form.id).then((res: { data: Form }) => {
      const newForm: Form & { PK: string | undefined } = JSON.parse(JSON.stringify(res.data));
      newForm.id = '';
      newForm.PK = undefined;
      newForm.name += ' Copy';
      setForm(newForm);
      setLoading(false);
    });
  };

  const onSubmit = (form: Form) => {
    if (id && id !== '') {
      update(form);
    } else {
      create(form);
    }
  };

  useEffect(() => {
    if (id && id !== '') {
      loadForm(id);
    } else if (location?.state?.form) {
      copy(location.state.form);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <h3>Loading...{redirectComp}</h3>;
  }

  return (
    <div>
      <Link style={{ color: 'white' }} to="/">
        Back to list
      </Link>
      <FormBuilder onSubmit={onSubmit} form={form} />
      {redirectComp}
    </div>
  );
};

export default FormBuilderScreen;
