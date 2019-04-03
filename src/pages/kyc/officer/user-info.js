import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-responsive-modal';

import ApproveKyc from '@digix/gov-ui/pages/kyc/officer/approve';
import RejectKyc from '@digix/gov-ui/pages/kyc/officer/reject';
import Toggle from '@digix/gov-ui/components/common/elements/toggle';
import { showStatusIcon } from '@digix/gov-ui/pages/kyc/officer/constants';
import Icon from '@digix/gov-ui/components/common/elements/icons';

import {
  Container,
  Caption,
  FieldImg,
  Value,
  ValueWrapper,
  UserTitle,
  CloseButton,
} from '@digix/gov-ui/pages/kyc/officer/style';

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
      selectedImage: undefined,
    };
  }

  showHideImage = source => () => {
    this.setState({ selectedImage: source });
  };

  handleChange = value => {
    this.setState({ approve: value });
  };

  render() {
    const { user, header } = this.props;
    const { approve, selectedImage } = this.state;
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
        {user.identificationPose && user.identificationPose.image.dataUrl !== undefined && (
          <Fragment>
            <ValueWrapper>
              <Caption>Webcam Proof</Caption>
              <Value>
                <FieldImg
                  src={user.identificationPose.image.dataUrl}
                  alt=""
                  onClick={this.showHideImage(user.identificationPose.image.dataUrl)}
                />
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
              <FieldImg
                src={user.residenceProof.image.dataUrl}
                alt=""
                onClick={this.showHideImage(user.residenceProof.image.dataUrl)}
              />
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
                <FieldImg
                  src={user.identificationProof.image.dataUrl}
                  alt=""
                  onClick={this.showHideImage(user.identificationProof.image.dataUrl)}
                />
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
        <Modal open={selectedImage} showCloseIcon onClose={this.showHideImage()} center>
          <div>
            <img alt="" style={{ width: '100%' }} src={selectedImage} />
            <CloseButton onClick={this.showHideImage()} style={{ boxShadow: 'none' }}>
              <Icon kind="close" style={{ marginRight: 0 }} />
            </CloseButton>
          </div>
        </Modal>
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
