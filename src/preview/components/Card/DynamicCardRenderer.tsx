/* eslint-disable default-case */
import React from 'react';
import Card from './Card';
import TextComponent from '../Text/Text';
import Icon from '../Icon/Icon';
import icons from '../../helpers/Icons';
import { PrimaryColor } from '../../styles/themeHelpers';

interface Image {
  type: 'image';
  image: keyof typeof icons;
  circle?: boolean;
  style?: React.CSSProperties;
}

interface Text {
  type: 'text';
  text: string;
  italic?: boolean;
}

interface Title {
  type: 'title';
  text: string;
}

interface Subtitle {
  type: 'subtitle';
  text: string;
}

interface ButtonBase {
  type: 'button';
  text: string;
  colorSchema?: PrimaryColor;
  icon?: string;
  iconPosition?: 'left' | 'right';
}
type Button = ButtonBase &
  (
    | { action: 'email'; email: string }
    | { action: 'phone'; phonenumber: string }
    | { action: 'url'; url: string }
    | { action: 'navigate'; screen: string }
  );

type CardComponent = Image | Text | Title | Subtitle | Button;
/***** end of types */

/** Maps an object to a Card child component */
const renderCardComponent = (component: CardComponent) => {
  switch (component.type) {
    case 'text':
      return <Card.Text italic={component.italic}>{component.text}</Card.Text>;
    case 'title':
      return <Card.Title>{component.text}</Card.Title>;
    case 'subtitle':
      return <Card.SubTitle>{component.text}</Card.SubTitle>;
    case 'image':
      return <Card.Image src={icons[component.image]} style={component.style} circle={component.circle} />;
  }

  // Treat buttons separately, because they have some more complicated behavior
  if (component.type === 'button') {
    const { icon, iconPosition, text } = component;
    let onClick: () => void = () => null;
    switch (component.action) {
      case 'email':
        onClick = () => {
          console.log('trying to send email');
        };
        break;
      case 'phone':
        onClick = () => {
          console.log('trying to make a phone call');
        };
        break;
      case 'navigate':
        onClick = () => {
          console.log('trying to navigate in app');
        }; // TODO think about sending parameters here
        break;
      case 'url':
        onClick = () => {
          window.open(component.url, '_blank');
        };
        break;
    }
    return (
      <Card.Button onClick={onClick}>
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          {icon && iconPosition && iconPosition === 'left' && <Icon name={icon} />}
          <TextComponent>{text}</TextComponent>
          {icon && (!iconPosition || iconPosition === 'right') && <Icon name={icon} />}
        </div>
      </Card.Button>
    );
  }
};

interface Props {
  colorSchema?: PrimaryColor;
  backgroundColor?: PrimaryColor;
  shadow?: boolean;
  outlined?: boolean;
  components?: CardComponent[];
}

/** Dynamically renders a card with the sent in children as an array of json objects. */
const DynamicCardRenderer: React.FC<Props> = ({ colorSchema, backgroundColor, shadow, outlined, components }) => {
  return (
    <Card colorSchema={colorSchema || 'neutral'}>
      <Card.Body color={backgroundColor || 'neutral'} shadow={shadow} outlined={outlined}>
        {components && components?.length > 0 && components?.map((component) => renderCardComponent(component))}
      </Card.Body>
    </Card>
  );
};

export default DynamicCardRenderer;
