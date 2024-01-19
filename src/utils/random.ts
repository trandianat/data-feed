import { Topic } from 'utils/constants';

const text = [
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

export const randomDate = () =>
  new Date((new Date() as any) - Math.random() * 1e12).toISOString();
export const randomNumber = () => Math.floor(Math.random() * 1000000);
export const randomText = () => text[Math.floor(Math.random() * text.length)];
export const randomTopic = () =>
  Object.values(Topic)[Math.floor(Math.random() * Object.values(Topic).length)];
