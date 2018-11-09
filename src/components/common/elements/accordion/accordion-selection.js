import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, Header, Content } from './styles';

export default class AccordionSelection extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <AccordionItem>
        <Header onClick={onClick} style={{ cursor: 'pointer' }}>
          {label}
          <i />
        </Header>
        {isOpen && <Content>{this.props.children}</Content>}
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
