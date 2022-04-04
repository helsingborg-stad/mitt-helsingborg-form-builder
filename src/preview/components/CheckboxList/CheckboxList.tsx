import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

interface CheckboxListChoice {
  displayText: string;
  tags?: string[];
  id?: string;
}

interface CheckboxListProps {
  choices?: CheckboxListChoice[];
}

/** A component with a checkbox next to a descriptive text, and possibly a help button */
const CheckboxList: React.FC<CheckboxListProps> = ({ choices }) => {
  return (
    <FormGroup row>
      {choices?.map((choice) => (
        <>
          <FormControlLabel control={<Checkbox />} label={<Text>{choice.displayText}</Text>} />
        </>
      ))}
    </FormGroup>
  );
};

export default CheckboxList;
