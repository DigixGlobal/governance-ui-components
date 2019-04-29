import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import { Query } from 'react-apollo';

import DigixTable from '@digix/gov-ui/components/common/blocks/digix-table';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';

import { searchKycQuery } from '@digix/gov-ui/api/graphql-queries/kyc-officer';

import UserInfo from '@digix/gov-ui/pages/kyc/officer/user-info';
import { showStatusIcon } from '@digix/gov-ui/pages/kyc/officer/constants';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';

import { KycWrapper, Title, CTAContainer, TabButton } from '@digix/gov-ui/pages/kyc/officer/style';

import Spinner from '@digix/gov-ui/components/common/blocks/loader/spinner';

const columns = [
  {
    Header: 'User Id',
    id: 'USER_ID',
    accessor: d => d.node.userId,
    sortable: false,
    filterable: false,
  },
  {
    Header: 'Status',
    id: 'STATUS',
    accessor: d => showStatusIcon(d.node.status),
  },
  {
    Header: 'Name',
    id: 'NAME',
    accessor: d => `${d.node.firstName} ${d.node.lastName}`, // Custom value accessors!
  },
  {
    Header: 'Country of Residence',
    id: 'COUNTRY_OF_RESIDENCE',
    accessor: d => d.node.residenceProof.residence.country,
  },
  {
    Header: 'Nationality',
    id: 'NATIONALITY',
    accessor: d => d.node.nationality,
  },
  {
    Header: 'Last Updated',
    id: 'LAST_UPDATED',
    accessor: d => moment(d.node.updatedAt).format('YYYY-MM-DD h:mm:ss a'),
  },
];
class KycOfficerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedIndex: 0,
      filter: 'All',
      reloading: false,
      page: 1,
      pageSize: 10,
      customLoading: false,
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
      this.setState({ filter: 'All' });
    });
  };

  handleAllUsersClick = () => {
    this.setState({ filter: undefined });
  };

  handleListKycByStatus = (status = 'PENDING') => {
    this.setState({ filter: status, reloading: false });
  };

  handleFetch = (loading, onFetchData, page, pageSize) => {
    this.setState({ customLoading: loading, page, pageSize }, () =>
      onFetchData({ page: Number(page), pageSize: Number(pageSize) })
    );
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
    const {
      selected,
      selectedIndex,
      filter,
      reloading,
      page,
      pageSize,
      customLoading,
    } = this.state;
    const { userData, history } = this.props;
    if (!userData || (userData && !userData.isKycOfficer)) history.push('/');
    return (
      <KycWrapper>
        <Title>KYC Dashboard</Title>
        <CTAContainer>
          <TabButton
            large
            onClick={this.handleAllUsersClick}
            data-digix="Kyc-Admin-All-users"
            active={filter === 'All'}
          >
            All Users
          </TabButton>
          <TabButton
            large
            onClick={() => this.handleListKycByStatus('PENDING')}
            data-digix="Kyc-Admin-KYC-Requests"
            active={filter === 'PENDING'}
          >
            KYC Requests
          </TabButton>
          <TabButton
            large
            onClick={() => this.handleListKycByStatus('APPROVING')}
            data-digix="Kyc-Admin-Appriving-Requests"
            active={filter === 'APPROVING'}
          >
            Pending Confirmation
          </TabButton>
          <TabButton
            large
            onClick={() => this.handleListKycByStatus('APPROVED')}
            data-digix="Kyc-Admin-Approved-Requests"
            active={filter === 'APPROVED'}
          >
            Approved KYC Requests
          </TabButton>
          <TabButton
            large
            onClick={() => this.handleListKycByStatus('REJECTED')}
            data-digix="Kyc-Admin-Rejected-Requests"
            active={filter === 'REJECTED'}
          >
            Rejected KYC Requests
          </TabButton>
        </CTAContainer>
        <Query
          query={searchKycQuery}
          fetchPolicy="network-only"
          variables={{
            status: filter === 'All' ? undefined : filter,
            page,
            pageSize,
            sort: 'LAST_UPDATED',
            sortBy: 'DESC',
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) {
              return (
                <Spinner
                  translations={{
                    project: {
                      spinner: {
                        pleaseWait: 'Please wait....',
                        hold: 'Getting KYC data',
                      },
                    },
                  }}
                  height="100%"
                />
              );
            }

            if (error) {
              return null;
            }
            if (reloading) refetch();

            const { totalCount, totalPage, edges: rows } = data.searchKycs;
            return (
              <Fragment>
                <DigixTable
                  data={rows}
                  columns={columns}
                  loading={loading || customLoading}
                  manual
                  totalRows={totalCount}
                  currentPage={page}
                  page={page}
                  defaultPageSize={pageSize}
                  pages={totalPage}
                  showPagination
                  handleLoading={this.handleFetch}
                  fetchData={refetch}
                  onSortedChange={newSorted => {
                    refetch({
                      page,
                      pageSize,
                      sort: newSorted[0].id,
                      sortBy: newSorted[0].desc ? 'DESC' : 'ASC',
                    });
                  }}
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
              </Fragment>
            );
          }}
        </Query>
        <Modal open={selected !== undefined} onClose={() => this.onClose()}>
          {this.renderInfo()}
        </Modal>
      </KycWrapper>
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
