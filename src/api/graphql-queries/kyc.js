/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

const fetchKycFormOptions = gql`
  query fetchKycFormOptions {
    addressCountry: countries {
      text: name
      value
    }

    country: countries {
      text: name
      value
    }

    nationality: countries {
      text: name
      value
    }

    employmentIndustry: industries {
      text: name
      value
    }

    employmentStatus: __type(name: "EmploymentStatusEnum") {
      enumValues {
        text: name
        value: name
      }
    }

    gender: __type(name: "GenderEnum") {
      enumValues {
        text: name
        value: name
      }
    }

    identificationProofType: __type(name: "IdentificationProofTypeEnum") {
      enumValues {
        text: name
        value: name
      }
    }

    incomeRange: incomeRanges {
      text: range
      value
    }

    residenceProofType: __type(name: "ResidenceProofTypeEnum") {
      enumValues {
        text: name
        value: name
      }
    }
  }
`;

const submitKycMutation = gql`
  mutation($kycRequest: SubmitKycMutationInput!) {
    submitKyc(input: $kycRequest) {
      clientMutationId
      errors {
        field
        message
      }
      kyc {
        status
      }
    }
  }
`;

export const withFetchKycFormOptions = Component => props => (
  <Query query={fetchKycFormOptions}>
    {({ loading, error, data }) => {
      if (loading || error) {
        return <Component {...props} />;
      }

      const dataKeys = Object.keys(data);
      let dataValues = Object.values(data);

      const formatString = string => string.replace('_', ' ');

      const formatDataArray = dataArray =>
        dataArray.map(option => ({
          text: formatString(option.text),
          value: option.value,
        }));

      dataValues = dataValues.map(options => {
        if (options.enumValues) {
          return formatDataArray(options.enumValues);
        }
        return options;
      });

      const formattedData = dataValues.reduce(
        (newData, value, index) => ({
          ...newData,
          [dataKeys[index]]: value,
        }),
        {}
      );

      return <Component {...props} formOptions={formattedData} />;
    }}
  </Query>
);

export const withSubmitKyc = Component => props => (
  <Mutation
    mutation={submitKycMutation}
    onCompleted={props.onSubmitKyc}
    onError={props.onSubmitKycError}
  >
    {(mutation, { loading }) => {
      const submitKyc = kycRequest => {
        mutation({
          variables: { kycRequest },
        });
      };

      if (loading) {
        return <Component {...props} disabled />;
      }

      return <Component {...props} submitKyc={submitKyc} />;
    }}
  </Mutation>
);
