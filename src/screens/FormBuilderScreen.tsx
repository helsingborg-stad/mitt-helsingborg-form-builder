import React, { useState, useEffect, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useParams, Link, Redirect, useLocation } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import ReactJson from 'react-json-view';
import FormBuilder from '../components/specific/FormBuilder';
import { Form, emptyForm } from '../types/FormTypes';
import FormContext from '../contexts/FormContext';
import NotificationContext from '../contexts/NotificationsContext';

import { computeMatrix } from '../components/specific/FormBuilderHelpers';

const hiddenFormJsonProperties = ['connectivityMatrix'];
const jsonCollapsedDepth = 3;

const useStyles = makeStyles(() =>
  createStyles({
    inner: {
      width: '90%',
      margin: '0 auto',
    },
  }),
);

const FormBuilderScreen: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Form>(emptyForm);
  const [redirectComp, setRedirectComp] = useState(<> </>);
  const { id } = useParams();
  const location = useLocation<{ form?: Form }>();
  const [showJSON, setShowJSON] = useState(false);

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

  const toggleShowJson = () => {
    setShowJSON((oldValue) => !oldValue);
  };

  return (
    <div>
      <div className={classes.inner}>
        <Link style={{ color: 'white' }} to="/">
          Back to list
        </Link>
        <Formik
          initialValues={{ ...form }}
          onSubmit={(form: Form) => {
            onSubmit(form);
          }}
        >
          {({ values, setFieldValue, handleSubmit, setValues }) => {
            const { steps = [], stepStructure = [], name } = values;
            return (
              <FormikForm
                onSubmit={(e) => {
                  const matrix = computeMatrix(stepStructure);
                  values.connectivityMatrix = matrix;
                  setValues(values);
                  handleSubmit(e);
                }}
              >
                <FormBuilder
                  steps={steps}
                  stepStructure={stepStructure}
                  name={name}
                  formId={form.id}
                  showJson={showJSON}
                  onSetFieldValue={setFieldValue}
                  onToggleShowJson={toggleShowJson}
                />

                {showJSON && (
                  <div>
                    <h3>JSON Form data</h3>
                    <ReactJson
                      src={values}
                      name="Form"
                      theme="monokai"
                      collapsed={jsonCollapsedDepth}
                      shouldCollapse={({ name }) => hiddenFormJsonProperties.includes(name as string)}
                    />
                  </div>
                )}
              </FormikForm>
            );
          }}
        </Formik>

        {redirectComp}
      </div>
    </div>
  );
};

export default FormBuilderScreen;
