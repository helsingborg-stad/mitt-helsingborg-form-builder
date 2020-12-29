import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';

const ScrollView = styled.div<{ horizontal?: boolean }>`
  display: inline-flex;
  flex-direction: ${(props) => (props.horizontal ? 'row' : 'column')};
  overflow-x: scroll;
  ${(props) => props.horizontal && 'width: 100%;'}
`;

interface Props {
  buttons?: { text: string; iconName?: string; colorSchema?: PrimaryColor }[];
  horizontal?: boolean;
  colorSchema: PrimaryColor;
}

const NavigationButtonGroup: React.FC<Props> = ({ buttons, horizontal, colorSchema }) => (
  <ScrollView horizontal={horizontal}>
    {buttons &&
      Array.isArray(buttons) &&
      buttons.map((button, index) => (
        <Button
          key={`nav-button-${index}`}
          colorSchema={getValidColorSchema(button.colorSchema || colorSchema)}
          variant="outlined"
        >
          <Text>{button.text}</Text>
        </Button>
      ))}
  </ScrollView>
);

export default NavigationButtonGroup;
