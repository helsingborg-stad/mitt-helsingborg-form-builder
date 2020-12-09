// import { Button, Typography } from '@material-ui/core';
import Button from '../Button/Button';
import Text from '../Text/Text';
import React from 'react';
import styled from 'styled-components';
import { Action } from '../../../types/FormTypes';

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.colors.neutrals[5]};
  width: 100%;
`;
const Flex = styled.div`
  padding: 5px;
  padding-right: 10px;
`;
const ButtonWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 49px;
  margin-right: 32px;
`;

interface Props {
  actions: Action[];
}

const Footer: React.FC<Props> = ({ actions }) => {
  const buttons = actions.map((action, index) => (
    <Flex key={`${index}-${action.label}`}>
      <Button colorSchema={action.color || 'blue'}>
        <Text>{action.label}</Text>
      </Button>
    </Flex>
  ));
  return (
    <ActionContainer>
      <ButtonWrapper>{buttons}</ButtonWrapper>
    </ActionContainer>
  );
};

export default Footer;
