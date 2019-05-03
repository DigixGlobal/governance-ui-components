/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';

import { TooltipBox, Bubble, Trigger } from './style';

class ToolTip extends React.Component {
  state = {
    displayTooltip: false,
  };

  hideTooltip = () => {
    this.setState({ displayTooltip: false });
  };

  showTooltip = () => {
    this.setState({ displayTooltip: true });
  };

  render() {
    const { displayTooltip } = this.state;
    const { title, content, children } = this.props;

    return (
      <TooltipBox onMouseLeave={() => this.hideTooltip()}>
        <Trigger
          onMouseOver={() => this.showTooltip()}
          onFocus={() => this.showTooltip()}
        >
          {children}
        </Trigger>

        {displayTooltip && (
          <Bubble>
            <h6>{title}</h6>
            <p>{content}</p>
          </Bubble>
        )}
      </TooltipBox>
    );
  }
}

const { string, oneOfType, object } = PropTypes;

ToolTip.propTypes = {
  title: string.isRequired,
  content: string.isRequired,
  children: oneOfType([object, string]).isRequired,
};

ToolTip.defaultProps = {};

export default ToolTip;
