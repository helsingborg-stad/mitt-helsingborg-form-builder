import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const bannerFields: FieldDescriptor[] = [
  { name: 'imageSrc', type: 'text', initialValue: '', label: 'Image', optionLevel: OptionLevel.Intermediate },
  { name: 'iconSrc', type: 'text', initialValue: '', label: 'Icon', optionLevel: OptionLevel.Intermediate },
  {
    name: 'backgroundColor',
    type: 'colorPicker',
    initialValue: '#FFFFFF',
    label: 'Background Color',
    optionLevel: OptionLevel.Intermediate,
  },
];

const BannerField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={bannerFields} {...props} />;
};

export default BannerField;
