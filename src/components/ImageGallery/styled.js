import styled from 'styled-components';

export const StyledGallery = styled.ul`
  display: grid;
  max-width: 1140px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: 250px;
  grid-gap: 12px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
  margin-bottom: 12px;
  list-style: none;
`;
