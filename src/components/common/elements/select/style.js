import styled from 'styled-components';

const Container = styled.div`
  select {
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px),
      calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border: 1px solid ${props => props.theme.borderColor.lightest.toString()};
    border-radius: ${props => (props.rounded ? '2rem' : '.5rem')};
    color: ${props => props.color || props.theme.textDefault.default.toString()};
    padding: 0.8rem 2rem;
    font-size: 1.2rem;
    width: 150px;
    outline: none;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;

export default Container;
