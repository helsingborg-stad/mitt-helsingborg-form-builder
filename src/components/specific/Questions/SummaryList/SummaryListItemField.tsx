import React from 'react';
import FieldDescriptor, { InputType } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import QuestionTypeSelect from '../QuestionTypeSelect';
import { ValidationFieldTypes } from '../ValidationRules';
import { useFormikContext } from 'formik';
import { Form } from '../../../../types/FormTypes';
import { getPropertyFromDottedString } from '../../../../helpers/object';
import CategorySelect from './CategorySelect';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'id', type: 'questionIdPicker', initialValue: '', label: 'Field id' },
];

const typeChoices: {
  displayName: string;
  selectValue: string;
  inputType: InputType;
  validationType?: ValidationFieldTypes;
}[] = [
  { selectValue: 'text', displayName: 'Text', inputType: 'text', validationType: 'text' },
  { selectValue: 'number', displayName: 'Number', inputType: 'number', validationType: 'number' },
  { selectValue: 'date', displayName: 'Date', inputType: 'date' },
  // Array types for repeater fields
  { selectValue: 'arrayText', displayName: 'Repeater Text', inputType: 'arrayText', validationType: 'text' },
  { selectValue: 'arrayNumber', displayName: 'Repeater Number', inputType: 'arrayNumber', validationType: 'number' },
  { selectValue: 'arrayDate', displayName: 'Repeater Date', inputType: 'arrayDate' },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  arrayText: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
  ],
  arrayNumber: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
  ],
  arrayDate: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
  ],
};

const SummaryListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { values } = useFormikContext<Form>();
  const { value, name } = props;

  const categoryNameArray = name.split('.').slice(0, name.split('.').length - 2);
  categoryNameArray.push('categories');
  console.log(categoryNameArray.join('.'));
  const categories = getPropertyFromDottedString(values, categoryNameArray.join('.'));
  const categoryChoices = categories.map((cat: { category: string; description: string }) => ({
    displayName: cat.description,
    value: cat.category,
  }));

  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type];
  return (
    <>
      <MultipleInputField fields={fields} {...props} />
      <CategorySelect
        name={`${name}.category`}
        label="Category"
        choices={categoryChoices}
        value={value.category}
        setFieldValue={props.setFieldValue}
      />
      <QuestionTypeSelect
        name={props.name}
        value={props.value}
        label="Input field type"
        choices={typeChoices}
        setFieldValue={props.setFieldValue}
        showRequiredToggle={false}
      />
      {extraInput ? <MultipleInputField fields={extraInput} {...props} /> : null}
    </>
  );
};

export default SummaryListItemField;
