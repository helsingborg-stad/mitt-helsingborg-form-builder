import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Label from '../Label/Label';
import theme from '../../styles/theme';
import CheckboxField from '../CheckboxField/CheckboxField';
import Select from '../Select/Select';
import Input from '../Input/Input';
import EditableList from '../EditableList/EditableList';
import SummaryList from '../SummaryList/SummaryList';
import NavigationButtonGroup from '../NavigationButtonGroup/NavigationButtonGroup';
import NavigationButton from '../NavigationButtonGroup/NavigationButton';
import DynamicCardRenderer from '../Card/DynamicCardRenderer';
import RadioGroup from '../RadioButton/RadioButton';
import ImageUploader from '../ImageUploader/ImageUploader';
import ImageViewer from '../ImageViewer/ImageViewer';
import RepeaterField from '../RepeaterField/RepeaterField';
import PdfUploader from '../PdfUploader/PdfUploader';
import PdfViewer from '../PdfViewer/ImageViewer';

const inputTypes = {
  text: {
    component: Input,
    props: { InputProps: { disableUnderline: true } },
  },
  hidden: {
    component: Input,
    props: { InputProps: { disableUnderline: true } },
  },
  number: {
    component: Input,
    props: { InputProps: { disableUnderline: true } },
  },
  date: {
    component: Input,
    props: { InputProps: { disableUnderline: true } },
  },
  checkbox: {
    component: CheckboxField,
  },
  select: {
    component: Select,
  },
  editableList: {
    component: EditableList,
  },
  summaryList: {
    component: SummaryList,
  },
  navigationButtonGroup: {
    component: NavigationButtonGroup,
  },
  navigationButton: {
    component: NavigationButton,
  },
  card: {
    component: DynamicCardRenderer,
  },
  radioGroup: {
    component: RadioGroup,
  },
  imageUploader: {
    component: ImageUploader,
  },
  imageViewer: {
    component: ImageViewer,
  },
  repeaterField: {
    component: RepeaterField,
  },
  pdfUploader: {
    component: PdfUploader,
  },
  pdfViewer: {
    component: PdfViewer,
  },
  timeslot: {
    component: () => <p style={{ color: 'black' }}>KARLOS</p>,
  },
};

const FormField = ({ label, labelLine, inputType, id, colorSchema, ...other }) => {
  console.log('INPUT TYPE: ', inputType);
  const input = inputTypes[inputType];
  if (!input) {
    return (
      <>
        <Label>{`${label}`}</Label>
        <Text>{`${inputType}, no preview implemented...`}</Text>
      </>
    );
  }

  const inputProps = input && input.props ? input.props : {};
  console.log('INPUT PROPS: ', inputProps);
  const inputCompProps = {
    colorSchema,
    value: '',
    help: other.inputHelp && other.text ? { text: other.inputHelp, heading: other.text } : undefined,
    ...inputProps,
    ...other,
  };
  console.log('INPUT COMPO PROPS: ', inputCompProps);

  const inputComponent =
    input && input.component ? (
      React.createElement(input.component, inputCompProps)
    ) : (
      <Text>{`Invalid field type: ${inputType}`}</Text>
    );

  return (
    <div>
      {label ? (
        <Label colorSchema={colorSchema} underline={labelLine}>
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
  colorSchema: PropTypes.oneOf(Object.keys(theme.formField)),
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
  colorSchema: 'blue',
  labelLine: true,
  inputType: 'text',
};

export default FormField;
