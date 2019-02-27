import React from 'react';

import { DisplayBox, Value } from './styled';

interface DisplayProps {
  value: number | string
};

const display = ({ value }: DisplayProps) => {
  return (
    <DisplayBox>
      <Value>
        {value}
      </Value>
    </DisplayBox>
  );
}

export default display;
