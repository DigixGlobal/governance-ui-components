import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import Icons from '@digix/gov-ui/components/common/elements/icons/Icons';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
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
      props: { children, isOpen, label, milestoneFund },
    } = this;

    const funding = truncateNumber(this.props.funding);
    const svgIcon = isOpen ? '#arrow_up' : '#arrow_down';

    let difference = '';
    if (milestoneFund) {
      const sign = milestoneFund > 0 ? `+` : `-`;
      difference = truncateNumber(Math.abs(milestoneFund));
      difference = `${sign} ${difference}`;
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
        {isOpen && (
          <Content>
            <Markdown source={children} escapeHtml={false} />
          </Content>
        )}
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
