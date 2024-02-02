import styled from 'styled-components';

export const StyledModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: var(--color-modal-overlay);
  cursor: zoom-out;
`;

export const StyledImage = styled.img`
  position: absolute;
  display: block;
  max-width: 95%;
  max-height: 95%;
  cursor: auto;
`;
