import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text/Text';
import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import Select from '../Select/Select';
import {TextField, Button as ButtonMUI} from '@material-ui/core';

const EditableListBody = styled.div`
  padding-top: 33px;
  height: auto;
  width: 100%;
`;

const EditableListItem = styled.div<{colorSchema: string; editable?: boolean}>`
  font-size: ${props => props.theme.fontSizes[4]}px;
  flex-direction: row;
  display: inline-flex;
  height: auto;
  width: 95%;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 4.5px;
  margin-bottom: 10px;
  ${props =>
    props.editable
      ? `
      background-color: ${props.theme.colors.complementary[props.colorSchema][2]};
      padding: 10px;
      `
      : 'color: blue;'};
`;

const EditableListItemLabelWrapper = styled.div<{alignAtStart: boolean}>`
  flex: 4;
  justify-content: ${props => (props.alignAtStart ? 'flex-start' : 'center')};
`;

const EditableListItemLabel = styled(Text)`
  padding: 4px;
  font-weight: ${props => props.theme.fontWeights[1]};
  color: ${props => props.theme.colors.neutrals[1]};
`;

const EditableListItemInputWrapper = styled.div`
  flex-direction: column;
`;

const EditableListItemInput = styled(TextField)`
  width: 100%;
  font-weight: 500;
  color: ${props => props.theme.colors.neutrals[1]};
`;

const FieldsetButton = styled(Button)`
  margin-left: 26px;
`;

interface Props {
    colorSchema?: string;
    title?: string;
    inputs?: {type: string; label: string; key: string; items?: {value: string; label:string}[]}[];
    inputIsEditable?: boolean;
    startEditable?: boolean;
}
/**
 * EditableList
 * A Molecule Component to use for rendering a list with the possibility of editing the list values.
 */
const EditableList: React.FC<Props> = ({
  colorSchema,
  title,
  inputs,
  inputIsEditable,
  startEditable,
}) => {
  const [editable, setEditable] = useState(startEditable);

  const changeEditable = () => {
    setEditable(!editable);
  };

  /** Switch between different input types */
  const getInputComponent = (input: {type: string; label: string; key: string; items?: {value: string; label: string}[]}) => {
    switch (input.type) {
      case 'number':
        return (
          <EditableListItemInput InputProps={{disableUnderline: true, style: {textAlign: 'right',}}} />
        );
      case 'date':
        return (
          <EditableListItemInput InputProps={{disableUnderline: true, style: {textAlign: 'right',}}} />
        );
      case 'select':
        return (
          <Select items={input.items ? input.items: []} />
        );
      default:
        return (
          <EditableListItemInput InputProps={{disableUnderline: true, style: {textAlign: 'center'}}} />
        );
    }
  };

  return (
    <Fieldset
      colorSchema={colorSchema}
      legend={title || ''}
      iconName="help-outline"
      renderHeaderActions={() =>
        inputIsEditable && (
            <>
          <FieldsetButton colorSchema={colorSchema} z={0} size="small" onClick={changeEditable}>
            <Text>{editable ? 'Färdig' : 'Ändra'}</Text>
          </FieldsetButton>
          {/* <ButtonMUI onClick={changeEditable} variant="contained" color="secondary" >
              {editable ? 'Färdig' : 'Ändra'}
            </ButtonMUI> */}
          </>
        )
      }
    >
      <EditableListBody>
        {inputs && inputs.map(input => (
          <EditableListItem
            colorSchema={colorSchema || 'blue'}
            editable={editable}
            key={input.key}
          >
            <EditableListItemLabelWrapper alignAtStart={input.type === 'select'}>
              <EditableListItemLabel>{input.label}</EditableListItemLabel>
            </EditableListItemLabelWrapper>
            <EditableListItemInputWrapper>{getInputComponent(input)}</EditableListItemInputWrapper>
          </EditableListItem>
        ))}
      </EditableListBody>
    </Fieldset>
  );
}

EditableList.defaultProps = {
  inputIsEditable: true,
  startEditable: false,
  inputs: [],
  colorSchema: 'blue',
};

export default EditableList;
