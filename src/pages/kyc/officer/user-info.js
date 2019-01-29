import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Icon from '@digix/gov-ui/components/common/elements/icons/';

import { Container, Caption, Value, ValueWrapper } from './style';

const UserInfo = props => {
  const { user, header, approving } = props;
  return (
    <Container>
      <h3>{`${header} ${user.first_name} ${user.last_name}`}</h3>
      <br />
      {user.approved && (
        <ValueWrapper>
          <Caption>Approved</Caption>
          <Value>
            <Icon kind={user.approved ? 'check' : 'XMark'} />
          </Value>
        </ValueWrapper>
      )}

      {user.user_id && (
        <ValueWrapper>
          <Caption>User ID</Caption>
          <Value>{user.user_id}</Value>
        </ValueWrapper>
      )}
      {user.email !== undefined && (
        <ValueWrapper>
          <Caption>Email</Caption>
          <Value>{user.email}</Value>
        </ValueWrapper>
      )}

      {user.created_at !== undefined && (
        <ValueWrapper>
          <Caption>Created</Caption>
          <Value>{moment(user.created_at).format('YYYY-MM-DD HH:mm')}</Value>
        </ValueWrapper>
      )}
      {user.updated_at !== undefined && (
        <ValueWrapper>
          <Caption>Updated</Caption>
          <Value>{moment(user.updated_at).format('YYYY-MM-DD HH:mm')}</Value>
        </ValueWrapper>
      )}
      {user.language !== undefined && (
        <ValueWrapper>
          <Caption>Language</Caption>
          <Value>{user.language}</Value>
        </ValueWrapper>
      )}
      {user.first_name !== undefined && (
        <ValueWrapper>
          <Caption>First Name</Caption>
          <Value>{user.first_name}</Value>
        </ValueWrapper>
      )}
      {user.last_name !== undefined && (
        <ValueWrapper>
          <Caption>Last Name</Caption>
          <Value>{user.last_name}</Value>
        </ValueWrapper>
      )}
      {user.sex !== undefined && (
        <ValueWrapper>
          <Caption>Gender</Caption>
          <Value>{user.sex}</Value>
        </ValueWrapper>
      )}
      {user.phone_number !== undefined && (
        <ValueWrapper>
          <Caption>Phone Number</Caption>
          <Value>{user.phone_number}</Value>
        </ValueWrapper>
      )}
      {user.birthday !== undefined && (
        <ValueWrapper>
          <Caption>Birthday</Caption>
          <Value>{moment(user.birthday).format('YYYY-MM-DD')}</Value>
        </ValueWrapper>
      )}
      {user.nationality !== undefined && (
        <ValueWrapper>
          <Caption>Nationality</Caption>
          <Value>{user.nationality}</Value>
        </ValueWrapper>
      )}
      {user.address && user.address.line_one !== undefined && (
        <ValueWrapper>
          <Caption>Address Line 1</Caption>
          <Value>{user.address.line_one}</Value>
        </ValueWrapper>
      )}
      {user.address && user.address.line_two !== undefined && (
        <ValueWrapper>
          <Caption>Address Line 2</Caption>
          <Value>{user.address.line_two}</Value>
        </ValueWrapper>
      )}
      {user.address && user.address.city !== undefined && (
        <ValueWrapper>
          <Caption>City</Caption>
          <Value>{user.address.city}</Value>
        </ValueWrapper>
      )}
      {user.address && user.address.state !== undefined && (
        <ValueWrapper>
          <Caption>State</Caption>
          <Value>{user.address.state}</Value>
        </ValueWrapper>
      )}
      {user.address && user.address.country !== undefined && (
        <ValueWrapper>
          <Caption>Country of Residence</Caption>
          <Value>{user.address.country}</Value>
        </ValueWrapper>
      )}
      {user.address && user.address.postal_code !== undefined && (
        <ValueWrapper>
          <Caption>Postal Code</Caption>
          <Value>{user.address.postal_code}</Value>
        </ValueWrapper>
      )}
      {user.employment_status !== undefined && (
        <ValueWrapper>
          <Caption>Employment Status</Caption>
          <Value>{user.employment_status}</Value>
        </ValueWrapper>
      )}
      {user.source_of_funds !== undefined && (
        <ValueWrapper>
          <Caption>Source of Funds</Caption>
          <Value>{user.source_of_funds}</Value>
        </ValueWrapper>
      )}
      {user.income_range !== undefined && (
        <ValueWrapper>
          <Caption>Income Range</Caption>
          <Value>{user.income_range}</Value>
        </ValueWrapper>
      )}
      {user.identification_pose && user.identification_pose.url !== undefined && (
        <ValueWrapper>
          <Caption>Webcam Proof</Caption>
          <Value>
            {user.identification_pose.url}
            {/* <ImageInfo
            url={user.identification_pose.url}
            thumb={user.identification_pose.thumbnail}
          /> */}
          </Value>
        </ValueWrapper>
      )}
      {user.verification_code !== undefined && (
        <ValueWrapper>
          <Caption>Verification Code</Caption>
          <Value>{user.verification_code}</Value>
        </ValueWrapper>
      )}
      {user.residence && user.residence.type !== undefined && (
        <ValueWrapper>
          <Caption>Proof of Residence Type</Caption>
          <Value>{user.residence.type}</Value>
        </ValueWrapper>
      )}
      {user.residence && user.residence.url !== undefined && (
        <ValueWrapper>
          <Caption>Residence Proof</Caption>
          <Value>
            {/* <ImageInfo
            // filename={user.residence_proof_file_name}
            url={user.residence.url}
            thumb={user.residence.thumbnail}
            // size={user.residence_proof_file_size}
            // updated={user.residence_proof_updated_at}
          /> */}
            {user.residence.thumbnail}
          </Value>
        </ValueWrapper>
      )}
      {user.identification && user.identification.type !== undefined && (
        <ValueWrapper>
          <Caption>ID Type</Caption>
          <Value>{user.identification.type}</Value>
        </ValueWrapper>
      )}
      {user.identification && user.identification.issue_date !== undefined && (
        <ValueWrapper>
          <Caption>ID Issue Date</Caption>
          <Value>{moment(user.identification.issue_date).format('YYYY-MM-DD HH:mm')}</Value>
        </ValueWrapper>
      )}
      {user.identification && user.identification.expiration_date !== undefined && (
        <ValueWrapper>
          <Caption>ID Expiration Date</Caption>
          <Value>{moment(user.identification.expiration_date).format('YYYY-MM-DD HH:mm')}</Value>
        </ValueWrapper>
      )}
      {user.identification && user.identification.user_input_id_number !== undefined && (
        <ValueWrapper>
          <Caption>ID Number</Caption>
          <Value>{user.identification.user_input_id_number}</Value>
        </ValueWrapper>
      )}
      {user.identification && user.identification.url !== undefined && (
        <ValueWrapper>
          <Caption>ID Proof</Caption>
          <Value>
            {user.identification.thumbnail}
            {/* <ImageInfo
            // filename={user.identification_proof_file_name}
            url={user.identification.url}
            thumb={user.identification.thumbnail}
            // size={user.identification_proof_file_size}
            // updated={user.identification_proof_updated_at}
          /> */}
          </Value>
        </ValueWrapper>
      )}
      {user.used_ip_addresses && user.used_ip_addresses.length > 0 && (
        <ValueWrapper>
          <Caption>IP Addresses Used</Caption>
          <Value>{this.renderIps(user.used_ip_addresses)}</Value>
        </ValueWrapper>
      )}
      {approving && <div>Approving</div>}
    </Container>
  );
};

const { object, string, bool } = PropTypes;

UserInfo.propTypes = {
  user: object.isRequired,
  header: string.isRequired,
  approving: bool,
};

UserInfo.defaultProps = {
  approving: false,
};
export default UserInfo;
