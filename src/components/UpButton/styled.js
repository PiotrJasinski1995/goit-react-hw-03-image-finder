import styled from 'styled-components';

export const StyledUpButton = styled.button`
  display: block;
  position: fixed;
  inset: auto 5px 5px auto;
  z-index: 10;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  background-color: #000000c6;
  border-radius: 50%;
  transition: transform var(--transition-general);

  &:hover {
    transform-origin: bottom;
    transform: scale(1, 1.3);
  }
`;
