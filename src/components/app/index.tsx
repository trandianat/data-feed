import { generateClient, GraphQLResult } from 'aws-amplify/api';
import { Fragment, useEffect, useState } from 'react';
import * as styles from 'components/app/styles';
import { Graph } from 'components/graph';
import { Modal } from 'components/modal';
import { Table } from 'components/table';
import { listTweets } from 'graphql/queries';
import { ModalType } from 'utils/constants';
import { ListTweets, ModalInfo, Tweet } from 'utils/types';

export const App = (): JSX.Element => {
  const [client] = useState(generateClient());
  const [modal, setModal] = useState<ModalInfo>({ tweet: {}, type: '' });
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const getTweets = async () => {
    const {
      data: {
        listTweets: { items },
      },
    } = (await client.graphql({
      query: listTweets,
    })) as GraphQLResult<ListTweets>;
    setTweets(
      [...items].sort(
        (a: Tweet, b: Tweet) =>
          Date.parse(b.createdAt) - Date.parse(a.createdAt),
      ),
    );
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <main css={styles.app}>
      <h1>Tweets</h1>
      <button
        className="min-width"
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
      {tweets.length ? (
        <Fragment>
          <Graph tweets={tweets} />
          <Table
            getTweets={getTweets}
            setModal={setModal}
            setTweets={setTweets}
            tweets={tweets}
          />
        </Fragment>
      ) : (
        <p>No Tweets found</p>
      )}
    </main>
  );
};
