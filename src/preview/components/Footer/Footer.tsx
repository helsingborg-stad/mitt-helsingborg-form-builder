import { Button, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Action } from '../../../types/FormTypes';

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #00213f;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`;
const Flex = styled.div`
  padding: 5px;
  padding-right: 10px;
`;
const ButtonWrapper = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`;

interface Props {
  actions: Action[];
}

const Footer: React.FC<Props> = ({ actions }) => {
  const buttons = actions.map((action, index) => (
    <Flex key={`${index}-${action.label}`}>
      <Button style={{ backgroundColor: action.color || 'green' }}>
        <Typography>{action.label}</Typography>
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
