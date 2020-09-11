import React from 'react';
import CSS from 'csstype';
import { Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { User } from '../../types/UserType';

const emptyUser: User = {
    firstName: '',
    lastName: '',
    mobilePhone: '',
    email: '',
    civilStatus: '',
    address: {
        street: '',
        postalCode:'',
        city: '',
    },
}
const userOptions = Object.keys(emptyUser).reduce( (prev, key ) => {
    if ( key !== 'address'){
        return [`user.${key}`, ...prev];
    }
    return [...Object.keys(emptyUser.address).map( k => `user.address.${k}`), ...prev];
  }, ['']); //add the empty string as an option, so that the user can choose to empty the select field in the form

const inputFieldStyle: CSS.Properties = {
    marginLeft: '7px',
    marginTop: '5px',
  };

interface Props {
    name: string;
    label: string;
    value: Record<string, any>;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const LoadPreviousToggle: React.FC<Props> = ({name, label, value, setFieldValue}: Props) => {

    const usingPreviousForm = (() => {
      if (!value.loadPrevious) return false;
      if (value.loadPrevious.length === 0) return false; 
      if (value.loadPrevious[0].split('.')[0] === 'user') return false;
      return true; 
    }) ();

    const userInfo = (() => {
      if (!value.loadPrevious || value.loadPrevious.length === 0) return ''; 
      if (usingPreviousForm) {
        if (value.loadPrevious.length > 1) return value.loadPrevious[1];
        return '';
      }
      return value.loadPrevious[0];
    })();

    const onToggle = () => {
      if (usingPreviousForm){
        if (setFieldValue) {
          const [, ...rest] = value.loadPrevious;
          setFieldValue(name, rest);
        }
      } else {
        if (setFieldValue) {
          const id = value.id || value.key || value.title || '';
          if(value?.loadPrevious){
            setFieldValue(name, [id, ...value.loadPrevious]);
          } else {
            setFieldValue(name, [id]);
          }
        }
      }
    }

    const onSelect = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;}>) => {
        const val = (event.target.value as string);
        if(usingPreviousForm && setFieldValue){
          const [first] = value.loadPrevious;
          if(val !== '') { 
            setFieldValue(name, [first, val]);
          } else { 
            setFieldValue(name, [first]);
          }
        } else if (val !== '' && setFieldValue) {
          setFieldValue(name, [val]);
        } else if(setFieldValue) {
          setFieldValue(name, []);
        }
    }


    return (
        <>
        <h4>Dynamic data loading</h4>
        <FormGroup style={inputFieldStyle} row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={usingPreviousForm}
                  onChange={ (e) => { 
                    onToggle(); 
                    // onChange(e);
                    }}
                  name={name}
                />
              }
              label={label}
            />
        </FormGroup>
        <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '5px', marginRight: '10px' }}>Load from user info</div>
            <Select name={name} onChange={onSelect} value={userInfo}>
              {userOptions.map((choice) => (
                    <MenuItem key={choice} value={choice}>
                      {choice}
                    </MenuItem>
                  ))}
            </Select>
        </FormGroup>
        </>);
};

export default LoadPreviousToggle;
