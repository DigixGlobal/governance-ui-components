import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import { ApolloConsumer } from 'react-apollo';

import DigixTable from '@digix/gov-ui/components/common/blocks/digix-table';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';

import { searchKycQuery } from '@digix/gov-ui/api/graphql-queries/kyc-officer';

import UserInfo from '@digix/gov-ui/pages/kyc/officer/user-info';
import { showStatusIcon } from '@digix/gov-ui/pages/kyc/officer/constants';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';

import { KycWrapper, Title, CTAContainer, TabButton } from '@digix/gov-ui/pages/kyc/officer/style';

const columns = [
  {
    Header: 'User Id',
    id: 'id',
    accessor: d => d.node.userId, // String-based value accessors!
  },
  {
    Header: 'Status',
    id: 'status',
    accessor: d => showStatusIcon(d.node.status),
  },
  {
    Header: 'Name',
    id: 'Name', // Required because our accessor is not a string
    accessor: d => `${d.node.firstName} ${d.node.lastName}`, // Custom value accessors!
  },
  {
    Header: 'Country of Residence', // Required because our accessor is not a string
    id: 'residence',
    accessor: d => d.node.residenceProof.residence.country,
  },
  {
    Header: 'Nationality', // Required because our accessor is not a string
    id: 'nationality',
    accessor: d => d.node.nationality, // Custom value accessors!
  },
  {
    Header: 'Last Updated',
    id: 'lastupdated',
    accessor: d => moment(d.node.updaedAt).format('YYYY-MM-DD h:mm:ss a'),
  },
];
class KycOfficerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedIndex: 0,
      filter: 'All',
    };
  }

  onClose = message => {
    this.setState({ selected: undefined }, () => {
      if (message) {
        this.props.showHideAlert({ message });
      }
    });
  };

  handleLoadAllUsers = client => {
    client.query({ query: searchKycQuery }).then(result => {
      this.setState({ data: result.data });
    });
  };

  handleListKycByStatus = (status = 'PENDING', client) => () => {
    client.query({ query: searchKycQuery, variables: { status } }).then(result => {
      this.setState({ data: result.data, filter: status });
    });
  };

  renderInfo = () => {
    const { selected } = this.state;

    if (!selected) return null;
    return (
      <UserInfo
        user={selected.node}
        header={selected.node.status === 'PENDING' ? 'User Verification - ' : 'User Detail - '}
        onCompleted={this.onClose}
      />
    );
  };

  render() {
    const { selected, selectedIndex, filter, data } = this.state;
    const { userData, history } = this.props;
    if (!userData || (userData && !userData.isKycOfficer)) history.push('/');

    return (
      <Fragment>
        <ApolloConsumer>
          {client => {
            if (!data) this.handleLoadAllUsers(client);
            return (
              <KycWrapper>
                <Title>KYC Dashboard</Title>
                <CTAContainer>
                  <TabButton
                    kind="round"
                    large
                    onClick={this.handleListKycByStatus(undefined, client)}
                    data-digix="Kyc-Admin-All-users"
                    active={filter === 'All'}
                  >
                    All Users
                  </TabButton>
                  <TabButton
                    kind="round"
                    large
                    onClick={this.handleListKycByStatus('PENDING', client)}
                    data-digix="Kyc-Admin-KYC-Requests"
                    active={filter === 'PENDING'}
                  >
                    KYC Requests
                  </TabButton>
                  <TabButton
                    kind="round"
                    large
                    onClick={this.handleListKycByStatus('APPROVED', client)}
                    data-digix="Kyc-Admin-Approved-Requests"
                    active={filter === 'APPROVED'}
                  >
                    Approved KYC Requests
                  </TabButton>
                  <TabButton
                    kind="round"
                    large
                    onClick={this.handleListKycByStatus('REJECTED', client)}
                    data-digix="Kyc-Admin-Rejected-Requests"
                    active={filter === 'REJECTED'}
                  >
                    Rejected KYC Requests
                  </TabButton>
                </CTAContainer>

                <Modal open={selected !== undefined} onClose={() => this.onClose()}>
                  {this.renderInfo()}
                </Modal>
              </KycWrapper>
            );
          }}
        </ApolloConsumer>
        {data && (
          <DigixTable
            data={data.searchKycs.edges}
            columns={columns}
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                return {
                  onClick: () => {
                    this.setState({
                      selected: rowInfo.original,
                      selectedIndex: rowInfo.index,
                    });
                  },
                  style: {
                    backgroundColor: rowInfo.index === selectedIndex ? '#f2f2f2' : '#fff',
                    cursor: 'pointer',
                  },
                };
              }
              return {};
            }}
          />
        )}
      </Fragment>
    );
  }
}

const { func, object } = PropTypes;

KycOfficerDashboard.propTypes = {
  showHideAlert: func.isRequired,
  history: object.isRequired,
  userData: object.isRequired,
};

export default withFetchUser(
  connect(
    null,
    {
      showHideAlert,
    }
  )(KycOfficerDashboard)
);
