import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import moment from 'moment';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import TextField from '@digix/gov-ui/components/common/elements/textfield';

import { approveKycMutation, searchKycQuery } from '@digix/gov-ui/api/graphql-queries/kyc';

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
      variables: { kycId: this.props.kycId, expirationDate: this.state.expirationDate },
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
      <div>
        <div>Expiration Date</div>
        <div>
          <TextField
            data-digix="Approve-Kyc-Expiration"
            type="date"
            onChange={this.handleChange}
            error={!validDate && expirationDate !== undefined}
            message="Date must be valid and NOT less than the current date"
          />
        </div>
        <div>
          <Mutation
            mutation={approveKycMutation}
            refetchQueries={['searchKycQuery']}
            // update={(cache, { data: { approveKyc } }) => {
            //   const { searchKycs } = cache.readQuery({
            //     query: searchKycQuery,
            //     variables: { status: 'PENDING' },
            //   });
            //   console.log({ searchKycs, approveKyc });

            //   cache.writeQuery({
            //     query: searchKycQuery,
            //     data: { searchKycs },
            //   });
            // }}
          >
            {approveKyc => (
              <Button kind="round" disabled={!validDate} onClick={() => this.onSubmit(approveKyc)}>
                Approve
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

const { string, func } = PropTypes;

ApproveKyc.propTypes = {
  kycId: string.isRequired,
  onCompleted: func.isRequired,
};

export default ApproveKyc;
