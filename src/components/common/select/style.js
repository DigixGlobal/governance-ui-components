import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  /*Don't really need this just for demo styling*/

  float: left;
  min-width: 18rem;
  /* margin: 50px 33%; */
  /* padding-right: 2rem; */

  :after {
    content: '>';
    transform: rotate(90deg);
    font-family: 'Futura PT Light';
    font-size: 2rem;
    color: #000;
    right: 1rem;
    top: 0.5rem;
    height: 3rem;
    padding: 2rem 0px 2rem 0.8rem;
    border-left: none;
    position: absolute;
    top: -0.3rem;
    pointer-events: none;
  }

  /* IE11 hide native button (thanks Matt!) */
  select::-ms-expand {
    display: none;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    /* Add some styling */

    display: block;
    width: 100%;
    max-width: 32rem;
    height: 3rem;
    float: right;
    margin: 0.5rem 0px;
    padding: 0px 1.4rem;
    font-size: 1.5rem;
    line-height: 1.75;
    color: #333;
    background-color: #ffffff;
    background-image: none;
    border: none;
    -ms-word-break: normal;
    word-break: normal;
    font-family: 'Futura PT Light';
  }

  select > option {
    font-family: 'Futura PT Light';
  }
`;

export default Container;
