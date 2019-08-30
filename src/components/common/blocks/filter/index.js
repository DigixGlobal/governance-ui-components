import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import Category from '@digix/gov-ui/components/common/blocks/filter/category.js';
import ErrorMessageOverlay from '@digix/gov-ui/components/common/blocks/overlay/error-message';
import LogDashboard from '@digix/gov-ui/analytics/dashboard';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button, Icon, Select } from '@digix/gov-ui/components/common/elements/index';
import { fetchProposalList } from '@digix/gov-ui/api/graphql-queries/proposal';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { getUnmetProposalRequirements } from '@digix/gov-ui/utils/helpers';
import { H1 } from '@digix/gov-ui/components/common/common-styles';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { ProposalErrors } from '@digix/gov-ui/constants';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import {
  Heading,
  Filter,
  FilterWrapper,
  SortBy,
  Actionable,
  Pulldown,
} from '@digix/gov-ui/components/common/blocks/filter/style';

const network = SpectrumConfig.defaultNetworks[0];

class ProposalCardFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      showActionable: false,
      stage: 'all',
    };
  }

  componentDidMount = () => {
    const { translations } = this.props;
    if (translations.data) {
      const {
        data: {
          dashboard: { sortOptions },
        },
      } = translations;
      const options = Object.keys(sortOptions);
      const filters = options.map(o => ({ text: sortOptions[o], value: o }));
      this.setState({ filters });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { translations } = nextProps;
    if (translations.data) {
      const {
        data: {
          dashboard: { sortOptions },
        },
      } = translations;
      const options = Object.keys(sortOptions);

      const filters = options.map(o => ({ text: sortOptions[o], value: o }));
      this.setState({ filters });
    }
  };

  getEthBalance() {
    const { AddressDetails, web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    return web3.eth
      .getBalance(AddressDetails.data.address)
      .then(balance => parseBigNumber(balance, 18, false));
  }

  getActionableProposals = (stage, onlyActionable) => {
    const apollo = this.props.client;
    apollo
      .query({
        fetchPolicy: 'network-only',
        query: fetchProposalList,
        variables: { stage, onlyActionable },
      })
      .then(result => {
        const proposals = result.data.fetchProposals;
        this.props.setProposalList(proposals);
      });
  };

  getUnmetCreateRequirements = () => {
    const { DaoDetails, client, translations } = this.props;
    const dataCalls = [
      getUnmetProposalRequirements(client, DaoDetails, translations.data),
      this.props.getDaoConfig(),
      this.getEthBalance(),
    ];

    return Promise.all(dataCalls).then(([errors, config, ethBalance]) => {
      const requiredCollateral = Number(this.props.DaoConfig.CONFIG_PREPROPOSAL_COLLATERAL);
      if (ethBalance < requiredCollateral) {
        errors.push(ProposalErrors.insufficientCollateral(requiredCollateral));
      }

      return errors;
    });
  };

  setShowActionableItems = showActionable => {
    this.setState({ showActionable });
  };

  setStage = stage => {
    this.setState({ stage });
  };

  changeFilter = e => {
    const { onOrderChange } = this.props;
    const filter = e.target.value;

    if (onOrderChange) {
      LogDashboard.filterProject(filter);
      onOrderChange(filter);
    }
  };

  redirectToCreateProposal() {
    this.getUnmetCreateRequirements().then(errors => {
      if (errors.length) {
        this.showErrorOverlay(errors);
      } else {
        this.props.history.push('/proposals/create');
      }
    });
  }

  showErrorOverlay(errors) {
    const {
      data: {
        common: { proposalErrors },
      },
    } = this.props.translations;
    this.props.showRightPanel({
      component: (
        <ErrorMessageOverlay
          errors={errors}
          location={proposalErrors.returnToDashboard}
          translations={this.props.translations.data}
        />
      ),
      show: true,
    });
  }

  toggleActionableItems = e => {
    const { stage } = this.state;
    const showActionable = !!e.target.checked;
    LogDashboard.toggleActionableProjects(stage, showActionable);
    this.setState({ showActionable });
    this.getActionableProposals(stage, showActionable);
  };

  render() {
    const { AddressDetails, ChallengeProof, setProposalList, translations } = this.props;
    const { filters } = this.state;

    const hasLoadedWallet = !!ChallengeProof.data;
    const canCreate = AddressDetails && AddressDetails.data.isParticipant;
    const showActionableItems = this.state.showActionable ? 'checked' : '';

    const {
      data: { dashboard, project },
    } = translations;

    return (
      <FilterWrapper>
        <Heading>
          <H1>{dashboard.title}</H1>
          {canCreate && (
            <Button
              primary
              large
              showIcon
              onClick={() => this.redirectToCreateProposal()}
              data-digix="Proposal-Create-Btn"
            >
              <Icon kind="plus" />
              {dashboard.createButton}
            </Button>
          )}
        </Heading>
        <Filter>
          <Category
            {...this.props}
            setShowActionableItems={this.setShowActionableItems}
            setStage={this.setStage}
            setProposalList={setProposalList}
            translations={translations}
          />
          <SortBy>
            {hasLoadedWallet && (
              <Actionable>
                <input
                  type="checkbox"
                  id="actionable-checkbox"
                  defaultChecked={false}
                  checked={showActionableItems}
                  data-digix="TOGGLE-ACTIONABLE-ITEMS"
                  onChange={e => this.toggleActionableItems(e)}
                />
                <label htmlFor="actionable-checkbox" data-digix="">
                  {project.showActionable}
                </label>
              </Actionable>
            )}
            <Pulldown>
              <span>SORT BY</span>
              <Select
                simple
                small
                id="sortBy"
                data-digix="SORT-BY"
                items={filters}
                onChange={this.changeFilter}
              />
            </Pulldown>
          </SortBy>
        </Filter>
      </FilterWrapper>
    );
  }
}

const { func, object } = PropTypes;

ProposalCardFilter.propTypes = {
  AddressDetails: object.isRequired,
  ChallengeProof: object.isRequired,
  client: object.isRequired,
  DaoConfig: object.isRequired,
  DaoDetails: object.isRequired,
  getDaoConfig: func.isRequired,
  history: object.isRequired,
  onOrderChange: func.isRequired,
  showRightPanel: func.isRequired,
  setProposalList: func.isRequired,
  translations: object.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = ({ daoServer, infoServer }) => ({
  ChallengeProof: daoServer.ChallengeProof,
  DaoConfig: infoServer.DaoConfig.data,
  DaoDetails: infoServer.DaoDetails.data,
});

export default withApollo(
  web3Connect(
    connect(
      mapStateToProps,
      {
        getDaoConfig,
        showRightPanel,
      }
    )(ProposalCardFilter)
  )
);
