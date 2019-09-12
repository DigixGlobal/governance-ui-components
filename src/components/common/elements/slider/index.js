import React from 'react';
import Slider from 'rc-slider/lib/Slider';

import 'rc-slider/assets/index.css';
import './style.css';

export default class DigixSlider extends React.Component {
  render() {
    return <Slider {...this.props} />;
  }
}
