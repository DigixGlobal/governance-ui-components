import styled from 'styled-components';
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
`;

export const TabButton = styled(Button)`
  width: 25%;
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

export const FieldImg = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  background: #fff;
  border: 0;
  top: 10px;
  right: 5px;
  margin: 0;
  padding: 1rem 1.5rem;
`;
