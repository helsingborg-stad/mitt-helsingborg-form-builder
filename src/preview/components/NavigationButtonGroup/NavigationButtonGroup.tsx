import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import { getValidColorSchema } from '../../styles/themeHelpers';

const ScrollView = styled.div<{ horizontal?: boolean }>`
  display: inline-flex;
  flex-direction: ${(props) => (props.horizontal ? 'row' : 'column')};
  overflow-x: scroll;
  ${(props) => props.horizontal && 'width: 100%;'}
`;

interface Props {
  buttons?: { text: string; iconName?: string; color?: string }[];
  horizontal?: boolean;
}

const NavigationButtonGroup: React.FC<Props> = ({ buttons, horizontal }) => (
  <ScrollView horizontal={horizontal}>
    {buttons &&
      Array.isArray(buttons) &&
      buttons.map((button, index) => (
        <Button key={`nav-button-${index}`} colorSchema={getValidColorSchema(button.color || '')} variant="outlined">
          <Text>{button.text}</Text>
        </Button>
      ))}
  </ScrollView>
);

export default NavigationButtonGroup;
