/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';
import { Checkbox, TextField } from '@material-ui/core';
import { Clear as Delete } from '@material-ui/icons';
import { SummaryListItem as SummaryListItemType } from './SummaryList';
import { colorPalette } from '../../styles/palette';

interface ItemWrapperProps {
  colorSchema: string;
  editable: boolean;
}

const TextInputRight = () => (
  <TextField InputProps={{ disableUnderline: true, style: { textAlign: 'right' } }} multiline={true} />
);

const Row = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  width: 102%;
`;

const ItemWrapper = styled.div<ItemWrapperProps>`
  font-size: ${(props) => props.theme.fontSizes[4]}px;
  flex-direction: row;
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  height: auto;
  background-color: transparent;
  border-radius: 4.5px;
  margin-bottom: 10px;
  ${(props) =>
    props.editable
      ? `
      background-color: ${props.theme.colors.complementary[props.colorSchema][2]};
      padding: 10px;
      `
      : 'color: blue;'};
`;
const InputWrapper = styled.div`
  flex-direction: column;
`;

const SmallInput = styled(TextInputRight)<{ editable: boolean }>`
  width: 100%;
  font-weight: 500;
`;

const LabelWrapper = styled.div`
  flex: 4;
  justify-content: center;
`;
const SmallText = styled(Text)`
  padding: 4px;
  font-weight: ${(props) => props.theme.fontWeights[1]};
  color: ${(props) => props.theme.colors.neutrals[2]};
`;
const DeleteButton = styled(Delete)`
  margin-right: 0px;
  margin-bottom: 12px;
  margin-top: 0px;
  color: ${(props) => props.theme.colors.neutrals[4]};
`;

interface Props {
  item: SummaryListItemType;
  index?: number;
  editable?: boolean;
  color: string;
}
/** The rows for the summary list. */
const SummaryListItem: React.FC<Props> = ({ item, index, editable, color }) => {
  const inputComponent = (input: SummaryListItemType, editable: boolean) => {
    switch (input.type) {
      case 'text':
      case 'arrayText':
        return <SmallInput editable={editable} />;
      case 'number':
      case 'arrayNumber':
        return <SmallInput editable={editable} />;
      case 'date':
      case 'arrayDate':
        return <SmallInput editable={editable} />;
      case 'checkbox':
        return <Checkbox />;
      default:
        return <SmallInput editable={editable} />;
    }
  };
  // TODO: we probably want to change how the color prop is handled in the future.
  const colorSchema = Object.keys(colorPalette.primary).includes(color) ? color : 'blue';
  return (
    <Row>
      <ItemWrapper key={`${item.title}`} colorSchema={colorSchema} editable={editable || false}>
        <LabelWrapper>
          <SmallText>
            {`${item.title}`}
            {index ? ` ${index}` : null}
          </SmallText>
        </LabelWrapper>
        <InputWrapper>{inputComponent(item, editable || false)}</InputWrapper>
      </ItemWrapper>
      {editable && <DeleteButton />}
    </Row>
  );
};

SummaryListItem.defaultProps = {
  color: 'blue',
};
export default SummaryListItem;
