import styled, { css } from 'styled-components';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const Digix = styled(Icon)`
  svg {
    height: 45px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  width: 100%;
  z-index: 99;

  background-color: ${props => props.theme.background.white.toString()};
  color: ${props => props.theme.textColor.default.base.toString()};
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  padding: 0;

  & > div {
    display: flex;
    align-items: center;
    flex: 0 1 auto;

    &:first-child {
      flex: 0 1 110px;
    }

    &:nth-child(2) {
    }

    &:nth-child(3) {
      flex: 1;
      justify-content: flex-end;
    }
  }
`;

// START::: Styles for Internationalization

export const Selector = styled.div`
  background-color: #fff;
  border: 1px solid ${props => props.theme.background.default.lightest.toString()};
  border-top: 0;
  display: inline-block;
  text-align: right;
  position: absolute;
  top: 67px;
  left: -1px;
  display: none;
  opacity: 0;
  transition: opacity 500ms ease;
  width: 128px;

  a {
    color: #333;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  height: 68px;
  padding: 0 2rem;
  border-left: 1px solid ${props => props.theme.borderColor.lightest.toString()};

  a {
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => props.theme.textColor.primary.base.toString()};
  }

  ${props =>
    props.dropdown &&
    css`
      position: relative;

      &:hover > ${Selector} {
        display: block;
        opacity: 1;
      }
    `};

  ${props =>
    props.wallet &&
    css`
      position: relative;

      &:hover {
      }

      ${media.mobile`
          display: none !important;
        `};
    `};

  ${media.mobile`
    padding: 0 0.75rem;
    `};
`;

export const TransButton = styled(Button)`
  margin: 0;
  padding: 0;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: 'Futura PT Book', sans-serif;

  &:focus + ${Selector} {
    display: block;
    opacity: 1;
  }

  & > div {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 1rem;

    svg {
      fill: ${props => props.theme.icon.primary.base.toString()};
    }
  }
`;

export const Item = styled.div`
  cursor: pointer;
  padding: 2rem;
  text-align: left;

  &:hover {
    background-color: darken(#c00, 50%);
  }
`;

// START::: Styles for Wallet

export const Dropdown = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div`
  left: 0;
  position: absolute;
  top: 100%;
  right: 0;
  width: 221px;
  background: #fff;
  border: 1px solid ${props => props.theme.background.default.lighter.toString()};
  border-top: 0;
  padding: 1.25rem 2rem;

  ${media.mobile`
    width: 150px;
  `};
`;

export const AddressButton = styled(Button)`
  background: none;
  margin: 0;
  padding: 0;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: 'Futura PT Medium', sans-serif;

  &:focus + ${Selector} {
    display: block;
    opacity: 1;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 148px;
  }

  & > div {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 1rem;

    svg {
      fill: ${props => props.theme.icon.primary.base.toString()};
    }
  }
`;

export const MenuItem = styled.a``;

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

// Translator
