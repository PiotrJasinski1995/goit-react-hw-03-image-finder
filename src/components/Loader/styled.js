import styled from 'styled-components';

export const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: var(--color-modal-overlay);
`;

export const LoaderBackground = styled.div`
  background-color: var(--color-white);
  margin: 0;
  padding: 5px;
  border-radius: 50%;
`;
