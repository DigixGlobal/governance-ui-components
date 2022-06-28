import React from 'react';
import { Container } from './style';

const ConversionArrow = props => (
  <Container {...props}>
    <svg width="44px" height="10px" viewBox="0 0 44 10">
      <defs>
          <rect id="path-1" x="268" y="380" width="904" height="391"></rect>
          <filter x="-3.8%" y="-7.8%" width="107.9%" height="118.2%" filterUnits="objectBoundingBox" id="filter-2">
              <feOffset dx="1" dy="5" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur stdDeviation="11" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
              <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
              <feColorMatrix values="0 0 0 0 0.953125   0 0 0 0 0.953125   0 0 0 0 0.953125  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Rag06b.-Burn" transform="translate(-698.000000, -557.000000)" fillRule="nonzero">
              <g id="Main-BG" fill="#F1F1F1" opacity="0.400000006">
                  <rect id="Rectangle-3" x="0" y="0" width="1440" height="1483" rx="13"></rect>
              </g>
              <g id="Rectangle-2-Copy">
                  <use fill="black" fillOpacity="1" filter="url(#filter-2)"></use>
                  <rect stroke="#EEEEEE" strokeWidth="1" strokeLinejoin="square" fill="#FCFCFC" fillRule="evenodd" x="268.5" y="380.5" width="903" height="390"></rect>
              </g>
              <path id="Line-2" d="M732.5,557.5 L741.5,562 L732.5,566.5 L732.5,562.5 L698.5,562.5 L698.5,561.5 L732.5,561.5 L732.5,557.5 Z" fill="#131F35"></path>
          </g>
      </g>
    </svg>
  </Container>
);

ConversionArrow.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default ConversionArrow;
