import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

interface Props {
  text?: string;
  color?: 'blue' | 'green' | 'purple' | 'red';
  size?: 'small' | 'medium' | 'large';
}

interface CheckboxListChoice {
  displayText: string;
  tags?: string[];
}

interface CheckboxListProps {
  choices: CheckboxListChoice[];
}

type ComponentProps = Props & CheckboxListProps;

/** A component with a checkbox next to a descriptive text, and possibly a help button */
const CheckboxList: React.FC<ComponentProps> = (props) => {
  return (
    <FormGroup row>
      {props.choices.map((choice) => (
        <>
          <FormControlLabel control={<Checkbox />} label={<Text>{choice.displayText}</Text>} />
        </>
      ))}
    </FormGroup>
  );
};

CheckboxList.propTypes = {
  /**
   * The text to show at the side of the checkbox.
   */
  text: PropTypes.string,
  /**
   * sets the color theme.
   */
  color: PropTypes.oneOf(['blue', 'green', 'red', 'purple']),
  /**
   * One of small, medium, large
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

CheckboxList.defaultProps = {
  color: 'blue',
  size: 'small',
};

export default CheckboxList;
