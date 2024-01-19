import { generateClient } from 'aws-amplify/api';
import Bowser from 'bowser';
import { ChangeEvent, useEffect, useState } from 'react';
import * as styles from 'components/modal/styles';
import { createTweet, updateTweet } from 'graphql/mutations';
import { ModalType, Topic } from 'utils/constants';
import { formatDateTime, getDate, getTime } from 'utils/dateTime';
import { ModalInfo, Tweet } from 'utils/types';
import {
  randomDate,
  randomNumber,
  randomText,
  randomTopic,
} from 'utils/random';

type ModalProps = {
  getTweets: () => void;
  info: ModalInfo;
  setModal: React.Dispatch<React.SetStateAction<ModalInfo>>;
};

export const Modal = ({
  getTweets,
  info,
  setModal,
}: ModalProps): JSX.Element => {
  const [client] = useState(generateClient());
  const [defaultDate, setDefaultDate] = useState<string>('');
  const [defaultTime, setDefaultTime] = useState<string>('');
  const [input, setInput] = useState<Partial<Tweet>>({});

  const addTweet = async () => {
    try {
      await client.graphql({ query: createTweet, variables: { input } });
      getTweets();
    } catch (error) {
      console.error(error);
    }
  };

  const editTweet = async () => {
    try {
      await client.graphql({ query: updateTweet, variables: { input } });
      getTweets();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (document.getElementById('topic') as HTMLSelectElement).value =
      input.topic || '';
  }, [input]);

  useEffect(() => {
    const [date, time, dateTime] = formatDateTime(new Date());
    setDefaultDate(date);
    setDefaultTime(time);

    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserOs = `${browser.getBrowserName()} on ${browser.getOSName()}`;

    const newTweet = {
      date: dateTime,
      source: browserOs,
      content: '',
      topic: '',
      followers: 0,
      following: 0,
    };
    setInput(info.type === ModalType.NEW ? newTweet : info.tweet);
  }, []);

  return (
    <div css={styles.modal}>
      <h2>{info.type} Tweet</h2>
      <button
        onClick={() => {
          const topic = randomTopic();
          (document.getElementById('topic') as HTMLSelectElement).value = topic;
          setInput(input => ({
            id: input.id,
            date: randomDate(),
            source: randomText(),
            content: randomText(),
            topic,
            followers: randomNumber(),
            following: randomNumber(),
          }));
        }}
      >
        Randomize
      </button>
      <div className="input">
        <label htmlFor="date">Date</label>
        <input
          defaultValue={input.date ? getDate(input.date) : defaultDate}
          id="date"
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({
              ...input,
              date: input.date?.replace(getDate(input.date), value),
            }));
          }}
          type="date"
        />
      </div>
      <div className="input">
        <label htmlFor="time">Time</label>
        <input
          defaultValue={input.date ? getTime(input.date) : defaultTime}
          id="time"
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({
              ...input,
              date: input.date?.replace(getTime(input.date), value),
            }));
          }}
          type="time"
        />
      </div>
      <div className="input">
        <label htmlFor="source">Source</label>
        <input
          defaultValue={input.source}
          id="source"
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, source: value }));
          }}
        />
      </div>
      <div className="input">
        <label htmlFor="content">Content</label>
        <textarea
          defaultValue={input.content}
          id="content"
          maxLength={280}
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(input => ({ ...input, content: value }));
          }}
        />
      </div>
      <div className="input">
        <label htmlFor="topic">Topic</label>
        <select
          defaultValue=""
          id="topic"
          onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
            setInput(input => ({ ...input, topic: value }));
          }}
        >
          <option disabled value="">
            Select a topic
          </option>
          {Object.values(Topic).map(topic => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div className="input">
        <label htmlFor="followers">Number of followers</label>
        <input
          defaultValue={input.followers}
          id="followers"
          min={0}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, followers: Number(value) }));
          }}
          type="number"
        />
      </div>
      <div className="input">
        <label htmlFor="following">Number of following</label>
        <input
          defaultValue={input.following}
          id="following"
          min={0}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, following: Number(value) }));
          }}
          type="number"
        />
      </div>
      <div className="actions">
        <button
          onClick={() => {
            if (info.type === ModalType.NEW) {
              addTweet();
            } else {
              editTweet();
            }
            setModal({ tweet: {}, type: '' });
          }}
        >
          Submit
        </button>
        <button onClick={() => setModal({ tweet: {}, type: '' })}>
          Cancel
        </button>
      </div>
    </div>
  );
};
