import React, { Fragment } from 'react';

import Modal from 'react-responsive-modal';

import { ApolloConsumer } from 'react-apollo';

import DigixTable from '@digix/gov-ui/components/common/blocks/digix-table';
import Icon from '@digix/gov-ui/components/common/elements/icons/';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import { searchKycQuery } from '@digix/gov-ui/api/graphql-queries/kyc';

import { KycWrapper, Heading } from './style';
import UserInfo from './user-info';

const iconStatus = [
  {
    status: 'PENDING',
    key: 'hourGlass',
  },
  { status: 'APPROVED', key: 'check' },
  { status: 'REJECTED', key: 'close' },
];

const showStatusIcon = status => {
  const icon = iconStatus.find(i => i.status === status);
  return (
    <div>
      <Icon kind={icon.key} /> {status}
    </div>
  );
};

const columns = [
  {
    Header: 'User Id',
    id: 'userUid',
    accessor: d => d.node.userUid, // String-based value accessors!
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
  // {
  //   Header: 'Last Updated',
  //   accessor: 'updated_at',
  //   Cell: props => moment(props.value).format('YYYY-MM-DD h:mm:ss a'), // Custom value accessors!
  // },
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
    };
  }

  onClose = () => {
    this.setState({ selected: undefined });
  };

  handleLoadAllUsers = client => {
    client.query({ query: searchKycQuery }).then(result => {
      this.setState({ kycUsers: result.data.searchKycs.edges, firstLoad: false });
    });
  };

  handleAllUsersClick = client => {
    this.setState({ approving: false }, () => {
      this.handleLoadAllUsers(client);
    });
  };

  handlePendingKycClick = (client, status = 'PENDING') => {
    this.setState({ approving: true }, () => {
      client.query({ query: searchKycQuery, variables: { status } }).then(result => {
        console.log(result.data.searchKycs);
        this.setState({ kycUsers: result.data.searchKycs.edges });
      });
    });
  };

  renderInfo = () => {
    const { selected, approving } = this.state;

    if (!selected) return null;
    return (
      <UserInfo
        user={selected}
        header={approving ? 'Veriy User KYC' : 'Manage User'}
        approving={approving}
      />
    );
  };

  render() {
    const { selected, selectedIndex, kycUsers, firstLoad } = this.state;

    return (
      <KycWrapper>
        <Heading>KYC Dashboard</Heading>
        <ApolloConsumer>
          {client => {
            if (firstLoad) this.handleLoadAllUsers(client);
            return (
              <Fragment>
                <Button
                  kind="round"
                  onClick={() => this.handleAllUsersClick(client)}
                  data-digix="Kyc-Admin-All-users"
                >
                  All Users
                </Button>
                <Button
                  kind="round"
                  onClick={() => this.handlePendingKycClick(client, 'PENDING')}
                  data-digix="Kyc-Admin-KYC-Requests"
                >
                  KYC Requests
                </Button>
                <Button
                  kind="round"
                  onClick={() => this.handlePendingKycClick(client, 'APPROVED')}
                  data-digix="Kyc-Admin-Approved-Requests"
                >
                  Approved KYC Requests
                </Button>
                <Button
                  kind="round"
                  onClick={() => this.handlePendingKycClick(client, 'REJECTED')}
                  data-digix="Kyc-Admin-Rejected-Requests"
                >
                  Rejected KYC Requests
                </Button>
              </Fragment>
            );
          }}
        </ApolloConsumer>
        {/* <Query query={searchKycQuery} variables={{ status: statusFilter }}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error) {
              console.log(error);
              return null;
            }
            return ( */}
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
        {/* );
          }}
        </Query> */}

        <Modal open={selected !== undefined} onClose={this.onClose}>
          {this.renderInfo()}
        </Modal>
      </KycWrapper>
    );
  }
}

export default KycOfficerDashboard;
