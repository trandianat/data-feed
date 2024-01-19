import { Amplify } from 'aws-amplify';
import { createRoot } from 'react-dom/client';
import { App } from 'components/app';
import config from './aws-exports';
import 'styles.css';

Amplify.configure(config);
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
