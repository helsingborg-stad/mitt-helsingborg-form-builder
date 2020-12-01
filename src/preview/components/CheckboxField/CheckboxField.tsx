import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Text from '../Text/Text';
import {Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import theme, { getValidColorSchema } from '../../styles/theme';


interface Props {
    text?: string;
    color?: 'blue' | 'green' | 'purple' | 'red';
    size?: 'small' | 'medium' | 'large';
}
/** A component with a checkbox next to a descriptive text, and possibly a help button */
const CheckboxField: React.FC<Props> = ({ text, color, size }) => {

  return (
    <FormGroup row>
      <FormControlLabel control={<Checkbox />} label={<Text>{text}</Text>} />
    </FormGroup>
  );
};

CheckboxField.propTypes = {
  /**
   * The text to show at the side of the checkbox.
   */
  text: PropTypes.string,
  /**
   * sets the color theme.
   */
  color: PropTypes.oneOf(['blue','green','red','purple']),
  /**
   * One of small, medium, large
   */
  size: PropTypes.oneOf(['small','medium','large']),
};

CheckboxField.defaultProps = {
  color: 'blue',
  size: 'small',
};

export default CheckboxField;