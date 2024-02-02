import styled from 'styled-components';

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: scale var(--animation-duration) var(--timing-function);
  cursor: zoom-in;

  &:hover {
    scale: 1.05;
    box-shadow: 0 0 5px var(--color-primary-brand);
  }
`;
