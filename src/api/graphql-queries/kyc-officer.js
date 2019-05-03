import gql from 'graphql-tag';

export const searchKycQuery = gql`
  query searchKycs(
    $page: PositiveInteger
    $pageSize: PositiveInteger
    $status: KycStatusEnum
    $sort: SearchKycFieldEnum
    $sortBy: SortByEnum
  ) {
    searchKycs(page: $page, pageSize: $pageSize, status: $status, sort: $sort, sortBy: $sortBy) {
      hasNextPage
      hasPreviousPage
      totalCount
      totalPage
      edges {
        node {
          id
          userId
          status
          firstName
          lastName

          nationality
          residenceProof {
            type
            residence {
              country
            }
          }
        }
      }
    }
  }
`;

export const getKycDetail = gql`
  query getKyc($id: String!) {
    kyc(id: $id) {
      id
      userId
      status
      firstName
      lastName
      gender
      birthdate
      nationality
      phoneNumber
      employmentStatus
      employmentIndustry
      email
      updatedAt
      createdAt
      incomeRange
      ipAddresses
      ethAddress
      identificationProof {
        number
        expirationDate
        type
        image {
          dataUrl
        }
      }
      residenceProof {
        type
        residence {
          address
          addressDetails
          city
          country
          postalCode
          state
        }
        image {
          contentType
          filename
          fileSize
          dataUrl
        }
      }
      identificationPose {
        verificationCode
        image {
          contentType
          filename
          fileSize
          dataUrl
        }
      }
    }
  }
`;

export const getKycRejectionReasonsQuery = gql`
  {
    rejectionReasons {
      name
      value
    }
  }
`;

export const rejectKycMutation = gql`
  mutation rejectKyc($kycId: String!, $rejectionReason: RejectionReasonValue!) {
    rejectKyc(input: { kycId: $kycId, rejectionReason: $rejectionReason }) {
      clientMutationId
      kyc {
        id
        status
        rejectionReason
      }
      errors {
        field
        message
      }
    }
  }
`;

export const approveKycMutation = gql`
  mutation approveKyc($kycId: String!, $expirationDate: Date!) {
    approveKyc(input: { kycId: $kycId, expirationDate: $expirationDate }) {
      clientMutationId
      kyc {
        id
        status
        expirationDate
      }
      errors {
        field
        message
      }
    }
  }
`;
