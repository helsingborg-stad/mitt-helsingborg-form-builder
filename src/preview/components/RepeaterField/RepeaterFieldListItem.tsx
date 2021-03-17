/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';
import Button from '../Button/Button';
import Label from '../Label/Label';
import { InputRow } from './RepeaterField';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';
import { TextField } from '@material-ui/core';

const Base = styled.div`
  padding: 0px;
  margin-bottom: 5px;
  flex-direction: column;
  border-radius: 6px;
`;

const RepeaterItem = styled.div<{ colorSchema: string }>`
  font-size: ${(props) => props.theme.fontSizes[4]}px;
  flex-direction: row;
  display: inline-flex;
  height: auto;
  width: 95%;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 4.5px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.repeater[props.colorSchema].inputBackground};
  padding: 10px;
`;

const ItemLabel = styled(Label)<{ colorSchema: string }>`
  margin-top: 20px;
  margin-left: 10px;
  font-size: 12px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  color: ${(props) => props.theme.repeater[props.colorSchema].inputText};
`;

const InputLabelWrapper = styled.div`
  flex: 4;
  justify-content: center;
`;

const InputLabel = styled(Text)<{ colorSchema: string }>`
  padding: 4px;
  font-weight: ${(props) => props.theme.fontWeights[1]};
  color: ${(props) => props.theme.repeater[props.colorSchema].inputText};
`;

const InputWrapper = styled.div<{ colorSchema: string }>`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 5;
`;
const ItemInput = styled(TextField)`
  width: 100%;
  font-weight: 500;
  color: ${(props) => props.theme.colors.neutrals[1]};
`;
const ButtonContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;
const DeleteButton = styled(Button)<{ colorSchema: PrimaryColor }>`
  margin-top: 10px;
  margin-bottom: 10px;
  background: ${(props) => props.theme.repeater[props.colorSchema].deleteButton};
`;

const DeleteButtonText = styled(Text)<{ colorSchema: PrimaryColor }>`
  color: ${(props) => props.theme.repeater[props.colorSchema].deleteButtonText};
  text-transform: uppercase;
  font-weight: 900;
  font-size: 12px;
  line-height: 18px;
`;

interface InputComponentProps {
  input: InputRow;
  colorSchema: PrimaryColor;
  value: string | number | boolean;
}

const InputComponent = ({ input }: InputComponentProps) => {
  switch (input.type) {
    case 'text':
    case 'number':
    case 'date':
      return <ItemInput InputProps={{ disableUnderline: true, style: { textAlign: 'right' } }} />;
    default:
      return <ItemInput InputProps={{ disableUnderline: true, style: { textAlign: 'right' } }} />;
  }
};

interface Props {
  heading?: string;
  listIndex?: number;
  inputs: InputRow[];
  value: Record<string, string | number>;
  color: string;
}

const RepeaterFieldListItem: React.FC<Props> = ({ heading, inputs, value, color }) => {
  const validColorSchema = getValidColorSchema(color);

  return (
    <Base>
      <ItemLabel colorSchema={validColorSchema} underline={false}>
        {heading || 'Item'}
      </ItemLabel>
      {inputs.map((input, index) => (
        <RepeaterItem
          colorSchema={validColorSchema}
          key={`${input.title}.${index}`}
          style={index === inputs.length - 1 ? { marginBottom: 0 } : { marginBottom: 4 }}
        >
          <InputLabelWrapper>
            <InputLabel colorSchema={validColorSchema}>{`${input.title}`}</InputLabel>
          </InputLabelWrapper>
          <InputWrapper colorSchema={validColorSchema}>
            <InputComponent input={input} colorSchema={validColorSchema} value={value[input.id] || ''} />
          </InputWrapper>
        </RepeaterItem>
      ))}
      <DeleteButton z={0} colorSchema={validColorSchema} block>
        <ButtonContainer>
          <DeleteButtonText colorSchema={validColorSchema}>Ta bort</DeleteButtonText>
        </ButtonContainer>
      </DeleteButton>
    </Base>
  );
};

RepeaterFieldListItem.defaultProps = {
  inputs: [],
};

export default RepeaterFieldListItem;
