import styled from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';

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
    justify-content: flex-start;
    height: 100%;
    padding: 0 2em;

    &:nth-child(2) {
      justify-content: flex-end;
      flex: 0 0 auto;
    }
    &:nth-child(3) {
      flex: 0 0 180px;
      justify-content: center;
    }
  }
`;

export const WalletWrapper = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border-left: 0 !important;
`;

export const LockDGDButton = styled(Button)`
  background: ${props => props.theme.buttonInverted.background.base.toString()};
  color: ${props => props.theme.buttonInverted.textColor.base.toString()};

  &:hover {
    background: ${props => props.theme.buttonInverted.background.base.toString()};
  }
`;

export const Dropdown = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div`
  border-radius: 3px;
  left: 2rem;
  position: absolute;
  top: 90%;
  right: 0;
  width: 230px;
  background: #fff;
  border: 1px solid ${props => props.theme.background.default.lighter.toString()};
  padding: 1.25rem 2rem;
`;

export const MenuItem = styled.a``;

export const AddressButton = styled(Button)`
  background: ${props => props.theme.background.default.lightest.toString()};
  border: 1px solid ${props => props.theme.background.default.lighter.toString()};
  box-shadow: none;
  color: ${props => props.theme.textColor.default.base.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.4rem;
  padding: 0.75rem 1.5rem;
  width: 250px;
  white-space: nowrap;
  text-transform: lowercase;

  &:hover {
    color: ${props => props.theme.textColor.default.light.toString()};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    flex: 0 0 auto;
    margin-right: 0;
    margin-left: 1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
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
