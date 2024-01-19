import Bowser from 'bowser';
import { ChangeEvent, useEffect, useState } from 'react';
import * as styles from 'components/modal/styles';
import { Topic } from 'utils/constants';

export const Modal = ({ setShowModal }: any): JSX.Element => {
  const [defaultDate, setDefaultDate] = useState<string>('');
  const [defaultSource, setDefaultSource] = useState<string>('');
  const [input, setInput] = useState<Record<string, string | number>>({
    date: '',
    source: '',
    content: '',
    topic: '',
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    setDefaultDate(formattedDate);

    const browser = Bowser.getParser(window.navigator.userAgent);
    setDefaultSource(`${browser.getBrowserName()} on ${browser.getOSName()}`);
  }, []);

  return (
    <div css={styles.modal}>
      <h2>New Tweet</h2>
      <div id="form">
        <label htmlFor="date">Date</label>
        <input
          defaultValue={defaultDate}
          id="date"
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, date: value }));
          }}
          type="date"
        />
        <label htmlFor="source">Source</label>
        <input
          defaultValue={defaultSource}
          id="source"
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, source: value }));
          }}
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          maxLength={280}
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(input => ({ ...input, content: value }));
          }}
        />
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
        <label htmlFor="followers">Number of followers</label>
        <input
          id="followers"
          min={0}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, followers: value }));
          }}
          type="number"
        />
        <label htmlFor="following">Number of following</label>
        <input
          id="following"
          min={0}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInput(input => ({ ...input, following: value }));
          }}
          type="number"
        />
        <button
          onClick={() => {
            console.log(input);
            setShowModal(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
