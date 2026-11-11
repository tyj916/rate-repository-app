import { gql } from "@apollo/client";

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
    id
    text
    rating
    createdAt
  }
`;
