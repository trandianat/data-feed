import { generateClient } from 'aws-amplify/api';
import Bowser from 'bowser';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Select } from 'components/select';
import * as styles from 'components/table/styles';
import { deleteTweet } from 'graphql/mutations';
import { ModalType, Sort, Topic } from 'utils/constants';
import { getDate, getTime } from 'utils/dateTime';
import sortMap from 'utils/sortMap';
import { ModalInfo, Tweet } from 'utils/types';

type TableProps = {
  getTweets: () => void;
  setModal: Dispatch<SetStateAction<ModalInfo>>;
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
  tweets: Tweet[];
};

export const Table = ({
  getTweets,
  setModal,
  setTweets,
  tweets,
}: TableProps): JSX.Element => {
  const [client] = useState(generateClient());

  const headers = [
    'Date',
    'Time',
    'Source',
    'Content',
    'Topic',
    'Followers',
    'Following',
    'Actions',
  ];

  const filter = (value: string, isTopic: boolean) => {
    const filteredTweets = tweets.filter(tweet =>
      isTopic ? tweet.topic === value : tweet.source.includes(value),
    );
    if (filteredTweets.length) {
      setTweets(filteredTweets);
    } else {
      alert(`No Tweets found from ${value}`);
    }
  };

  const removeTweet = async (id: string) => {
    try {
      await client.graphql({
        query: deleteTweet,
        variables: { input: { id } },
      });
      getTweets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section css={styles.table}>
      <div className="filters">
        <div className="filter">
          <label htmlFor="sort">Sort</label>
          <Select
            defaultValue="Sort by"
            handleChange={({
              target: { value },
            }: ChangeEvent<HTMLSelectElement>) => {
              sortMap(setTweets)[value as Sort]();
            }}
            id="sort"
            items={Object.values(Sort)}
          />
        </div>
        <div className="filter">
          <label htmlFor="browser">Browser</label>
          <Select
            defaultValue="Select a browser"
            handleChange={({
              target: { value },
            }: ChangeEvent<HTMLSelectElement>) => filter(value, false)}
            id="browser"
            items={Object.values(Bowser.BROWSER_MAP)}
          />
        </div>
        <div className="filter">
          <label htmlFor="os">OS</label>
          <Select
            defaultValue="Select an OS"
            handleChange={({
              target: { value },
            }: ChangeEvent<HTMLSelectElement>) => filter(value, false)}
            id="os"
            items={Object.values(Bowser.OS_MAP)}
          />
        </div>
        <div className="filter">
          <label htmlFor="topic-filter">Topic</label>
          <Select
            defaultValue="Select a topic"
            handleChange={({
              target: { value },
            }: ChangeEvent<HTMLSelectElement>) => filter(value, true)}
            id="topic-filter"
            items={Object.values(Topic)}
          />
        </div>
        <button
          id="reset"
          onClick={() => {
            ['sort', 'browser', 'os', 'topic-filter'].forEach(filter => {
              (document.getElementById(filter) as HTMLSelectElement).value = '';
            });
            getTweets();
          }}
        >
          Reset
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <td key={header}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tweets.map(
            ({ content, date, followers, following, id, source, topic }) => (
              <tr key={id}>
                <td className="date">{getDate(date)}</td>
                <td>{getTime(date)}</td>
                <td>{source}</td>
                <td>{content}</td>
                <td>{topic}</td>
                <td>{followers.toLocaleString()}</td>
                <td>{following.toLocaleString()}</td>
                <td className="actions">
                  <button
                    onClick={() =>
                      setModal(modal => ({
                        tweet: {
                          content,
                          date,
                          followers,
                          following,
                          id,
                          source,
                          topic,
                        },
                        type: modal.type ? '' : ModalType.EDIT,
                      }))
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => removeTweet(id)}>Delete</button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </section>
  );
};
