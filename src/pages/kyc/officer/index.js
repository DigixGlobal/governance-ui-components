import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-responsive-modal';

import { ApolloConsumer, Query } from 'react-apollo';

import DigixTable from '@digix/gov-ui/components/common/blocks/digix-table';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';

import { searchKycQuery } from '@digix/gov-ui/api/graphql-queries/kyc';

import { KycWrapper, Heading } from './style';
import UserInfo from './user-info';

import { showStatusIcon } from './constants';

const columns = [
  {
    Header: 'User Id',
    id: 'userUid',
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
      approving: false,
      kycUsers: [],
      firstLoad: true,
      filter: 'All',
      reloading: false,
    };
  }

  onClose = message => {
    this.setState({ selected: undefined, reloading: true }, () => {
      if (message) {
        this.props.showHideAlert({ message });
      }
    });
  };

  handleLoadAllUsers = client => {
    client.query({ query: searchKycQuery }).then(result => {
      this.setState({ kycUsers: result.data.searchKycs.edges, firstLoad: false, filter: 'All' });
    });
  };

  handleAllUsersClick = client => {
    this.setState({ approving: false }, () => {
      this.handleLoadAllUsers(client);
    });
  };

  handleRefetch = refetch => {
    if (refetch) {
      console.log('refetching');
      refetch();
    }
  };

  handleListKycByStatus = (client, status = 'PENDING') => {
    console.log({ status });
    this.setState({ approving: status === 'PENDING', filter: status, reloading: false }, () => {
      client.query({ query: searchKycQuery, variables: { status } }).then(result => {
        console.log(result);
        this.setState({ kycUsers: result.data.searchKycs.edges });
      });
    });
  };

  renderInfo = () => {
    const { selected, approving } = this.state;

    if (!selected) return null;
    return (
      <UserInfo
        user={selected.node}
        header={approving ? 'Veriy User KYC' : 'Manage User'}
        onCompleted={this.onClose}
      />
    );
  };

  render() {
    const { selected, selectedIndex, kycUsers, firstLoad, filter, reloading } = this.state;

    return (
      <KycWrapper>
        <Heading>KYC Dashboard</Heading>
        <Query
          query={searchKycQuery}
          fetchPolicy="network-only"
          variables={{ page: 1, pageSize: 2, status: filter === 'All' ? undefined : filter }}
          // pollInterval={1000}
        >
          {({ client }) => {
            if (firstLoad) this.handleLoadAllUsers(client);
            if (reloading)
              this.handleListKycByStatus(client, filter === 'All' ? undefined : filter);
            return (
              <Fragment>
                <Button
                  kind="round"
                  onClick={() => this.handleAllUsersClick(client)}
                  data-digix="Kyc-Admin-All-users"
                  active={filter === 'All'}
                >
                  All Users
                </Button>
                <Button
                  kind="round"
                  onClick={() => this.handleListKycByStatus(client, 'PENDING')}
                  data-digix="Kyc-Admin-KYC-Requests"
                  active={filter === 'PENDING'}
                >
                  KYC Requests
                </Button>
                <Button
                  kind="round"
                  onClick={() => this.handleListKycByStatus(client, 'APPROVED')}
                  data-digix="Kyc-Admin-Approved-Requests"
                  active={filter === 'APPROVED'}
                >
                  Approved KYC Requests
                </Button>
                <Button
                  kind="round"
                  onClick={() => this.handleListKycByStatus(client, 'REJECTED')}
                  data-digix="Kyc-Admin-Rejected-Requests"
                  active={filter === 'REJECTED'}
                >
                  Rejected KYC Requests
                </Button>
              </Fragment>
            );
          }}
        </Query>
        <h3>Showing {filter || 'All'} KYC</h3>
        <br />
        <DigixTable
          data={kycUsers}
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
                  backgroundColor: rowInfo.index === selectedIndex ? '#f2f2f2' : 'white',
                  cursor: 'pointer',
                },
              };
            }
            return {};
          }}
        />

        <Modal open={selected !== undefined} onClose={() => this.onClose()}>
          {this.renderInfo()}
        </Modal>
      </KycWrapper>
    );
  }
}

const { func } = PropTypes;

KycOfficerDashboard.propTypes = {
  showHideAlert: func.isRequired,
};
export default connect(
  null,
  {
    showHideAlert,
  }
)(KycOfficerDashboard);
