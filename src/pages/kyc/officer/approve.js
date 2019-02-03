import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import moment from 'moment';

import { Button, TextField } from '@digix/gov-ui/components/common/elements/index';
import { Label } from '@digix/gov-ui/components/common/common-styles';
import { FieldGroup, FieldItemKYC } from '@digix/gov-ui/pages/kyc/officer/style';

import { approveKycMutation } from '@digix/gov-ui/api/graphql-queries/kyc';

class ApproveKyc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expirationDate: undefined,
    };
  }

  onSubmit = approveKyc => {
    const { onCompleted } = this.props;
    approveKyc({
      variables: {
        kycId: this.props.kycId,
        expirationDate: this.state.expirationDate,
      },
    }).then(() => {
      if (onCompleted) onCompleted('KYC successfully Approved');
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ expirationDate: value });
  };

  render() {
    const { expirationDate } = this.state;
    const validDate = moment(expirationDate).isValid() && new Date(expirationDate) >= Date.now();

    return (
      <FieldGroup>
        <FieldItemKYC>
          <Label>Expiration Date</Label>
          <TextField
            data-digix="Approve-Kyc-Expiration"
            type="date"
            onChange={this.handleChange}
            error={!validDate && expirationDate !== undefined}
            message="Date must be valid and NOT less than the current date"
          />
        </FieldItemKYC>
        <FieldItemKYC>
          <Mutation mutation={approveKycMutation}>
            {approveKyc => (
              <Button
                kind="round"
                primary
                large
                reverse
                fluid
                disabled={!validDate}
                onClick={() => this.onSubmit(approveKyc)}
                style={{ margin: '0.5rem 1rem' }}
              >
                Approve
              </Button>
            )}
          </Mutation>
        </FieldItemKYC>
      </FieldGroup>
    );
  }
}

const { string, func } = PropTypes;

ApproveKyc.propTypes = {
  kycId: string.isRequired,
  onCompleted: func.isRequired,
};

export default ApproveKyc;
