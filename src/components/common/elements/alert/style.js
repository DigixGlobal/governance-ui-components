import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 30rem;
  height: 4rem !important;
  top: 7rem;
  right: 1rem;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  text-align: center;
  background-color: rgba(226, 206, 152, 0.2);
  padding: 1.5rem 2.5rem;
  border: 1px solid #c4a159;
  color: #c4a159;
  padding-bottom: 3rem;
  font-family: 'Futura PT Medium';
  border-radius: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: ${props => props.theme.boxShadow};
`;
