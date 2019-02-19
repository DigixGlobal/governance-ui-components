import React from 'react';

import Toggle from 'react-toggle-component';
import 'react-toggle-component/styles.css';

export default class DigixToggle extends React.Component {
  render() {
    return <Toggle {...this.props} />;
  }
}
