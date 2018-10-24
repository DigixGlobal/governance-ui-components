import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressBar = props => (
  <LinearProgress value={props.value} variant={!props.value ? 'query' : 'determinate'} />
);

export default ProgressBar;
