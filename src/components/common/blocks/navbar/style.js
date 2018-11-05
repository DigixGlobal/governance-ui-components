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
  margin-left: auto;
  border-radius: 3rem;
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  border-radius: 2rem;
  color: ${props => props.theme.textPrimary.default.toString()};
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UtilityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  padding: 0;
`;

export const Notification = styled.div`
  height: 20rem;
  width: 20rem;
  position: absolute;
  overflow: hidden;
  top: 5rem;
  text-align: center;
  background-color: #fff;
  border: 1px solid #c4a159;
  color: #c4a159;
  margin-bottom: 4rem;
  font-family: 'Futura PT Medium';
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const NotificationHeader = styled.div`
  height: 2rem;
  background-color: #c4a159;
  border-bottom: 1px solid #c4a159;
  color: #fff;
`;

export const NotificationCount = styled.div`
  text-align: center;
  font-size: 1rem;
  top: 1rem;
  margin-left: 0.5rem;
  color: #fff;
  position: absolute;
  display: inline-block;
  background-color: #c4a159;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}
`;
export const NotificationContent = styled.div`
  overflow: auto;
  padding: 1rem;
  padding: 0.5rem 1rem;
  text-align: justify;
  display: flex;
  flex-direction: column;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
`;

export const TxHash = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: 13rem;
`;

export const TxStatus = styled.span`
  width: 2rem;
  display: inline-block;
`;
