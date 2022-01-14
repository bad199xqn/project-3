import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RecoilRoot } from "recoil";

import store from './store';

const app = (
    <Provider store={store}>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
