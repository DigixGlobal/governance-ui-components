import styled from 'styled-components';

export const HeaderWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 68px;
  background-color: ${props => props.theme.backgroundHeader.default.toString()};
  color: ${props => props.theme.textDefault.toString()};
  border-bottom: 1px solid ${props => props.theme.headerBorderColor.toString()};
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 99;

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
      justify-content: flex-end;
    }
    &:nth-child(4) {
      flex: inherit;
      width: 150px;
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

export const AddressLabel = styled.div`
  border-radius: 3rem;
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  border-radius: 2rem;
  color: ${props => props.theme.textPrimary.default.toString()};
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  width: 23rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UtilityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  padding: 0;
  flex: inherit;
`;

export const Notification = styled.div`
  max-height: 25rem;
  width: 23rem;
  position: absolute;
  // overflow: hidden;
  top: 5rem;
  text-align: center;
  background-color: #fff;
  border: 1px solid #c4a159;
  color: #c4a159;
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const NotificationHeader = styled.div`
  background-color: ${props => props.theme.backgroundSecondary.default.toString()};
  border-bottom: 1px solid ${props => props.theme.backgroundSecondary.default.toString()};
  color: #fff;
  padding: 0.5rem 0;
  text-transform: uppercase;
`;

export const NotificationCount = styled.div`
  text-align: center;
  font-size: 1rem;
  top: 1rem;
  margin-left: 0.5rem;
  color: #fff;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.backgroundSecondary.default.toString()};
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
`;
export const NotificationContent = styled.div`
  padding: 2rem;
  overflow-y: scroll;
  max-height: 22rem;
`;

export const NotificationItem = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.75rem;
`;

export const TxHash = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 10rem;
  margin-right: 2rem;
  text-align: left;
`;

export const TxStatus = styled.span`
  // width: 2rem;
`;
