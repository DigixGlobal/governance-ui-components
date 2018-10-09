import styled from 'styled-components';

export const HeaderWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 68px;
  background-color: ${props => props.theme.headerBackgroundColor.toString()};
  color: ${props => props.theme.defaultTextColor.toString()};
  border-bottom: 1px solid ${props => props.theme.headerBorderColor.toString()};
  padding: 0;

  & > div {
    border-left: 1px solid ${props => props.theme.headerBorderColor.toString()};
    flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 2em;

    &:nth-child(1) {
      flex: 0.5 0 0;
    }
    &:nth-child(2) {
      justify-content: flex-start;
      flex: 4 0 0;
    }
    &:nth-child(3) {
      flex: 3 0 0;
    }
  }
`;

export const WalletWrapper = styled.div`
  flex: 3 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 2em !important;
  //   width: 300px;
  border-left: 0 !important;
`;
