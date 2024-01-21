import Chart from 'chart.js/auto';
import * as styles from 'components/graph/styles';
import { useEffect } from 'react';
import { getDate } from 'utils/dateTime';
import { Tweet } from 'utils/types';

type GraphProps = {
  tweets: Tweet[];
};

export const Graph = ({ tweets }: GraphProps): JSX.Element => {
  useEffect(() => {
    const existingCanvas = document.getElementById('canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');

    const topics = tweets
      .reduce((topicsArray: string[], tweet: Tweet) => {
        if (!topicsArray.includes(tweet.topic)) {
          topicsArray.push(tweet.topic);
        }
        return topicsArray;
      }, [])
      .sort();

    const tweetsByDate = tweets.reduce((tweetArray: Tweet[], tweet: Tweet) => {
      if (!tweetArray.some(t => getDate(t.date) === getDate(tweet.date))) {
        tweetArray.push(tweet);
      }
      return tweetArray;
    }, []);

    new Chart(canvas, {
      type: 'bar',
      options: {
        plugins: { title: { display: true, text: 'Tweets by topic per day' } },
        scales: {
          x: { stacked: true },
          y: { stacked: true, ticks: { stepSize: 1 } },
        },
      },
      data: {
        datasets: topics.map(topic => ({
          label: topic,
          data: tweetsByDate
            .sort(
              (a: Tweet, b: Tweet) => Date.parse(a.date) - Date.parse(b.date),
            )
            .map(tweet => ({
              x: getDate(tweet.date),
              y: tweets.filter(
                t =>
                  getDate(t.date) === getDate(tweet.date) && t.topic === topic,
              ).length,
            })),
        })),
      },
    });

    document.getElementById('graph')?.appendChild(canvas);
  }, [tweets]);

  return <section css={styles.graph} id="graph" />;
};
