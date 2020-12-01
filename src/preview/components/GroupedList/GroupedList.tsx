import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';
import Fieldset, { FieldsetButton } from '../Fieldset/Fieldset';
import { colorPalette } from '../../styles/palette';
import Heading from '../Heading/Heading';

const ListBody = styled.div`
  padding-top: 12px;
  padding-bottom: 20px;
  height: auto;
`;

const ListBodyFieldLabel = styled(Heading)<{ colorSchema: string }>`
  margin-top: 5px;
  margin-left: 3px;
  font-weight: ${props => props.theme.fontWeights[1]};
  font-size: ${props => props.theme.fontSizes[3]};
  color: ${props => props.theme.colors.primary[props.colorSchema][1]};
`;

interface Props {
  heading?: string;
  items: { category: string; component: JSX.Element }[];
  categories: { category: string; description: string }[];
  color: string;
  showEditButton?: boolean;
  startEditable?: boolean;
}

/**
 * A grouped list, grouping items according to categories.
 * Can show an edit-button, which toggles an editable prop in the children.
 */
const GroupedList: React.FC<Props> = ({
  heading,
  items,
  categories,
  color,
  showEditButton,
  startEditable,
}) => {
  const [editable, setEditable] = useState(startEditable);

  const groupedItems: Record<string, { category: string; component: JSX.Element }[]> = {};
  const changeEditable = () => {
    setEditable(!editable);
  };

  categories.forEach(cat => {
    const catItems = items.filter(item => item.category === cat.category);
    if (catItems.length > 0) {
      groupedItems[cat.category] = catItems;
    }
  });
  const colorSchema = Object.keys(colorPalette.primary).includes(color) ? color : 'blue';

  return (
    <Fieldset
      colorSchema={colorSchema}
      legend={heading || ''}
      iconName="help-outline"
      renderHeaderActions={() =>
        showEditButton && (
          <FieldsetButton colorSchema={colorSchema} z={0} size="small" onClick={changeEditable}>
            <Text>{editable ? 'Färdig' : 'Ändra'}</Text>
          </FieldsetButton>
        )
      }
    >
      <ListBody>
        {Object.keys(groupedItems).map((key, index) => (
          <div key={`${index}-${key}`}>
            <ListBodyFieldLabel colorSchema={colorSchema}>
              {categories.find(c => c.category === key)?.description}
            </ListBodyFieldLabel>
            {groupedItems[key].map(item => ({
              ...item.component,
              props: { ...item.component.props, editable },
            }))}
          </div>
        ))}
      </ListBody>
    </Fieldset>
  );
};

GroupedList.defaultProps = {
  items: [],
  categories: [],
  color: 'blue',
};
export default GroupedList;
