/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet($filter: ModelSubscriptionTweetFilterInput) {
    onCreateTweet(filter: $filter) {
      id
      date
      source
      content
      topic
      followers
      following
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet($filter: ModelSubscriptionTweetFilterInput) {
    onUpdateTweet(filter: $filter) {
      id
      date
      source
      content
      topic
      followers
      following
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet($filter: ModelSubscriptionTweetFilterInput) {
    onDeleteTweet(filter: $filter) {
      id
      date
      source
      content
      topic
      followers
      following
      createdAt
      updatedAt
      __typename
    }
  }
`;
