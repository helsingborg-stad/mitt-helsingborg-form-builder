import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';

import { PrimaryColor } from '../../styles/themeHelpers';

const PreviewContainer = styled.div`
  padding-right: 25px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
`;

interface BackgroundProps {
  backgroundColor: PrimaryColor;
}
const Background = styled.div<BackgroundProps>`
  padding: 36px 28px;
  width: 100%;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px;
  box-sizing: border-box;
`;

interface BulletsContainerProps {
  paddingBottom: string;
}
const BulletsContainer = styled.div<BulletsContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

interface TaskContainerItemProps {
  width: string;
}
const BulletItem = styled.div<TaskContainerItemProps>`
  width: ${({ width }) => width};
  color: black;
`;

interface BulletProps {
  bulletColor: PrimaryColor;
}
const Bullet = styled.p<BulletProps>`
  color: ${({ bulletColor }) => bulletColor};
  font-weight: 500;
  font-size: 16px;
  margin: 0;
`;

interface BulletListProps {
  colorSchema: PrimaryColor;
  answers: string[];
}

const BulletList = (props: BulletListProps): JSX.Element => {
  const theme = useContext(ThemeContext);
  const { answers = [], colorSchema = 'red' } = props;

  const backgroundColor = theme.colors.complementary[colorSchema][3];
  const bulletColor = theme.colors.primary[colorSchema][1];

  return (
    <PreviewContainer>
      <Background backgroundColor={backgroundColor}>
        {
          <>
            {answers.map((answer, index) => (
              <BulletsContainer key={answer} paddingBottom={index === answers.length - 1 ? '0px' : '16px'}>
                <BulletItem width="10%">
                  <Bullet bulletColor={bulletColor}>•</Bullet>
                </BulletItem>
                <BulletItem width="80%">{answer}</BulletItem>
              </BulletsContainer>
            ))}
          </>
        }
      </Background>
    </PreviewContainer>
  );
};

export default BulletList;
