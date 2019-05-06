import styled, { css } from 'styled-components';
import { H1, H3, Card, FieldItem } from '@digix/gov-ui/components/common/common-styles';
import { Button } from '@digix/gov-ui/components/common/elements/index';

export const KycWrapper = styled.div``;

export const Title = styled(H1)`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-family: 'Futura PT Book', sans-serif;
`;

export const SummaryReport = styled(Card)``;
export const ReportItem = styled.div``;

export const CTAContainer = styled.div`
  margin: 2rem 0;
`;

export const Container = styled.div`
  width: 75rem;
  /* display: flex; */
  /* flex-direction: row; */
`;

export const UserTitle = styled(H3)`
  padding: 1rem 0 2rem 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0;
`;

export const ValueWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e5e5;
`;

export const Caption = styled.div`
  background-color: #f2f2f2;
  font-weight: bold;
  width: 25%;
  padding: 1rem 2rem;
`;

export const Value = styled.div`
  width: 75%;
  padding: 1rem 2rem;

  canvas,
  img {
    height: auto;
    max-height: 100%;
    max-width: 100%;
    width: auto;
  }
`;

export const TabButton = styled(Button)`
  width: 20%;
  border-radius: 0;
  box-shadow: none;
  border: 1px solid ${props => props.theme.buttonPrimary.border.fade.toString()};
  border-right: 0;
  margin: 1rem 0;
  &:last-child {
    border-right: 1px solid ${props => props.theme.buttonPrimary.border.fade.toString()};
  }

  &:hover {
    border-right: 1px solid ${props => props.theme.buttonPrimary.border.base.toString()};
  }
`;

export const FilterLabel = styled(H3)`
  font-family: 'Futura PT Light';
  margin: 3rem 0 1rem 0;
`;

export const FieldGroup = styled.div`
  display: flex;
  margin: 3rem 0;
`;

export const FieldItemKYC = styled(FieldItem)`
  &:first-child {
    flex: 1 0 0;
  }

  &:last-child {
    flex: 0.5 0 0;
    display: flex;
    align-items: flex-end;
  }
`;

export const CloseButton = styled(Button)`
  border: 0;
  top: 10px;
  right: 5px;
  margin: 0;
  padding: 1rem 1.5rem;
  text-align: center;
  width: 100%;
  display: block;
`;

export const Enlarge = styled(Button)`
  background: ${props => props.theme.background.white.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: none;
  font-size: 1.2rem;
  margin: 0.5rem;
  padding: 1rem;
  right: 1rem;
  text-align: right;
  top: 1rem;

  div {
    height: 1.75rem;
    margin-right: 0;
    width: 1.75rem;
  }

  &:hover {
    background: ${props => props.theme.background.white.toString()};
    border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  }
`;
