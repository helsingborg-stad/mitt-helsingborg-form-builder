import React, { useEffect, useState } from 'react';
import FieldDescriptor, { InputType } from '../../../../../types/FieldDescriptor';
import MultipleInputField from '../../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../../types/PropTypes';
import QuestionTypeSelect from '../../QuestionTypeSelect';
import { ValidationFieldTypes } from '../../ValidationRules';
import { useFormikContext } from 'formik';
import { Form } from '../../../../../types/FormTypes';
import { getPropertyFromDottedString } from '../../../../../helpers/object';
import CategorySelect from './CategorySelect';

const fieldStyle: FieldDescriptor = {
  name: 'fieldStyle',
  type: 'select',
  initialValue: '',
  label: 'Field style',
  choices: [
    { name: 'Default', value: 'Default' },
    { name: 'Grey', value: 'Grey' },
    { name: 'Bold', value: 'Bold' },
  ],
};

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  {
    name: 'id',
    type: 'questionIdPicker',
    initialValue: '',
    label: 'Field id',
    helpText:
      'The field to show the value of. Can be a basic input field, or a editable list/repeater, in which case you also need to put in the input key.',
  },
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
  { selectValue: 'checkbox', displayName: 'Checkbox', inputType: 'checkbox' },
  // Array types for repeater fields
  { selectValue: 'arrayText', displayName: 'Repeater Text', inputType: 'arrayText', validationType: 'text' },
  { selectValue: 'arrayNumber', displayName: 'Repeater Number', inputType: 'arrayNumber', validationType: 'number' },
  { selectValue: 'arrayDate', displayName: 'Repeater Date', inputType: 'arrayDate' },
  // Types for editable list fields
  {
    selectValue: 'editableListText',
    displayName: 'Editable List Text',
    inputType: 'editableListText',
    validationType: 'text',
  },
  {
    selectValue: 'editableListNumber',
    displayName: 'Editable List Number',
    inputType: 'editableListNumber',
    validationType: 'number',
  },
  { selectValue: 'editableListDate', displayName: 'Editable List Date', inputType: 'editableListDate' },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  arrayText: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
    fieldStyle,
  ],
  arrayNumber: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
    fieldStyle,
  ],
  arrayDate: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: 'Default',
      label: 'Input id (should match the id of repeater input field id)',
    },
    fieldStyle,
  ],
  editableListText: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input key (should match the key of the input in the editable list)',
    },
  ],
  editableListNumber: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input key (should match the key of the input in the editable list)',
    },
  ],
  editableListDate: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input key (should match the key of the input in the editable list)',
    },
  ],
};

const SummaryListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { values } = useFormikContext<Form>();
  const { value, name } = props;
  const [categoryChoices, setCategoryChoices] = useState<{ value: string; displayName: string }[]>([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const categoryNameArray = name.split('.').slice(0, name.split('.').length - 2);
    categoryNameArray.push('categories');
    setCategoryName(categoryNameArray.join('.'));
  }, [name]);

  useEffect(() => {
    const categories = getPropertyFromDottedString(values, categoryName);
    if (categories && categories.length > 0) {
      const categoryChoices = categories.map((cat: { category: string; description: string }) => ({
        displayName: cat.description,
        value: cat.category,
      }));
      setCategoryChoices(categoryChoices);
    }
  }, [name, categoryName]);

  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type];
  return (
    <>
      <MultipleInputField fields={fields} {...props} />
      <CategorySelect name={`${name}.category`} label="Category" choices={categoryChoices} value={value.category} />
      {categoryChoices.length > 0 && (
        <QuestionTypeSelect
          name={props.name}
          value={props.value}
          label="Input field type"
          choices={typeChoices}
          showRequiredToggle={false}
        />
      )}
      {extraInput ? <MultipleInputField fields={extraInput} {...props} /> : null}
    </>
  );
};

export default SummaryListItemField;
