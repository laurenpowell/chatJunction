import {createRoot} from 'react-dom/client';
import App from './App';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Initial render
root.render(
        <App name="Chat App" />
    );
