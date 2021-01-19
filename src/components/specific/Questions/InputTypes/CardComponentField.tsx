import React from 'react';
import FieldDescriptor, { InputType } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import icons from '../../../../preview/helpers/Icons';

const fields: FieldDescriptor[] = [
  {
    name: 'type',
    type: 'select',
    initialValue: '',
    label: 'Component type',
    choices: [
      { value: 'title', name: 'Title' },
      { value: 'subtitle', name: 'Subtitle' },
      { value: 'text', name: 'Text' },
      { value: 'image', name: 'Image' },
      { value: 'button', name: 'Button' },
    ],
  },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  title: [{ name: 'text', type: 'text', initialValue: '', label: 'Title' }],
  subtitle: [{ name: 'text', type: 'text', initialValue: '', label: 'Subtitle' }],
  text: [
    { name: 'text', type: 'text', initialValue: '', label: 'Text' },
    { name: 'italic', type: 'checkbox', initialValue: '', label: 'Italic' },
  ],
  image: [
    {
      name: 'image',
      type: 'text',
      initialValue: '',
      label: 'Image filename',
      helpText: `Currently available images: ${Object.keys(icons).join(', ')}`,
    },
    { name: 'circle', type: 'checkbox', initialValue: '', label: 'Round (otherwise square)' },
  ],
  button: [
    { name: 'text', type: 'text', initialValue: '', label: 'Button text' },
    {
      name: 'icon',
      type: 'text',
      initialValue: '',
      label: 'Icon name (from Material Icons), optional',
      helpText:
        'some common icon names that we use are: help-outline, arrow-forward, phone, email. See https://material-ui.com/components/material-icons/ for a full list, but remember to convert the name to lowercase with a dash (-) as separator between words',
    },
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
        { value: 'infoModal', name: 'Info text modal' },
      ],
    },
  ],
};

const buttonInputs: Record<string, FieldDescriptor[]> = {
  email: [{ name: 'email', type: 'text', initialValue: '', label: 'Email address' }],
  phone: [{ name: 'phonenumber', type: 'text', initialValue: '', label: 'Phone number' }],
  url: [{ name: 'url', type: 'text', initialValue: '', label: 'Url to link to' }],
  navigate: [{ name: 'screen', type: 'text', initialValue: '', label: 'Screen to navigate to' }],
  infoModal: [
    { name: 'heading', type: 'text', initialValue: '', label: 'Heading' },
    {
      name: 'markdownText',
      type: 'text',
      initialValue: '',
      label: 'Content (in markdown format)',
      helpText: `Formatting guide:
      To make bold text, surround the text with **, like **this**.
      To make a bullet list, start each line with a +. 
      To insert a clickable link, place the text in [], and follow by the link in (), like this: [Google](https://google.com).

      
      Tip: it's easier to write the text somewhere else, and then paste it in here.`,
    },
    { name: 'closeButtonText', type: 'text', initialValue: '', label: 'Close Modal button text' },
  ],
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
