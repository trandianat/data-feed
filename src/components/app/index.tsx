import { generateClient, GraphQLResult } from 'aws-amplify/api';
import { useEffect, useState } from 'react';
import * as styles from 'components/app/styles';
import { Modal } from 'components/modal';
import { deleteTweet } from 'graphql/mutations';
import { listTweets } from 'graphql/queries';
import { ModalType } from 'utils/constants';
import { getDate, getTime } from 'utils/dateTime';
import { ListTweets, ModalInfo, Tweet } from 'utils/types';

export const App = (): JSX.Element => {
  const [client] = useState(generateClient());
  const [modal, setModal] = useState<ModalInfo>({ tweet: {}, type: '' });
  const [tweets, setTweets] = useState<Tweet[]>([]);

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

  const getTweets = async () => {
    const {
      data: {
        listTweets: { items },
      },
    } = (await client.graphql({
      query: listTweets,
    })) as GraphQLResult<ListTweets>;
    setTweets(items);
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

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <main css={styles.app}>
      <h1>Data Feed</h1>
      <button
        className="new"
        onClick={() =>
          setModal(modal => ({
            tweet: {},
            type: modal.type ? '' : ModalType.NEW,
          }))
        }
      >
        New Tweet
      </button>
      {modal.type && (
        <Modal getTweets={getTweets} info={modal} setModal={setModal} />
      )}
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
                <td>{followers}</td>
                <td>{following}</td>
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
    </main>
  );
};
