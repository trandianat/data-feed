import { createRoot } from 'react-dom/client';
import { App } from 'components/app';
import 'styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
