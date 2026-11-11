import { gql } from "@apollo/client";
import { REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String,
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      url
      reviews {
        edges {
          node {
            ...ReviewFragment
            user {
              id
              username
            }
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`

export const ME = gql`
  query GetCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFragment
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }

  ${REVIEW_FRAGMENT}
`
