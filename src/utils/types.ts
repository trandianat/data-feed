import { ModalType } from 'utils/constants';

export type Tweet = {
  id: string;
  date: string;
  source: string;
  content: string;
  topic: string;
  followers: number;
  following: number;
};

type Items = {
  items: Tweet[];
};

export type ListTweets = {
  listTweets: Items;
};

export type ModalInfo = {
  tweet: Partial<Tweet>;
  type: '' | ModalType.EDIT | ModalType.NEW;
};
