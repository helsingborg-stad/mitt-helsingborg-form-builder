import React from 'react';
import { Icon as MIcon } from '@material-ui/core';
import styled from 'styled-components';
import { PrimaryColor } from '../../styles/themeHelpers';

const toSnakeCase = (str: string) => {
  if (!str) return null;
  const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
  if (!match) return null;
  return match.map((x) => x.toLowerCase()).join('_');
};

interface Props {
  color?: PrimaryColor;
  size?: 16 | 24 | 32 | 48;
  name: string;
}

const IconInner = styled(MIcon)<{ colorSchema: PrimaryColor; size: number }>`
  color: ${(props) => props.theme.colors.primary[props.colorSchema][0]};
  font-size: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  text-align: center;
`;

const Icon: React.FC<Props> = ({ name, size, color }) => (
  <IconInner colorSchema={color || 'blue'} size={size || 16}>
    {toSnakeCase(name || 'help')}
  </IconInner>
);

export default Icon;
