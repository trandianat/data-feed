import Bowser from 'bowser';
import { Topic } from 'utils/constants';

const loremIpsum = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Suspendisse sit amet mi maximus, egestas mi non, sodales arcu.',
  'Fusce at lacus elit.',
  'Donec ullamcorper ex eget mauris euismod, cursus blandit nisi cursus.',
  'Nulla elementum urna ut mattis vehicula.',
  'Praesent facilisis mauris vel imperdiet vehicula.',
  'Sed vulputate rutrum nisi.',
  'Sed dictum nunc sapien, a rutrum mauris pharetra vel.',
  'Fusce nec interdum tellus, ut consectetur erat.',
  'Vestibulum condimentum porta cursus.',
  'Integer lorem dolor, congue a bibendum sit amet, lacinia quis justo.',
  'Donec et nisi sed metus eleifend efficitur.',
  'Nunc a dolor magna.',
  'Nulla fringilla ornare sapien non pharetra.',
  'Phasellus convallis elit et eros cursus posuere.',
  'Sed id mauris id neque vestibulum egestas.',
  'Praesent non quam faucibus, pharetra est at, faucibus eros.',
  'Curabitur risus purus, vestibulum et pretium vel, lacinia ut ex.',
  'Mauris blandit sollicitudin sapien, eget finibus purus elementum eget.',
  'Sed ut efficitur nunc.',
];

const browser = () =>
  Object.values(Bowser.BROWSER_MAP)[
    Math.floor(Math.random() * Object.values(Bowser.BROWSER_MAP).length)
  ];
const os = () =>
  Object.values(Bowser.OS_MAP)[
    Math.floor(Math.random() * Object.values(Bowser.OS_MAP).length)
  ];

export const browserOs = () => `${browser()} on ${os()}`;
export const date = () =>
  new Date(
    (new Date() as unknown as number) - Math.random() * 1e12,
  ).toISOString();
export const number = () => Math.floor(Math.random() * 100000);
export const text = () =>
  loremIpsum[Math.floor(Math.random() * loremIpsum.length)];
export const topic = () =>
  Object.values(Topic)[Math.floor(Math.random() * Object.values(Topic).length)];
