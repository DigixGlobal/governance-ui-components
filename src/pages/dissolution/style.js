import styled from 'styled-components';
import { Card } from '@digix/gov-ui/components/common/common-styles';
import { TextBox } from '@digix/gov-ui/components/common/blocks/overlay/unlock-dgd/style';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';

export const Modal = {
  Container: styled.div`
    padding: 3.2rem 2.4rem 2.4rem 2.4rem;
  `,

  Title: styled.h1`
    color: ${props => props.theme.textColor.primary.light.toString()};
    font-size: 2.4rem;
    margin-bottom: 2.4rem;
    text-transform: uppercase;
  `,

  Paragraph: styled.p`
    line-height: 1.5;
  `,

  Button: styled(Button)`
    margin: 2.4rem 0 0 0;
    width: 100%;
  `,
};

export const Step = {
  Wrapper: styled.div`
    color: ${props => props.theme.textColor.default.base.toString()};
    margin: 4rem auto;
    width: ${props => (props.wide ? '80rem' : '50rem')};
  `,

  Container: styled(Card)`
    flex-direction: column;
    padding: 3rem;
  `,

  Stepper: styled.div`
    color: ${props => props.theme.textColor.primary.base.toString()};
    font-family: 'Futura PT Medium', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  `,

  Title: styled.p`
    font-family: 'Futura PT Heavy', sans-serif;
    margin: 1rem auto;
    text-transform: uppercase;
  `,

  Subtitle: styled.p`
    font-family: 'Futura PT Medium', sans-serif;
    margin: 1rem auto;
    text-transform: uppercase;
  `,

  Text: styled.p`
    color: ${props => props.theme.textColor.primary.base.toString()};
    font-family: 'Futura PT Medium', sans-serif;
    margin: 1rem auto;
    text-transform: uppercase;
  `,

  Content: styled.div`
    display: flex;
    margin: 4rem 0;
    padding: 3rem;
    text-align: center;
  `,

  Currency: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,

  CurrencyValue: styled.div`
    color: ${props => props.theme.textColor.primary.base.toString()};
    font-family: 'Futura PT Medium', sans-serif;
    font-size: 6rem;
    margin: 0 auto 0.5rem auto;
    text-transform: uppercase;
  `,

  CurrencyLabel: styled.div`
    color: ${props => props.theme.textColor.primary.base.toString()};
    font-family: 'Futura PT Medium', sans-serif;
    font-size: ${props => props.small ? '1.4rem' : '3rem'};
    margin: 0 auto;
    text-transform: uppercase;
  `,

  TextInput: styled(TextBox)`
    border-bottom: 1px solid black;
    margin: 0 auto;
    margin-bottom: 2rem;
    text-align: center;
    width: 150px;

    &:focus {
      border-bottom: 1px solid black;
    }
  `,

  ErrorMessage: styled.p`
    color: ${props => props.theme.errorBorder.toString()};
    margin-top: 1rem;
  `,

  NavButton: styled(Button)`
    margin: 0;
    width: 100%;
  `,

  Arrow: styled(Icon)`
    left: 1rem;
    position: relative;
    top: 5.5rem;
    width: 5rem;
  `,

  SuccessIcon: styled(Icon)`
    svg {
      fill: ${props => props.theme.transaction.success.default.toString()};
    }
  `
};
