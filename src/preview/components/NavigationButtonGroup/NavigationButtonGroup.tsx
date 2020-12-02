import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';

const ScrollView = styled.div<{ horizontal?: boolean }>`
  display: inline-flex;
  flex-direction: ${(props) => (props.horizontal ? 'row' : 'column')};
  overflow-x: scroll;
  ${(props) => props.horizontal && 'width: 100%;'}
`;

interface Props {
  buttons: { text: string; iconName?: string; color?: string }[];
  horizontal?: boolean;
}

const NavigationButtonGroup: React.FC<Props> = ({ buttons, horizontal }) => (
  <ScrollView horizontal={horizontal}>
    {buttons.map((button, index) => (
      <Button key={`nav-button-${index}`} colorSchema={button.color || 'blue'} variant="outlined">
        <Text>{button.text}</Text>
      </Button>
    ))}
  </ScrollView>
);

export default NavigationButtonGroup;
