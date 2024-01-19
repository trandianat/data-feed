/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
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
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
