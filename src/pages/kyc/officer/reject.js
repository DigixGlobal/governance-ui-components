import React from 'react';
import PropTypes from 'prop-types';

import { Query, Mutation } from 'react-apollo';

import { Button, Select } from '@digix/gov-ui/components/common/elements/index';
import { Label } from '@digix/gov-ui/components/common/common-styles';
import { FieldGroup, FieldItemKYC } from '@digix/gov-ui/pages/kyc/officer/style';

import {
  getKycRejectionReasonsQuery,
  rejectKycMutation,
} from '@digix/gov-ui/api/graphql-queries/kyc';

class RejectKyc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: undefined,
    };
  }

  onSelect = e => {
    const { value } = e.target;
    this.setState({ reason: value });
  };

  onSubmit = rejectKyc => {
    const { onCompleted } = this.props;
    rejectKyc({
      variables: {
        kycId: this.props.kycId,
        rejectionReason: this.state.reason,
      },
    }).then(() => {
      if (onCompleted) onCompleted('KYC Rejected');
    });
  };

  render() {
    const hasReason = this.state.reason && this.state.reason.length > 0;
    return (
      <FieldGroup>
        <FieldItemKYC>
          <Label>Rejection Reason</Label>
          <Query query={getKycRejectionReasonsQuery}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              const options = data.rejectionReasons.map(reason => ({
                text: reason.name,
                value: reason.value,
              }));

              options.splice(0, 0, {
                text: 'Select Rejection Reason',
                value: '',
              });
              return (
                <Select
                  name="rejection-reason"
                  data-digix="KYC-Rejection-Reason"
                  onChange={this.onSelect}
                  items={options}
                />
              );
            }}
          </Query>
        </FieldItemKYC>
        <FieldItemKYC>
          <Mutation mutation={rejectKycMutation}>
            {rejectKyc => (
              <Button
                kind="round"
                primary
                large
                reverse
                fluid
                disabled={!hasReason}
                onClick={() => this.onSubmit(rejectKyc)}
                style={{ margin: '0.5rem 1rem' }}
              >
                Reject
              </Button>
            )}
          </Mutation>
        </FieldItemKYC>
      </FieldGroup>
    );
  }
}

const { string, func } = PropTypes;

RejectKyc.propTypes = {
  kycId: string.isRequired,
  onCompleted: func.isRequired,
};

export default RejectKyc;
