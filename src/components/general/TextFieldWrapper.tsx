import React, { useEffect, useState, useCallback } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useDebouncedCallback } from 'use-debounce';

const INPUT_DELAY = 600;

const TextFieldWrapper: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    if (props.value) {
      setInnerValue(props.value as string);
    } else {
      setInnerValue('');
    }
  }, [props.value]);

  const debouncedHandleOnChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
  }, INPUT_DELAY);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const newValue = event.currentTarget.value;
    setInnerValue(newValue);

    debouncedHandleOnChange.callback(event);
    // debouncedHandleOnChange(event);
  }, []);

  return <TextField {...props} value={innerValue} onChange={handleOnChange} />;
};

export default TextFieldWrapper;
