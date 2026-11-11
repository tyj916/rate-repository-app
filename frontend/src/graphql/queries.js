import { gql } from "@apollo/client";
import { REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryFragment
        }
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
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
