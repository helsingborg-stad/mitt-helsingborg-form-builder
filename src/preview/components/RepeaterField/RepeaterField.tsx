import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import RepeaterFieldListItem from './RepeaterFieldListItem';
import Fieldset from '../Fieldset/Fieldset';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';

const AddButton = styled(Button)`
  margin-top: 30px;
  background: ${(props) => props.theme.colors.neutrals[7]};
  border: 0;
`;
const ButtonContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export interface InputRow {
  id: string;
  title: string;
  type: 'text' | 'date' | 'number';
  inputSelectValue: string;
}

interface Props {
  heading: string;
  addButtonText?: string;
  inputs: InputRow[];
  colorSchema: PrimaryColor;
}

/**
 * Repeater field component, for adding multiple copies of a particular kind of input.
 * The input-prop specifies the form of each input-group.
 */
const RepeaterField: React.FC<Props> = ({ heading, addButtonText, inputs, colorSchema }) => {
  // construct a new answer object from the inputs, where each answer is an empty string to start
  const newAnswers: Record<string, string | number> = {};
  inputs.forEach((input) => {
    newAnswers[input.id] = '';
  });
  const validColorSchema = getValidColorSchema(colorSchema);

  const listItems: JSX.Element[] = [];
  listItems.push(
    <RepeaterFieldListItem
      key={`${1}`}
      heading={`${heading} 1`}
      inputs={inputs}
      value={newAnswers}
      color={validColorSchema}
    />,
  );
  return (
    <Fieldset legend={heading} colorSchema={validColorSchema} empty={listItems.length === 0}>
      {listItems}
      <AddButton colorSchema={'green'} block variant="outlined">
        <ButtonContainer>
          <Icon name="add" color="green" />
          <Text>{addButtonText || 'Lägg till'}</Text>
        </ButtonContainer>
      </AddButton>
    </Fieldset>
  );
};

export default RepeaterField;
