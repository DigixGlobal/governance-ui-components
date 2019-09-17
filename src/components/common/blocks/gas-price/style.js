import styled from 'styled-components';
import { Card } from '@digix/gov-ui/components/common/common-styles';

export const SliderCard = styled(Card)`
  height: 10rem;
  padding: 2.5rem 5rem;
  background-color: ${props => props.theme.backgroundTertiary.lightest.toString()};
  box-shadow: none;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 0;

  .rc-slider-track {
    background-color: ${props => props.theme.textSecondary.default.toString()};
  }

  .rc-slider-handle {
    border: none;
    background-color: ${props => props.theme.textSecondary.default.toString()};
  }
`;

export const DefaultOption = styled.a`
  color: ${props => props.theme.textSecondary.default.toString()};
  float: right;
  text-decoration: underline;
`;

export const CardText = styled.div`
  margin-bottom: 2rem;
`;

export const ValueText = styled.span`
  font-family: 'Futura PT Medium', sans-serif;
`;

export const EstimateText = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

export const TransactionFeeText = styled.a`
  float: right;
`;

export const HeaderText = styled.p`
  font-family: 'Futura PT Medium', sans-serif;
`;

export const GasPriceSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const GasPriceOption = styled(Card)`
  cursor: pointer;
  padding: 1rem;
  box-shadow: none;
  border: 1px solid
    ${props =>
      props.isActive
        ? props.theme.alertMessage.info.default.toString()
        : props.theme.borderColor.lighter.toString()};
  color: ${props =>
    props.isActive
      ? props.theme.alertMessage.info.default.toString()
      : props.theme.textColor.default.base.toString()};
  margin-bottom: 0;
  width: 18%;
  flex-direction: column;
  flex-grow: 0;
  justify-content: center;
`;

export const AdvancedOption = styled.p`
  color: ${props => props.theme.alertMessage.info.default.toString()};
  margin-bottom: 0;
  text-align: center;
`;
