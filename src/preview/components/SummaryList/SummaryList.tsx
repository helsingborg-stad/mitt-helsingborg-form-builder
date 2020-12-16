import React from 'react';
import styled from 'styled-components';
import GroupedList from '../GroupedList/GroupedList';
import Text from '../Text/Text';
import Heading from '../Heading/Heading';
import SummaryListItemComponent from './SummaryListItem';
import { PrimaryColor, getValidColorSchema } from '../../styles/themeHelpers';

const SumLabel = styled(Heading)<{ colorSchema: string }>`
  margin-top: 5px;
  margin-left: 3px;
  font-weight: ${(props) => props.theme.fontWeights[1]};
  font-size: ${(props) => props.theme.fontSizes[3]};
  color: ${(props) => props.theme.colors.primary[props.colorSchema][1]};
`;
const SumText = styled(Text)`
  margin-left: 4px;
  margin-top: 10px;
`;
// TODO: the sum component should be sent as a footer to the grouped list, at which point this container should be removed.
// Currently it's using a negative margin, which is a hack and only meant as a temporary fix.
const SumContainer = styled.div<{ colorSchema: string }>`
  width: 85%;
  height: auto;
  border-radius: 9.5px;
  overflow: hidden;
  margin-bottom: 24px;
  margin-top: -64px;
  padding-bottom: 20px;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => props.theme.colors.complementary[props.colorSchema][3]};
`;
export interface SummaryListItem {
  title: string;
  id: string;
  type: 'number' | 'text' | 'date' | 'checkbox' | 'arrayNumber' | 'arrayText' | 'arrayDate';
  category?: string;
  inputId?: string;
}

interface SummaryListCategory {
  category: string;
  description: string;
}

interface Props {
  heading: string;
  items: SummaryListItem[];
  categories?: SummaryListCategory[];
  colorSchema?: PrimaryColor;
  showSum?: boolean;
  startEditable?: boolean;
}
/**
 * Summary list, that is linked and summarizes values from other input components.
 * The things to summarize is specified in the items prop.
 * The things are grouped into categories, as specified by the categories props.
 */
const SummaryList: React.FC<Props> = ({ heading, items, categories, colorSchema, showSum, startEditable }) => {
  const validColorSchema = getValidColorSchema(colorSchema);
  const generateListItem = (item: SummaryListItem, index?: number) => ({
    category: item.category || '',
    component: <SummaryListItemComponent item={item} index={index ? index + 1 : undefined} color={validColorSchema} />,
  });

  // Just display a zero in the sum, if we show one.
  const sum = 0;

  const listItems: { category: string; component: JSX.Element }[] = [];
  items.forEach((item) => {
    listItems.push(generateListItem(item));
  });

  return (
    <>
      <GroupedList
        heading={heading}
        items={listItems}
        categories={categories || []}
        colorSchema={validColorSchema}
        showEditButton
        startEditable={startEditable}
      />
      {showSum && (
        <SumContainer colorSchema={validColorSchema}>
          <SumLabel colorSchema={validColorSchema}>Summa</SumLabel>
          <SumText type="h1">{sum} kr</SumText>
        </SumContainer>
      )}
    </>
  );
};

SummaryList.defaultProps = {
  heading: '',
  items: [],
  colorSchema: 'blue',
  showSum: true,
};
export default SummaryList;
