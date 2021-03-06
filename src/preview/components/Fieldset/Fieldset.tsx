import React from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';
import Button from '../Button/Button';

interface FieldsetContainerProps {
  colorSchema: string;
  empty?: boolean;
}

const FieldsetContainer = styled.div<FieldsetContainerProps>`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: auto;
  border-radius: 9.5px;
  overflow: hidden;
  margin-bottom: 24px;
  margin-top: 16px;
  padding-bottom: 20px;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) =>
    props?.empty
      ? props.theme.fieldset[props.colorSchema].backgroundEmpty
      : props.theme.fieldset[props.colorSchema].background};
`;

const FieldsetHeader = styled.div`
  padding-left: 4px;
  position: relative;
  flex-direction: row;
  display: inline-flex;
  justify-content: space-between;
`;

export const FieldsetButton = styled(Button)`
  margin-left: 26px;
`;

interface FieldsetHeaderSectionProps {
  justifyContent: string;
}

const FieldsetHeaderSection = styled.div<FieldsetHeaderSectionProps>`
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
`;

const FieldsetBody = styled.div``;

interface FieldsetLegendProps {
  colorSchema: string;
}

const FieldsetLegend = styled(Text)<FieldsetLegendProps>`
  color: ${(props) => props.theme.fieldset[props.colorSchema].legend}
  font-size: 12px;
  padding-bottom: 12px;
  font-weight: bold;
  padding-top: 8px;
`;

interface FieldsetLegendBorderProps {
  colorSchema: string;
}

const FieldsetLegendBorder = styled.div<FieldsetLegendBorderProps>`
  border-bottom-color: ${(props) => props.theme.fieldset[props.colorSchema].legendBorder}
  border-bottom-width: 2px;
  align-self: flex-start;
`;

interface FieldsetProps {
  children: React.ReactNode;
  legend: string;
  iconName?: string;
  iconSize?: number;
  colorSchema: string;
  empty?: boolean;
  renderHeaderActions?: () => void;
}

const Fieldset: React.FC<FieldsetProps> = ({ children, legend, colorSchema, renderHeaderActions, empty }) => {
  return (
    <FieldsetContainer colorSchema={colorSchema} empty={empty}>
      <FieldsetHeader>
        <FieldsetHeaderSection justifyContent="flex-start">
          <FieldsetLegendBorder colorSchema={colorSchema}>
            <FieldsetLegend colorSchema={colorSchema}>{legend.toUpperCase()}</FieldsetLegend>
          </FieldsetLegendBorder>
        </FieldsetHeaderSection>

        <FieldsetHeaderSection justifyContent="flex-end">
          {/* {showIcon && <Icon name={iconName} size={iconSize} />} */}
          {renderHeaderActions && renderHeaderActions()}
        </FieldsetHeaderSection>
      </FieldsetHeader>
      <FieldsetBody>{children}</FieldsetBody>
    </FieldsetContainer>
  );
};

Fieldset.defaultProps = {
  legend: '',
  colorSchema: 'blue',
  iconName: undefined,
  renderHeaderActions: undefined,
  iconSize: 22,
};

export default Fieldset;
