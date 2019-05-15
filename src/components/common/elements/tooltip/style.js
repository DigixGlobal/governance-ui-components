import styled, { css } from 'styled-components';

const TOOLTIP_WIDTH = '200px';

export const TooltipBox = styled.div`
  position: relative;
`;

export const Trigger = styled.div`
  display: flex;
  margin-top: 0.2rem;

  svg {
    fill: ${props => props.theme.tooltip.icon.light.toString()};
  }
`;

export const Bubble = styled.div`
position: absolute;
border: 1px solid ${props => props.theme.tooltip.border.lighter.toString()};
color: ${props => props.theme.tooltip.content.base.toString()};
padding 2rem;
padding-bottom: 1rem;
background: ${props => props.theme.tooltip.background.toString()};
border-radius: ${props => props.theme.borderRadius};
z-index: 4;
width: ${TOOLTIP_WIDTH};
font-family: 'Futura PT Book', sans-serif;
text-transform: none;
left: calc(( -${TOOLTIP_WIDTH} / 2) + 12.5px);
top: 2.5rem;

h6 {
    color: ${props => props.theme.tooltip.title.base.toString()};
    font-size: 1.4rem;
    font-family: 'Futura PT Medium', sans-serif;
    margin-bottom: 1rem;
    text-transform: uppercase;
}

&::after {
    content: '';
    position: absolute;
}

`;
