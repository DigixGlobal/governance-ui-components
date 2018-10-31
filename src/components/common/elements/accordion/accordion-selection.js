import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, Header, Content } from './styles';

export default class AccordionSelection extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

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
