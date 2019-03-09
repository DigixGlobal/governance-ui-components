import React from 'react';
import PropTypes from 'prop-types';
import Icons from '@digix/gov-ui/components/common/elements/icons/Icons';
import {
  Amount,
  AccordionItem,
  ChevronContainer,
  Content,
  Funding,
  Header,
  Title,
} from '@digix/gov-ui/components/common/elements/accordion/styles';

export default class AccordionSelection extends React.Component {
  onClickItemHandler = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClickItemHandler,
      props: { children, isOpen, label, funding, milestoneFund },
    } = this;

    const svgIcon = isOpen ? '#arrow_up' : '#arrow_down';

    let difference = '';
    if (milestoneFund) {
      const sign = milestoneFund > 0 ? `+` : `-`;
      difference = `${sign} ${Math.abs(milestoneFund)}`;
    }

    return (
      <AccordionItem>
        <Header onClick={onClickItemHandler} style={{ cursor: 'pointer' }}>
          <Title>{label}</Title>
          <Funding>
            <Amount>
              {funding}&nbsp;
              <span>{difference}</span>
              &nbsp;ETH
            </Amount>
            <ChevronContainer>
              <Icons />
              <span>
                <svg>
                  <use xlinkHref={svgIcon} />
                </svg>
              </span>
            </ChevronContainer>
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
  funding: oneOfType([number, string]).isRequired,
  milestoneFund: number,
  onClick: func.isRequired,
};

AccordionSelection.defaultProps = {
  milestoneFund: undefined,
};
