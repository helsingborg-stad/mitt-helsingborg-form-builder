import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const Flex = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
`;
const DeleteBackground = styled.div`
  position: absolute;
  top: -5px;
  right: -2px;
  padding: 4px;
  height: 17px;
  width: 17px;
  elevation: 4;
  background: #eeeeee;
  z-index: 1;
  border-radius: 50%;
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
  <Flex>
    <DeleteBackground>
      <Icon name="clear" color="blue" />
    </DeleteBackground>
    <IconContainer>
      <ImageIcon src={filename} />
    </IconContainer>
  </Flex>
);

export default ImageItem;
