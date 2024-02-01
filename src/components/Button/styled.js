import styled from 'styled-components';

export const StyledButton = styled.button`
  text-align: center;
  text-transform: capitalize;
  margin: 15px auto;
  display: block;
  color: var(--color-primary-brand);
  background-color: var(--color-light);
  border: 1px solid var(--color-accent);
  padding: 8px 16px;
  transition: color var(--transition-general),
    background-color var(--transition-general),
    border-color var(--transition-general), box-shadow var(--transition-general);

  &:hover {
    color: var(--color-white);
    background-color: var(--color-pressed-state);
    border: 1px solid var(--color-pressed-state);
    box-shadow: 0px 2px 2px 0px #0000001f, 0px 2px 1px 0px #00000014,
      0px 3px 1px 0px #0000001a;
  }
`;
