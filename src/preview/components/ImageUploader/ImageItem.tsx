/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const DefaultItem = styled.div`
  background-color: white;
  margin-bottom: 20px;
`;
const Flex = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`;
const Row = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;
const IconContainer = styled.div`
  border-top-left-radius: 12.5px;
  border-bottom-left-radius: 12.5px;
  padding: 0px;
  margin-left: 8px;
  margin-right: 8px;
  elevation: 2;
  shadow-offset: 0px 2px;
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
`;
const ImageIcon = styled.img`
  width: 126px;
  height: 178px;
`;

interface Props {
  filename: string;
}

const ImageItem: React.FC<Props> = ({ filename }) => (
  <DefaultItem>
    <Flex>
      <IconContainer>
        <ImageIcon src={filename} />
      </IconContainer>
      <Row>
        <Icon name="delete" color="blue" />
      </Row>
    </Flex>
  </DefaultItem>
);

export default ImageItem;
