import React from 'react';
import CSS from 'csstype';
import { Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { User, CoApplicant } from '../../../types/UserType';
import { useFormikContext } from 'formik';
import { Form } from '../../../types/FormTypes';

const emptyUser: User = {
  firstName: '',
  lastName: '',
  mobilePhone: '',
  email: '',
  civilStatus: '',
  personalNumber: '',
  address: {
    street: '',
    postalCode: '',
    city: '',
  },
};

const userOptions = Object.keys(emptyUser).reduce(
  (prev, key) => {
    if (key !== 'address') {
      return [`applicant.${key}`, ...prev];
    }
    return [...Object.keys(emptyUser.address).map((k) => `applicant.address.${k}`), ...prev];
  },
  [''],
); //add the empty string as an option, so that the user can choose to empty the select field in the form

const emptyCoApplicant: CoApplicant = {
  firstName: '',
  lastName: '',
  personalNumber: '',
};

const coApplicantOptions = ['', ...Object.keys(emptyCoApplicant).map((attribute) => `coApplicant.${attribute}`)];

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
}

const LoadPreviousToggle: React.FC<Props> = ({ name, label, value }: Props) => {
  const { setFieldValue } = useFormikContext<Form>();

  const usingPreviousForm = (() => {
    if (!value.loadPrevious) return false;
    if (value.loadPrevious.length === 0) return false;
    const stringArray = value.loadPrevious[0].split('.');
    if (stringArray[0] === 'applicant' || stringArray[0] === 'coApplicant') return false;
    return true;
  })();

  const userInfo = (() => {
    if (!value.loadPrevious || value.loadPrevious.length === 0) return '';
    if (usingPreviousForm) {
      if (value.loadPrevious.length > 1) return value.loadPrevious[1];
      return '';
    }
    return value.loadPrevious[0];
  })();

  const onToggle = () => {
    if (usingPreviousForm) {
      if (setFieldValue) {
        const [, ...rest] = value.loadPrevious;
        setFieldValue(name, rest);
      }
    } else {
      if (setFieldValue) {
        const id = value.id || value.key || value.title || '';
        if (value?.loadPrevious) {
          setFieldValue(name, [id, ...value.loadPrevious]);
        } else {
          setFieldValue(name, [id]);
        }
      }
    }
  };

  const onSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    if (usingPreviousForm && setFieldValue) {
      const [first] = value.loadPrevious;
      if (val !== '') {
        setFieldValue(name, [first, val]);
      } else {
        setFieldValue(name, [first]);
      }
    } else if (val !== '' && setFieldValue) {
      setFieldValue(name, [val]);
    } else if (setFieldValue) {
      setFieldValue(name, []);
    }
  };

  return (
    <>
      <h4>Dynamic data loading</h4>
      <FormGroup style={inputFieldStyle} row>
        <FormControlLabel
          control={
            <Checkbox
              checked={usingPreviousForm}
              onChange={() => {
                onToggle();
              }}
              name={name}
            />
          }
          label={label}
        />
      </FormGroup>
      <FormGroup style={inputFieldStyle} row>
        <div style={{ paddingTop: '5px', marginRight: '10px' }}>Load from applicant info</div>
        <Select name={name} onChange={onSelect} value={userInfo}>
          {userOptions.map((choice) => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <FormGroup style={inputFieldStyle} row>
        <div style={{ paddingTop: '5px', marginRight: '10px' }}>Load from co-applicant info</div>
        <Select name={name} onChange={onSelect} value={userInfo}>
          {coApplicantOptions.map((choice) => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
    </>
  );
};

export default LoadPreviousToggle;
