import styled from 'styled-components';

export const FieldItem = styled.div`
  margin-bottom: 3rem;
`;

export const EditFunding = styled.div`
  border: 1px solid ${props => props.theme.borderColor.light.toString()};
  background: ${props => props.theme.backgroundPrimary.fade.toString()};
  border-radius: ${props => props.theme.borderRadius};
  margin: 1rem 0 2rem 0;
  padding: 1rem;
`;
