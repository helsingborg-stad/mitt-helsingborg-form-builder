import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Label from '../Label/Label';
import theme from '../../styles/theme';
// import {TextField as Input} from '@material-ui/core';
import Input from '../Input/Input';

const inputTypes = {
  text: {
    component: Input,
    changeEvent: 'onChangeText',
  },
  number: {
    component: Input,
    changeEvent: 'onChangeText',
    props: {
      keyboardType: 'numeric',
    },
  },
};

const FormField = ({ label, labelLine, inputType, color, id, ...other }) => {
  const input = inputTypes[inputType];
  if (!input) {
    return <Label>{`${label}, ${inputType}`}</Label>;
  }

  const inputProps = input && input.props ? input.props : {};
  const inputCompProps = {
    color,
    value: "",
    help: other.inputHelp && other.text ? { text: other.inputHelp, heading: other.text } : undefined,
    ...inputProps,
    ...other,
  };

  const inputComponent =
    input && input.component ? (
      React.createElement(input.component, inputCompProps)
    ) : (
      <Text>{`Invalid field type: ${inputType}`}</Text>
    );

    return (
      <div>
        {label ? (
          <Label color={color} underline={labelLine} >
            {label}
          </Label>
        ) : null}
        {inputComponent}
      </div>
    );
};

FormField.propTypes = {
  /**
   * The label for the input field.
   */
  label: PropTypes.string,
  /**
   * String that determines the input type of the field.
   */
  labelLine: PropTypes.bool,
  /**
   * Unique id for the input field. Used
   */
  id: PropTypes.string,
  /**
   * String that determines the input type of the field.
   */
  inputType: PropTypes.oneOf(Object.keys(inputTypes)),
  /**
   * sets the color theme.
   */
  color: PropTypes.oneOf(Object.keys(theme.formField)),
  /*
   * The function triggers when the button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The id of another input field: if supplied, the formField input will only be active (i.e. visible, for now)
   * if the answer to the other input value evaluates as 'truthy'.
   * One can also add an ! in front of the id to enable the field if the other input evaluates as 'falsy', i.e. !id.
   */
  conditionalOn: PropTypes.string,
  /**
   * Property to show a help button
   */
  labelHelp: PropTypes.string,
};

FormField.defaultProps = {
  onClick: () => {},
  onChange: () => {},
  color: 'light',
  labelLine: true,
  inputType: 'text',
};

export default FormField;
