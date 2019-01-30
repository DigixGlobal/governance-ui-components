import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../elements/icons/Icons';
import { AccordionItem, Header, Content, Title, Funding, Amount } from './styles';

export default class AccordionSelection extends React.Component {
  onClickItemHandler = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClickItemHandler,
      props: { children, isOpen, label, funding, milestoneFund },
    } = this;

    // const fundingText = milestoneFund > 0 ? `${funding} + ${milestoneFund}` : funding;
    const svgIcon = isOpen ? '#arrow_up' : '#arrow_down';

    return (
      <AccordionItem>
        <Header onClick={onClickItemHandler} style={{ cursor: 'pointer' }}>
          <Title>{label}</Title>
          <Funding>
            <Amount>
              {funding} {milestoneFund > 0 && <span>+ {milestoneFund}</span>}
            </Amount>
            <div style={{ width: '18px', height: '18px' }}>
              <Icons />
              <span>
                <svg>
                  <use xlinkHref={svgIcon} />
                </svg>
              </span>
            </div>
          </Funding>
        </Header>
        {isOpen && <Content>{children}</Content>}
      </AccordionItem>
    );
  }
}

const { bool, string, func, object, node, number, oneOfType } = PropTypes;

AccordionSelection.propTypes = {
  children: oneOfType([object, node, string]).isRequired,
  isOpen: bool.isRequired,
  label: string.isRequired,
  funding: number.isRequired,
  milestoneFund: number.isRequired,
  onClick: func.isRequired,
};
