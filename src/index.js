import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';
import './style/style.scss';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );