import gql from 'graphql-tag';

const fragments = {
  comment: gql`
    fragment comment on Comment {
      body
      createdAt
      isBanned
      id
      liked
      likes
      parentId
      user {
        address
        displayName
      }
    }
  `,
};

export const fetchThreadsQuery = gql`
  query fetchThreads(
    $commentCount: Int
    $endCursor: String
    $proposalId: String
    $replyCount: Int
    $sortBy: ThreadSortByEnum
    $threadCount: Int
  ) {
    commentThreads(
      after: $endCursor
      first: $threadCount
      proposalId: $proposalId
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...comment
          replies(first: $replyCount) {
            edges {
              node {
                ...comment
                replies(first: $commentCount) {
                  edges {
                    node {
                      ...comment
                      replies(first: 0) {
                        edges {
                          node {
                            body
                          }
                        }
                        endCursor
                        hasNextPage
                      }
                    }
                  }
                  endCursor
                  hasNextPage
                }
              }
            }
            endCursor
            hasNextPage
          }
        }
      }
      endCursor
      hasNextPage
    }
  }

  ${fragments.comment}
`;

export const fetchRepliesQuery = gql`
  query fetchReplies(
    $commentCount: Int
    $proposalId: String
    $endCursor: String
    $replyCount: Int
    $sortBy: ThreadSortByEnum
  ) {
    commentThreads(
      after: $endCursor
      first: $replyCount
      proposalId: $proposalId
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...comment
          replies(first: $commentCount) {
            edges {
              node {
                ...comment
                replies(first: 0) {
                  edges {
                    node {
                      body
                    }
                  }
                  endCursor
                  hasNextPage
                }
              }
            }
            endCursor
            hasNextPage
          }
        }
      }
      endCursor
      hasNextPage
    }
  }

  ${fragments.comment}
`;

export const fetchCommentsQuery = gql`
  query fetchReplies(
    $sortBy: ThreadSortByEnum
    $commentCount: Int
    $endCursor: String
    $proposalId: String
  ) {
    commentThreads(
      after: $endCursor
      first: $commentCount
      proposalId: $proposalId
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...comment
          replies(first: 0) {
            edges {
              node {
                body
              }
            }
            endCursor
            hasNextPage
          }
        }
      }
      endCursor
      hasNextPage
    }
  }

  ${fragments.comment}
`;

export const hideComment = gql`
  mutation hideComment($id: String!) {
    banComment(input: { commentId: $id }) {
      comment {
        ...comment
      }
      errors {
        field
        message
      }
    }
  }
  ${fragments.comment}
`;

export const unhideComment = gql`
  mutation hideComment($id: String!) {
    unbanComment(input: { commentId: $id }) {
      comment {
        ...comment
      }
      errors {
        field
        message
      }
    }
  }
  ${fragments.comment}
`;
