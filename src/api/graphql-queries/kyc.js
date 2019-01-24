import gql from 'graphql-tag';

export const searchKycQuery = gql`
  query searchKycs($status: KycStatusEnum) {
    searchKycs(status: $status) {
      edges {
        node {
          userUid
          status
          firstName
          lastName
          gender
          birthdate
          nationality
          phoneNumber
          employmentStatus
          employmentIndustry
          incomeRange
          identificationProof {
            number
            expirationDate
            type
            image {
              dataUrl
            }
          }
          residenceProof {
            residence {
              address
              addressDetails
              city
              country
              postalCode
              state
            }
            type
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
    }
  }
`;
