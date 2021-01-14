import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';

interface Props {
  text: string;
  iconName?: string;
  colorSchema?: PrimaryColor;
}

const NavigationButton: React.FC<Props> = ({ text, iconName, colorSchema }) => {
  return (
    <Button colorSchema={getValidColorSchema(colorSchema || colorSchema)} variant="outlined">
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        {<Icon name={iconName || 'add'} />}
        <Text>{text}</Text>
      </div>
    </Button>
  );
};

export default NavigationButton;
