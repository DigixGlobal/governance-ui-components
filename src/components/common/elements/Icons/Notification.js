import React from 'react';
import { Container } from './Style';

const NotificationsIcon = props => (
  <Container {...props}>
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <path
        d="M15,21 C15,22.598 13.608,24 12.029,24 C10.45,24 9,22.598 9,21 L15,21 Z M15.137,3.945 C14.493,3.571 14.095,2.875 14.096,2.125 L14.096,2.122 C14.097,0.95 13.158,0 12,0 C10.842,0 9.903,0.95 9.903,2.122 L9.903,2.125 C9.904,2.876 9.507,3.571 8.862,3.945 C4.194,6.654 6.877,15.66 2,17.251 L2,19 L22,19 L22,17.251 C17.123,15.66 19.807,6.653 15.137,3.945 Z M12,1 C12.552,1 13,1.449 13,2 C13,2.552 12.552,3 12,3 C11.448,3 11,2.552 11,2 C11,1.449 11.448,1 12,1 Z M5.549,17 C6.738,15.333 7.154,13.109 7.513,11.185 C7.96,8.795 8.382,6.537 9.867,5.676 C11.247,4.875 12.823,4.916 14.134,5.676 C15.619,6.537 16.041,8.795 16.488,11.185 C16.847,13.109 17.263,15.333 18.452,17 L5.549,17 Z M20.778,9.321 C20.958,10.042 20.828,10.767 20.474,11.356 L21.444,11.94 C21.948,11.102 22.132,10.071 21.877,9.048 C21.622,8.024 20.977,7.2 20.138,6.697 L19.556,7.667 C20.145,8.022 20.599,8.601 20.778,9.321 Z M21.174,4.975 L20.577,5.97 C21.6,6.586 22.389,7.593 22.702,8.844 C23.013,10.095 22.787,11.354 22.172,12.378 L23.166,12.976 C23.702,12.084 24.001,11.05 24.001,9.976 C24,7.996 22.991,6.067 21.174,4.975 Z M4.444,7.667 L3.862,6.697 C3.023,7.201 2.378,8.024 2.123,9.048 C1.868,10.071 2.052,11.101 2.556,11.94 L3.526,11.356 C3.172,10.768 3.042,10.042 3.222,9.321 C3.401,8.601 3.855,8.022 4.444,7.667 Z M-8.8817842e-16,9.975 C-8.8817842e-16,11.049 0.299,12.083 0.835,12.975 L1.829,12.377 C1.214,11.353 0.988,10.094 1.299,8.843 C1.611,7.592 2.4,6.585 3.423,5.97 L2.826,4.975 C1.009,6.067 -8.8817842e-16,7.996 -8.8817842e-16,9.975 Z"
        id="Shape"
      />
    </svg>
  </Container>
);

NotificationsIcon.defaultProps = {
  width: '2rem',
  height: '2rem',
};

export default NotificationsIcon;
