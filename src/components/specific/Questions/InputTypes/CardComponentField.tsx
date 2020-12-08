import React from 'react';
import FieldDescriptor, { InputType } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

const typeChoices: {
  name: string;
  value: string;
}[] = [
  { value: 'title', name: 'Title' },
  { value: 'subtitle', name: 'Subtitle' },
  { value: 'text', name: 'Text' },
  { value: 'image', name: 'Image' },
  { value: 'button', name: 'Button' },
];
const fields: FieldDescriptor[] = [
  { name: 'type', type: 'select', initialValue: '', label: 'Component type', choices: typeChoices },
];
// const extraInputs: Partial<Record<InputType, FieldDescriptor[]>> = {
//   select: [{ name: 'items', type: 'array', initialValue: '', label: 'Choices', inputField: SelectChoice }],
// };
const extraInputs: Record<string, FieldDescriptor[]> = {
  title: [{ name: 'text', type: 'text', initialValue: '', label: 'Title' }],
  subtitle: [{ name: 'text', type: 'text', initialValue: '', label: 'Subtitle' }],
  text: [
    { name: 'text', type: 'text', initialValue: '', label: 'Text' },
    { name: 'italic', type: 'checkbox', initialValue: '', label: 'Italic' },
  ],
  image: [
    { name: 'image', type: 'text', initialValue: '', label: 'Image filename' },
    { name: 'circle', type: 'checkbox', initialValue: '', label: 'Round (otherwise square)' },
  ],
  button: [
    { name: 'text', type: 'text', initialValue: '', label: 'Button text' },
    { name: 'icon', type: 'text', initialValue: '', label: 'Icon name (from Material Icons), optional' },
    {
      name: 'iconPosition',
      type: 'select',
      initialValue: '',
      label: 'Icon position',
      choices: [
        { value: 'left', name: 'Left' },
        { value: 'right', name: 'Right' },
      ],
    },
    {
      name: 'action',
      type: 'select',
      initialValue: '',
      label: 'Button action',
      choices: [
        { value: 'email', name: 'Email' },
        { value: 'phone', name: 'Phone' },
        { value: 'url', name: 'Link to website (url)' },
        { value: 'navigate', name: 'In app navigation' },
      ],
    },
  ],
};

const buttonInputs: Record<string, FieldDescriptor[]> = {
  email: [{ name: 'email', type: 'text', initialValue: '', label: 'Email address' }],
  phone: [{ name: 'phonenumber', type: 'text', initialValue: '', label: 'Phone number' }],
  url: [{ name: 'url', type: 'text', initialValue: '', label: 'Url to link to' }],
  navigate: [{ name: 'screen', type: 'text', initialValue: '', label: 'Screen to navigate to' }],
};

const CardComponentField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value } = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type as InputType];
  const buttonExtra = value.type === 'button' ? buttonInputs[value.action] : undefined;
  return (
    <>
      <MultipleInputField fields={fields} {...props} />
      {extraInput && <MultipleInputField fields={extraInput} {...props} />}
      {buttonExtra && <MultipleInputField fields={buttonExtra} {...props} />}
    </>
  );
};

export default CardComponentField;
