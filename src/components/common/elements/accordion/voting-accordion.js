import React from 'react';
import PropTypes from 'prop-types';

import Icons from '@digix/gov-ui/components/common/elements/icons/Icons';

import VotingResult from './voting-result';
import { Wrapper, AccordionItem, Header, Content, Title, Funding } from './styles';

class VotingAccordion extends React.PureComponent {
  state = {
    selectedIndex: -1,
    accordionItems: [],
  };

  onClickItemHandler = index => {
    const { accordionItems } = this.state;
    const acc = accordionItems.find(a => a.id === index);
    if (!acc) {
      accordionItems.push({ id: index, open: true });
    } else {
      acc.open = !acc.open;
    }
    this.setState({
      accordionItems: [...accordionItems],
      selectedIndex: index,
    });
  };

  renderAccordionItem = (item, i) => {
    const { selectedIndex, accordionItems } = this.state;
    const { translations } = this.props;
    const acc = accordionItems.find(a => a.id === selectedIndex);
    const deadline = item.voting.votingDeadline
      ? item.voting.votingDeadline
      : item.voting.revealDeadline;
    if (Date.now() < new Date(deadline * 1000)) return null;
    const show = acc && acc.open && i === selectedIndex;
    const svgIcon = show ? '#arrow_up' : '#arrow_down';
    return (
      <AccordionItem voting key={i}>
        <Header onClick={() => this.onClickItemHandler(i)}>
          <Title uppercase data-digix="Voting-Title">
            {item.title}
          </Title>
          <Funding>
            <div style={{ width: '18px', height: '18px' }}>
              <Icons />
              <span>
                <svg data-digix="Voting-Arrow-Icon">
                  <use xlinkHref={svgIcon} />
                </svg>
              </span>
            </div>
          </Funding>
        </Header>
        {show && (
          <Content data-digix="Voting-Content">
            <VotingResult voting={item.voting} daoInfo={item.daoInfo} translations={translations} />
          </Content>
        )}
      </AccordionItem>
    );
  };
  render() {
    const { votingResults } = this.props;
    const ProposalVotingResult = votingResults.map((item, i) => this.renderAccordionItem(item, i));

    return votingResults.length > 0 && <Wrapper>{ProposalVotingResult}</Wrapper>;
  }
}

const { array, object } = PropTypes;

VotingAccordion.propTypes = {
  votingResults: array.isRequired,
  translations: object.isRequired,
};

export default VotingAccordion;
