import React from 'react';
import Icon from '../Icon/Icon';

import { Flex, DeleteBackground, IconContainer, ImageIcon } from './FileItem.styled';

interface Props {
  filename: string;
}
const FileItem: React.FC<Props> = ({ filename }) => (
  <Flex>
    <DeleteBackground>
      <Icon name="clear" color="blue" />
    </DeleteBackground>
    <IconContainer>
      <ImageIcon src={filename} />
    </IconContainer>
  </Flex>
);

export default FileItem;
