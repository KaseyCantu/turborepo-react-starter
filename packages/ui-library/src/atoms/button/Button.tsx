/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';

import { css } from '@emotion/react';

const style = css({
  background: 'hotpink',
});

export interface ButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button css={style}>{children}</button>;
};

Button.displayName = 'Button';
