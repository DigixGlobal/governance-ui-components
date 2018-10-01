import styled from 'styled-components';

const gridWidth = '114rem';
const gutterVertical = '8rem';
const gutterHorizontal = '6rem';

export const Row = styled.div`
  max-width: ${gridWidth};
  margin: 0 auto;

  &:not(:last-child) {
    margin-bottom: ${gutterVertical};
  }

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  > div {
    float: left;

    &:not(:last-child) {
      margin-right: ${gutterHorizontal};
    }
  }
`;

export const Col1Of2 = styled.div`
  width: calc((100% - ${gutterHorizontal}) / 2);
`;

export const Col1Of3 = styled.div`
  width: calc((100% - 2 * ${gutterHorizontal}) / 3);
`;

export const Col2Of3 = styled.div`
  width: calc(2 * ((100% - 2 * ${gutterHorizontal}) / 3) + (${gutterHorizontal}));
`;

export const Col1Of4 = styled.div`
  width: calc((100% - 3 * ${gutterHorizontal}) / 4);
`;

export const Col2Of4 = styled.div`
  width: calc(2 * ((100% - 3 * ${gutterHorizontal}) / 4) + (${gutterHorizontal}));
`;

export const Col3Of4 = styled.div`
  width: calc(3 * ((100% - 3 * ${gutterHorizontal}) / 4) + 2 * (${gutterHorizontal}));
`;
