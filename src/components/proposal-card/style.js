import styled from 'styled-components';

export const ProposalContainer = styled.div`
  /* padding: 2rem; */
  position: relative;
  max-width: 50.4rem;
  width: 50.4rem;
  min-height: 36.6rem;
  height: 36.6rem;
  max-height: 36.6rem;
  background-color: ${props => props.theme.backgroundColor.default.toString()};
  float: left;
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  > div {
    float: left;
  }
`;

export const TagsContainer = styled.div`
  > a {
    margin-right: 0.5rem;
  }
`;

export const ProposalDetail = styled.div`
  text-align: justify;
  max-width: 33.4rem;
  padding: 3rem 3rem;
  height: 36.6rem;
  font-size: 1.6rem;

  > h2 {
    margin: 2rem 0;
    font-size: 3.2rem;
    text-align: left;
  }
`;

export const MileStones = styled.div`
  text-transform: uppercase;
`;

export const Stats = styled.div`
  width: 16.8rem;
  text-transform: uppercase;
  margin: 0 auto;
  position: relative;
  text-align: center;
  height: 36.5rem;
  > div:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor.default.toString()};
  }
`;

export const StatItem = styled.div`
  border-left: 1px solid ${props => props.theme.borderColor.default.toString()};
  padding-top: 4rem;
  height: 12.12rem;
  font-size: 1.6rem;
  vertical-align: middle;

  > span {
    font-size: 2.5rem;
    display: block;
    /* height: 4rem; */
  }
`;
export const ProgressContainer = styled.div`
  position: relative;
  background-color: #b8c5d0;
  height: 1rem;
  width: 50.4rem;
  z-index: 5;
`;

export const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  z-index: 10;
  height: 1rem;
  background-color: #243961;
`;
