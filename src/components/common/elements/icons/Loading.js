import React from 'react';
import { Container } from './style';

const Loading = props => (
  <Container {...props}>
    <svg width="52px" height="10px" viewBox="0 0 52 10">
      <defs>
        <path d="M44,1098 L835,1098 C837.209139,1098 839,1099.79086 839,1102 L839,1176 C839,1178.20914 837.209139,1180 835,1180 L44,1180 C41.790861,1180 40,1178.20914 40,1176 L40,1102 C40,1099.79086 41.790861,1098 44,1098 Z" id="path-1"></path>
        <filter x="-5.8%" y="-33.5%" width="109.1%" height="189.0%" filterUnits="objectBoundingBox" id="filter-2">
          <feOffset dx="-10" dy="9" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="10.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.503594541   0 0 0 0 0.597691893   0 0 0 0 0.834980867  0 0 0 0.0749830163 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Rag06b.-Burn" transform="translate(-70.000000, -1134.000000)">
          <g id="Main-BG" fillRule="nonzero" opacity="0.400000006">
            <rect id="Rectangle-3" x="0" y="0" width="1440" height="1483" rx="13"></rect>
          </g>
          <g id="Rectangle-25-Copy-2">
            <use fill="black" fill-opacity="1" filter="url(#filter-2)"></use>
            <use fill="#111E34" fillRule="evenodd"></use>
          </g>
          <rect id="Rectangle" fill-opacity="0.2" fill="#FFFFFF" transform="translate(74.949747, 1138.949747) rotate(-315.000000) translate(-74.949747, -1138.949747) " x="71.4497475" y="1135.44975" width="7" height="7"></rect>
          <rect id="Rectangle-Copy" fill-opacity="0.5" fill="#FFFFFF" transform="translate(95.949747, 1138.949747) rotate(-315.000000) translate(-95.949747, -1138.949747) " x="92.4497475" y="1135.44975" width="7" height="7"></rect>
          <rect id="Rectangle-Copy-2" fill="#FFFFFF" transform="translate(116.949747, 1138.949747) rotate(-315.000000) translate(-116.949747, -1138.949747) " x="113.449747" y="1135.44975" width="7" height="7"></rect>
        </g>
      </g>
    </svg>
  </Container>
);

Loading.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default Loading;
