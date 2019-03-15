import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  z-index: 1100;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
  cursor: pointer;
  position: absolute;
  right: 6rem;
  pointer-events: all;
  z-index: 1101;
`;
