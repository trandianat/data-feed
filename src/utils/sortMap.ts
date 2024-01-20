import { Dispatch, SetStateAction } from 'react';
import { Sort } from 'utils/constants';
import { getTime } from 'utils/dateTime';
import { Tweet } from 'utils/types';

const sortTextAscending = (
  setTweets: Dispatch<SetStateAction<Tweet[]>>,
  field: keyof Tweet,
) =>
  setTweets(tweets =>
    [...tweets].sort((a: Tweet, b: Tweet) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    }),
  );

const sortTextDescending = (
  setTweets: Dispatch<SetStateAction<Tweet[]>>,
  field: keyof Tweet,
) =>
  setTweets(tweets =>
    [...tweets].sort((a: Tweet, b: Tweet) => {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      } else {
        return 0;
      }
    }),
  );

const sortMap = (
  setTweets: Dispatch<SetStateAction<Tweet[]>>,
): Record<Sort, () => void> => ({
  [Sort.DATE_ASCENDING]: () =>
    setTweets(tweets =>
      [...tweets].sort(
        (a: Tweet, b: Tweet) => Date.parse(a.date) - Date.parse(b.date),
      ),
    ),
  [Sort.DATE_DESCENDING]: () =>
    setTweets(tweets =>
      [...tweets].sort(
        (a: Tweet, b: Tweet) => Date.parse(b.date) - Date.parse(a.date),
      ),
    ),
  [Sort.TIME_ASCENDING]: () =>
    setTweets(tweets =>
      [...tweets].sort((a: Tweet, b: Tweet) => {
        if (getTime(a.date) < getTime(b.date)) {
          return -1;
        } else if (getTime(a.date) > getTime(b.date)) {
          return 1;
        } else {
          return 0;
        }
      }),
    ),
  [Sort.TIME_DESCENDING]: () =>
    setTweets(tweets =>
      [...tweets].sort((a: Tweet, b: Tweet) => {
        if (getTime(a.date) > getTime(b.date)) {
          return -1;
        } else if (getTime(a.date) < getTime(b.date)) {
          return 1;
        } else {
          return 0;
        }
      }),
    ),
  [Sort.SOURCE_ASCENDING]: () => sortTextAscending(setTweets, 'source'),
  [Sort.SOURCE_DESCENDING]: () => sortTextDescending(setTweets, 'source'),
  [Sort.CONTENT_ASCENDING]: () => sortTextAscending(setTweets, 'content'),
  [Sort.CONTENT_DESCENDING]: () => sortTextDescending(setTweets, 'content'),
  [Sort.TOPIC_ASCENDING]: () => sortTextAscending(setTweets, 'topic'),
  [Sort.TOPIC_DESCENDING]: () => sortTextDescending(setTweets, 'topic'),
  [Sort.FOLLOWERS_ASCENDING]: () => sortTextAscending(setTweets, 'followers'),
  [Sort.FOLLOWERS_DESCENDING]: () => sortTextDescending(setTweets, 'followers'),
  [Sort.FOLLOWING_ASCENDING]: () => sortTextAscending(setTweets, 'following'),
  [Sort.FOLLOWING_DESCENDING]: () => sortTextDescending(setTweets, 'following'),
});

export default sortMap;
