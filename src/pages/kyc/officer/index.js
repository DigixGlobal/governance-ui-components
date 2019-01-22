import React from 'react';

import moment from 'moment';
import Modal from 'react-responsive-modal';

import DigixTable from '@digix/gov-ui/components/common/blocks/digix-table';
import Icon from '@digix/gov-ui/components/common/elements/icons/';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import { KycWrapper, Heading } from './style';

import UserInfo from './user-info';

const tempData = [
  {
    id: 1,
    email: 'digixtemail+1544061770@gmail.com',
    birthday: '1990-01-01T08:00:00.000+08:00',
    approved: true,
    first_name: 'safwef',
    last_name: 'name',
    address_line_one: 'balhj',
    address_line_two: 'Costa Del Sol Bayshore Road',
    city: 'Singapore',
    state: 'Singapore',
    country: 200,
    postal_code: '111111',
    sex: 1,
    phone_number: '+65-1111111',
    identification_type: 2,
    identification_number: null,
    identification_expiration: '2020-03-23T16:00:00.000+08:00',
    residence_proof_type: 2,
    identification_proof_file_name: '20180323_120341.jpg',
    identification_proof_content_type: 'image/jpeg',
    identification_proof_file_size: 36929,
    identification_proof_updated_at: '2018-03-23T20:06:36.000+08:00',
    residence_proof_file_name: 'file.jpeg',
    residence_proof_content_type: 'image/jpeg',
    residence_proof_file_size: 45731,
    residence_proof_updated_at: '2018-03-23T20:06:36.000+08:00',
    identification_pose_file_name: 'webcam.jpg',
    identification_pose_content_type: 'image/jpeg',
    identification_pose_file_size: 74616,
    identification_pose_updated_at: '2018-03-23T20:06:36.000+08:00',
    user_id: 6,
    created_at: '2018-03-23T20:06:37.000+08:00',
    updated_at: '2018-12-12T10:22:26.000+08:00',
    language: 1,
    nationality: 200,
    employment_status: 1,
    source_of_funds: 1,
    income_range: 1,
    verification_code: '1234123-fe-8d',
    id_issue_date: '1995-01-24T00:50:24.000+08:00',
    id_expiration_date: null,
    user_input_id_number: 'CHECK_DOCUMENT',
    committed: true,
    identification_proof_url: 'blahblahurl/image.jpg',
    residence_proof_url: 'blahblahurl/image.jpg',
    identification_pose_url: 'blahblahurl/image.jpg',
    identification_proof_url_thumbnail: 'blahblahurl/image.jpg',
    residence_proof_url_thumbnail: 'blahblahurl/image.jpg',
    identification_pose_url_thumbnail: 'blahblahurl/image.jpg',
  },
];

const columns = [
  {
    Header: 'User Id',
    accessor: 'id', // String-based value accessors!
  },
  {
    Header: 'Approved',
    accessor: 'approved',
    Cell: props => <Icon kind={props.value ? 'check' : 'XMark'} />, // eslint-disable-line
  },
  {
    id: 'Name', // Required because our accessor is not a string
    Header: 'Name',
    accessor: d => `${d.first_name} ${d.last_name}`, // Custom value accessors!
  },
  {
    Header: 'Residence', // Required because our accessor is not a string
    accessor: 'country', // Custom value accessors!
  },
  {
    Header: 'Nationality', // Required because our accessor is not a string
    accessor: 'nationality', // Custom value accessors!
  },
  {
    Header: 'Last Updated',
    accessor: 'updated_at',
    Cell: props => moment(props.value).format('YYYY-MM-DD h:mm:ss a'), // Custom value accessors!
  },
];
class KycOfficerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedIndex: 0,
      approving: false,
    };
  }

  onClose = () => {
    this.setState({ selected: undefined });
  };

  handleAllUsersClick = () => {
    this.setState({ approving: false });
  };

  handlePendingKycClick = () => {
    this.setState({ approving: true });
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
    const { selected, selectedIndex } = this.state;

    return (
      <KycWrapper>
        <Heading>KYC Dashboard</Heading>
        <Button kind="round" onClick={this.handleAllUsersClick} data-digix="Kyc-Admin-All-users">
          All Users
        </Button>
        <Button kind="round" onClick={this.handlePendingKycClick} data-digix="Kyc-Admin-All-users">
          KYC Requests
        </Button>
        <DigixTable
          data={tempData}
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
        <Modal open={selected !== undefined} onClose={this.onClose}>
          {this.renderInfo()}
        </Modal>
      </KycWrapper>
    );
  }
}

export default KycOfficerDashboard;
