import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextField } from '@material-ui/core'

const Input = styled(TextField)`
  width: 100%;
  font-weight: ${({ theme }) => theme.fontWeights[1]}
  background-color: ${({ theme, colorSchema }) => theme.colors.complementary[colorSchema][2]};
  border-radius: 4.5px;
  border: solid 1px
  ${({ theme, colorSchema }) =>
      theme.colors.complementary[colorSchema][2]}
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin: 3px;
  color: ${({ theme }) => theme.colors.neutrals[0]};
  ${props => (props.center ? 'text-align: center;' : null)}
`;

Input.propTypes = {
  /**
   * Sets the color schema for the component, default is blue.
   */
  colorSchema: PropTypes.oneOf(['blue', 'red', 'purple', 'green']),
};

Input.defaultProps = {
  colorSchema: 'blue',
};

export default Input;
