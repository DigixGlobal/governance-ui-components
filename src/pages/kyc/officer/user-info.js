import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Toggle from '@digix/gov-ui/components/common/elements/toggle';

import { Container, Caption, Value, ValueWrapper, UserTitle } from './style';

import { showStatusIcon } from './constants';

import ApproveKyc from './approve';
import RejectKyc from './reject';

const renderIps = ips => (
  <ul>
    {ips.map((ip, i) => (
      <li key={`${ip - i}`}>ip</li>
    ))}
  </ul>
);

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approve: false,
    };
  }

  handleChange = (value, event) => {
    this.setState({ approve: value });
  };
  render() {
    const { user, header } = this.props;
    const { approve } = this.state;
    return (
      <Container>
        <UserTitle>{`${header} ${user.firstName} ${user.lastName}`}</UserTitle>
        {user.status && (
          <ValueWrapper>
            <Caption>KYC Status</Caption>
            <Value>{showStatusIcon(user.status)}</Value>
          </ValueWrapper>
        )}
        {user.userId && (
          <ValueWrapper>
            <Caption>User ID</Caption>
            <Value>{user.userId}</Value>
          </ValueWrapper>
        )}
        {user.email !== undefined && (
          <ValueWrapper>
            <Caption>Email</Caption>
            <Value>{user.email}</Value>
          </ValueWrapper>
        )}
        {user.ethAddress !== undefined && (
          <ValueWrapper>
            <Caption>ETH Address</Caption>
            <Value>{user.ethAddress}</Value>
          </ValueWrapper>
        )}
        {user.createdAt !== undefined && (
          <ValueWrapper>
            <Caption>Created</Caption>
            <Value>{moment(user.createdAt).format('YYYY-MM-DD HH:mm')}</Value>
          </ValueWrapper>
        )}
        {user.updatedAt !== undefined && (
          <ValueWrapper>
            <Caption>Updated</Caption>
            <Value>{moment(user.updatedAt).format('YYYY-MM-DD HH:mm')}</Value>
          </ValueWrapper>
        )}
        {user.language !== undefined && (
          <ValueWrapper>
            <Caption>Language</Caption>
            <Value>{user.language}</Value>
          </ValueWrapper>
        )}
        {user.firstName !== undefined && (
          <ValueWrapper>
            <Caption>First Name</Caption>
            <Value>{user.firstName}</Value>
          </ValueWrapper>
        )}
        {user.lastName !== undefined && (
          <ValueWrapper>
            <Caption>Last Name</Caption>
            <Value>{user.lastName}</Value>
          </ValueWrapper>
        )}
        {user.gender !== undefined && (
          <ValueWrapper>
            <Caption>Gender</Caption>
            <Value>{user.gender}</Value>
          </ValueWrapper>
        )}
        {user.phoneNumber !== undefined && (
          <ValueWrapper>
            <Caption>Phone Number</Caption>
            <Value>{user.phoneNumber}</Value>
          </ValueWrapper>
        )}
        {user.birthdate !== undefined && (
          <ValueWrapper>
            <Caption>Birthday</Caption>
            <Value>{moment(user.birthdate).format('YYYY-MM-DD')}</Value>
          </ValueWrapper>
        )}
        {user.nationality !== undefined && (
          <ValueWrapper>
            <Caption>Nationality</Caption>
            <Value>{user.nationality}</Value>
          </ValueWrapper>
        )}
        {user.residenceProof && user.residenceProof.residence !== undefined && (
          <Fragment>
            <ValueWrapper>
              <Caption>Address Line 1</Caption>
              <Value>{user.residenceProof.residence.address}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>Address Line 2</Caption>
              <Value>{user.residenceProof.residence.addressDetails}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>City</Caption>
              <Value>{user.residenceProof.residence.city}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>State</Caption>
              <Value>{user.residenceProof.residence.state}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>Country of Residence</Caption>
              <Value>{user.residenceProof.residence.country}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>Postal Code</Caption>
              <Value>{user.residenceProof.residence.postalCode}</Value>
            </ValueWrapper>
          </Fragment>
        )}
        {user.employmentStatus !== undefined && (
          <ValueWrapper>
            <Caption>Employment Status</Caption>
            <Value>{user.employmentStatus}</Value>
          </ValueWrapper>
        )}
        {user.incomeRange !== undefined && (
          <ValueWrapper>
            <Caption>Income Range</Caption>
            <Value>{user.incomeRange}</Value>
          </ValueWrapper>
        )}
        {user.identificationPose && user.identificationPose.url !== undefined && (
          <Fragment>
            <ValueWrapper>
              <Caption>Webcam Proof</Caption>
              <Value>
                <img src={user.identificationPose.image.dataUrl} alt="" />
              </Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>Verification Code</Caption>
              <Value>{user.identificationPose.verificationCode}</Value>
            </ValueWrapper>
          </Fragment>
        )}
        {user.residenceProof && user.residenceProof.type !== undefined && (
          <ValueWrapper>
            <Caption>Proof of Residence Type</Caption>
            <Value>{user.residenceProof.type}</Value>
          </ValueWrapper>
        )}
        {user.residenceProof && user.residenceProof.residence !== undefined && (
          <ValueWrapper>
            <Caption>Residence Proof</Caption>
            <Value>
              <img src={user.residenceProof.image.dataUrl} alt="" />
            </Value>
          </ValueWrapper>
        )}
        {user.identificationProof && user.identificationProof.type !== undefined && (
          <Fragment>
            <ValueWrapper>
              <Caption>ID Type</Caption>
              <Value>{user.identificationProof.type}</Value>
            </ValueWrapper>

            <ValueWrapper>
              <Caption>ID Expiration Date</Caption>
              <Value>
                {moment(user.identificationProof.expirationDate).format('YYYY-MM-DD HH:mm')}
              </Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>ID Number</Caption>
              <Value>{user.identificationProof.number}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Caption>ID Proof</Caption>
              <Value>
                <img src={user.identificationProof.image.dataUrl} alt="" />
              </Value>
            </ValueWrapper>
          </Fragment>
        )}
        {user.ipAddresses && user.ipAddresses.length > 0 && (
          <ValueWrapper>
            <Caption>IP Addresses Used</Caption>
            <Value>{renderIps(user.ipAddresses)}</Value>
          </ValueWrapper>
        )}

        {user.status === 'PENDING' && (
          <Fragment>
            <ValueWrapper>
              <Caption>Approve/Reject</Caption>
              <Value>
                <Toggle
                  name="kycAction"
                  data-digix="KycAction"
                  mode="select"
                  labelRight="Approve KYC"
                  checked={this.state.approve}
                  label="Reject KYC"
                  onToggle={this.handleChange}
                />
              </Value>
            </ValueWrapper>
            {approve && <ApproveKyc kycId={user.id} onCompleted={this.props.onCompleted} />}
            {approve === false && (
              <RejectKyc kycId={user.id} onCompleted={this.props.onCompleted} />
            )}
          </Fragment>
        )}
      </Container>
    );
  }
}
const { object, string, func } = PropTypes;

UserInfo.propTypes = {
  user: object.isRequired,
  header: string.isRequired,
  onCompleted: func.isRequired,
};

export default UserInfo;
