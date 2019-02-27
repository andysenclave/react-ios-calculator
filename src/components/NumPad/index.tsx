import React from 'react';

import Button from '../Button';
import { NumPadBox } from './styled';

interface NumPadProps {
  value: string
  items: string[]
  onClick: Function
  activeOperator: string
}

const renderButtons = (props: NumPadProps) => {
  const { items, onClick, activeOperator, value } = props;

  return items.map((item, index) => {
    const props = {
      size: '',
      theme: '',
      content: item
    };
    if(value !== '0' && item === 'AC') {
      props.content = 'C';
    }
    if(index < 3) {
      props.theme = 'light';
    }
    if((index + 1) % 4 === 0 || (items.length - 1) === index) {
      if(activeOperator === item) {
        props.theme = 'active';
      } else {
        props.theme = 'orange';
      }
    }
    if(item === '0') {
      props.size = 'large'
    }
    return (
      <Button 
        size={props.size}
        onClick={() => onClick(props.content)}
        theme={props.theme}
        key={item}
      >
        {props.content}
      </Button>
    );
  });
}

const numpad = (props: NumPadProps) => {
  return (
    <NumPadBox>
      {renderButtons(props)}
    </NumPadBox>
  );
}

export default numpad;
