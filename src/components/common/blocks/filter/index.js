import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import Category from '@digix/gov-ui/components/common/blocks/filter/category.js';
import ErrorMessageOverlay from '@digix/gov-ui/components/common/blocks/overlay/error-message';
import { Button, Icon, Select } from '@digix/gov-ui/components/common/elements/index';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
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
  Pulldown,
} from '@digix/gov-ui/components/common/blocks/filter/style';

const network = SpectrumConfig.defaultNetworks[0];

class ProposalCardFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
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

  handleChange = e => {
    const { onOrderChange } = this.props;
    if (onOrderChange) {
      onOrderChange(e.target.value);
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

  render() {
    const { AddressDetails, translations } = this.props;
    const { filters } = this.state;
    const canCreate = AddressDetails && AddressDetails.data.isParticipant;
    const {
      data: { dashboard },
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
          <Category {...this.props} translations={translations} />
          <Pulldown>
            <Select
              small
              id="sortBy"
              data-digix="SORT-BY"
              items={filters}
              onChange={this.handleChange}
            />
          </Pulldown>
        </Filter>
      </FilterWrapper>
    );
  }
}

const { func, object } = PropTypes;

ProposalCardFilter.propTypes = {
  AddressDetails: object.isRequired,
  client: object.isRequired,
  DaoConfig: object.isRequired,
  DaoDetails: object.isRequired,
  getDaoConfig: func.isRequired,
  history: object.isRequired,
  onOrderChange: func.isRequired,
  showRightPanel: func.isRequired,
  web3Redux: object.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = ({ infoServer }) => ({
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
