import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Label from '../Label/Label';
import theme from '../../styles/theme';

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

const FormField = ({ label, labelLine, inputType, color, id, conditionalOn, labelHelp, ...other }) => {
  const input = inputTypes[inputType];
  if (!input) {
    return <Text>{`${label}, input: ${inputType}`}</Text>;
  }

  const inputProps = input && input.props ? input.props : {};
  const inputCompProps = {
    color,
    value: initialValue,
    help: other.inputHelp && other.text ? { text: other.inputHelp, heading: other.text } : undefined,
    ...inputProps,
    error: validationErrors[id],
    ...other,
  };
  if (input?.props?.answers) inputCompProps.answers = answers;
  if (input?.props?.validation) inputCompProps.validationErrors = validationErrors;
  if (input && input.changeEvent) inputCompProps[input.changeEvent] = saveInput;

  /** Checks if the field is conditional on another input, and if so,
   * evaluates whether this field should be active or not */
  const checkCondition = (questionId) => {
    if (!questionId) return true;

    if (typeof questionId === 'string') {
      if (questionId[0] === '!') {
        const qId = questionId.slice(1);
        return !answers[qId];
      }
      return answers[questionId];
    }
    return true;
  };

  const inputComponent =
    input && input.component ? (
      React.createElement(input.component, inputCompProps)
    ) : (
      <Text>{`Invalid field type: ${inputType}`}</Text>
    );

  if (checkCondition(conditionalOn)) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View>
        {label ? (
          <Label color={color} underline={labelLine} help={labelHelp ? { heading: label, text: labelHelp } : {}}>
            {label}
          </Label>
        ) : null}
        {inputComponent}
      </View>
    );
  }
  return null;
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
   * What happens when the input is changed.
   * Should be used to store inputs to state.
   * Should handle objects on the form { id : value }, where value is the new value and id is the uuid for the input-field.
   */
  onChange: PropTypes.func,
  /**
   * sets the value, since the input field component should be managed.
   */
  value: PropTypes.any,
  /**
   * All the form state answers. Needed because of conditional checks.
   */
  answers: PropTypes.object,
  validationErrors: PropTypes.object,
  formNavigation: PropTypes.shape({
    next: PropTypes.func,
    back: PropTypes.func,
    up: PropTypes.func,
    down: PropTypes.func,
    close: PropTypes.func,
    start: PropTypes.func,
    isLastStep: PropTypes.func,
  }),
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
