import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../elements/icons/Icons';
import { AccordionItem, Header, Content } from './styles';

export default class AccordionSelection extends React.Component {
  onClickItemHandler = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClickItemHandler,
      props: { children, isOpen, label },
    } = this;

    const svgIcon = isOpen ? '#arrow_up' : '#arrow_down';

    return (
      <AccordionItem>
        <Header onClick={onClickItemHandler} style={{ cursor: 'pointer' }}>
          {label}
          <div style={{ float: 'right', width: '18px', height: '18px' }}>
            <Icons />
            <span>
              <svg>
                <use xlinkHref={svgIcon} />
              </svg>
            </span>
          </div>
        </Header>
        {isOpen && <Content>{children}</Content>}
      </AccordionItem>
    );
  }
}

const { bool, string, func, object, node, oneOfType } = PropTypes;

AccordionSelection.propTypes = {
  children: oneOfType([object, node, string]).isRequired,
  isOpen: bool.isRequired,
  label: string.isRequired,
  onClick: func.isRequired,
};
