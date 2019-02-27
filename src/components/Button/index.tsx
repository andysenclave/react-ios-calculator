import React, { Children } from 'react';

import { StyledButton } from './styled';

interface ButtonProps {
  size?: string,
  theme?: string,
  onClick: Function,
  children: string
}

const button = ({ size, theme, onClick, children }: ButtonProps) => {
  return (
    <StyledButton size={size} theme={theme} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default button;
