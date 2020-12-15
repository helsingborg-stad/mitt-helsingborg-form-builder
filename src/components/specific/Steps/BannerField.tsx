import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';
import icons from '../../../preview/helpers/Icons';

const bannerFields: FieldDescriptor[] = [
  {
    name: 'imageSrc',
    type: 'text',
    initialValue: '',
    label: 'Image',
    helpText: `Currently available images (but only the ILLU_ ones are meant for use here): ${Object.keys(icons).join(
      ', ',
    )}`,
  },
];

const BannerField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={bannerFields} {...props} />;
};

export default BannerField;
