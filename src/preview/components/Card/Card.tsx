/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Heading from '../Heading/Heading';
import { colorPalette } from '../../styles/palette';
import { PrimaryColor } from '../../styles/themeHelpers';

const Container = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding-left: 1px;
  padding-right: 1px;
  width: 90%;
`;

const Body = styled.div<{ colorSchema: PrimaryColor; outlined?: boolean; shadow?: boolean }>`
  background-color: ${(props) =>
    props.colorSchema === 'neutral'
      ? props.theme.colors.neutrals[7]
      : props.theme.colors.complementary[props.colorSchema][3]};
  ${(props) => {
    // Overrides colorSchema without affecting it's children
    if (props.color) {
      switch (props.color) {
        case 'neutral':
          return `background-color: ${props.theme.colors.neutrals[7]};`;
        default:
          return `background-color: ${props.theme.colors.complementary[props.color][3]};`;
      }
    }
  }}
  padding: 24px;
  border-radius: 8px;
  flex-direction: row;
  ${({ shadow }) =>
    shadow &&
    `
  elevation: 2;
  shadow-offset: 0px 2px;
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  `}
  ${(props) => {
    if (props.outlined) {
      switch (props.colorSchema) {
        case 'neutral':
          return `border: 2px solid ${props.theme.colors.neutrals[0]};`;
        default:
          return `border: 2px solid ${props.theme.colors.primary[props.colorSchema][0]};`;
      }
    }
  }}
`;

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const BodyImageContainer = styled.div`
  padding-right: 24px;
`;

const BodyContainer = styled.div`
  width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled(Heading)<{ colorSchema: PrimaryColor }>`
  color: ${(props) =>
    props.colorSchema === 'neutral'
      ? props.theme.colors.neutrals[0]
      : props.theme.colors.primary[props.colorSchema][0]};
`;

const CardSubTitle = styled(Text)<{ colorSchema: PrimaryColor }>`
  color: ${(props) =>
    props.colorSchema === 'neutral'
      ? props.theme.colors.neutrals[0]
      : props.theme.colors.primary[props.colorSchema][3]};
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights[1]};
`;

const CardText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes[3]}px;
  ${(props) => props.italic && `color: ${props.theme.colors.neutrals[3]};`}
`;

const Outset = styled.div<{ firstChild?: boolean; lastChild?: boolean }>`
  padding-top: 8px;
  padding-bottom: 8px;
  ${({ firstChild }) => firstChild && `padding-top: 0px;`}
  ${({ lastChild }) => lastChild && `padding-bottom: 0px;`}
`;

const CardImage = styled.img<{ circle?: boolean }>`
  width: 80px;
  height: 80px;
  resize-mode: contain;
  ${({ circle }) => circle && `border-radius: 50px;`}
`;

interface Props {
  colorSchema: PrimaryColor;
}

const Card = Object.assign(
  ({ children, colorSchema, ...props }: React.PropsWithChildren<Props>) => {
    // First filter out falsy child components. Then clone each child and add additional props
    const childrenWithProps = React.Children.toArray(children).reduce((filtered, child, index) => {
      if (child && React.isValidElement(child)) {
        const childWithProps = React.cloneElement(child, {
          key: index,
          colorSchema,
          firstChild: index === 0,
          lastChild: index === React.Children.count(children) - 1,
        });
        (filtered as React.ReactChild[]).push(childWithProps);
      }
      return filtered;
    }, []);

    return <Container {...props}>{childrenWithProps}</Container>;
  },
  {
    Body: ({
      children,
      colorSchema,
      color,
      ...props
    }: React.PropsWithChildren<{
      colorSchema?: PrimaryColor;
      color?: PrimaryColor;
      shadow?: boolean;
      outlined?: boolean;
    }>) => {
      // Remove falsy child components
      const filteredChildren = React.Children.toArray(children).filter(Boolean);

      // let underlayColor =
      //   colorSchema === 'neutral' ? colorPalette.neutrals[5] : colorPalette.complementary[colorSchema || 'blue'][2];
      // if (color) {
      //   underlayColor = color === 'neutral' ? colorPalette.neutrals[5] : colorPalette.complementary[color][2];
      // }

      const imageWithProps: any[] = [];
      const childrenWithProps: any[] = [];
      React.Children.map(filteredChildren, (child, index) => {
        // Clone children and separate image from other children to make positioning easier
        if (index === 0 && React.isValidElement(child) && child.type === Card.Image) {
          imageWithProps[index] = React.cloneElement(child as React.ReactElement, {
            key: index,
            colorSchema,
            firstChild: index === 0,
            lastChild: index === React.Children.count(filteredChildren) - 1,
          });
          return;
        }

        childrenWithProps[index] = React.cloneElement(child as React.ReactElement, {
          key: index,
          colorSchema: (child as React.ReactElement)?.props?.colorSchema || colorSchema,
          color,
          firstChild: index === 0,
          lastChild: index === React.Children.count(filteredChildren) - 1,
        });
      });

      return (
        <Body colorSchema={color || 'neutral'} color={color} {...props}>
          <BodyWrapper>
            {imageWithProps.length > 0 && <BodyImageContainer>{imageWithProps}</BodyImageContainer>}
            <BodyContainer>{childrenWithProps}</BodyContainer>
          </BodyWrapper>
        </Body>
      );
    },
    Title: ({ children, colorSchema, ...props }: React.PropsWithChildren<{ colorSchema?: PrimaryColor }>) => {
      return (
        <CardTitle colorSchema={colorSchema || 'neutral'} {...props}>
          {children}
        </CardTitle>
      );
    },
    Image: ({
      firstChild,
      lastChild,
      ...props
    }: React.PropsWithChildren<{
      firstChild?: boolean;
      lastChild?: boolean;
      src?: string;
      circle?: boolean;
      style?: Record<string, any>;
    }>) => (
      <Outset lastChild={lastChild} firstChild={firstChild}>
        <CardImage {...props} />
      </Outset>
    ),
    Section: ({
      children,
      colorSchema,
      color,
      ...props
    }: React.PropsWithChildren<{ colorSchema: PrimaryColor; color: PrimaryColor }>) => {
      // Reset padding for sections
      // const style = { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 };
      const sectionElement = React.cloneElement(
        <Card.Body colorSchema={colorSchema} color={color} {...props} />,
        children || undefined,
      );
      return sectionElement;
    },
    SubTitle: ({ children, colorSchema, ...props }: React.PropsWithChildren<{ colorSchema?: PrimaryColor }>) => (
      <CardSubTitle colorSchema={colorSchema || 'neutral'} {...props}>
        {children}
      </CardSubTitle>
    ),
    Text: ({
      children,
      lastChild,
      firstChild,
      italic,
      ...props
    }: React.PropsWithChildren<{ lastChild?: boolean; firstChild?: boolean; italic?: boolean }>) => (
      <Outset lastChild={lastChild} firstChild={firstChild}>
        <CardText {...props} italic={italic}>
          {children}
        </CardText>
      </Outset>
    ),
    Button: ({
      children,
      colorSchema,
      firstChild,
      lastChild,
      ...props
    }: React.PropsWithChildren<{
      lastChild?: boolean;
      firstChild?: boolean;
      colorSchema?: PrimaryColor;
      onClick: () => void;
    }>) => (
      <Outset lastChild={lastChild} firstChild={firstChild}>
        <Button variant="link" z={0} colorSchema={colorSchema || 'neutral'} block {...props}>
          <>{children}</>
        </Button>
      </Outset>
    ),
  },
);

export default Card;
