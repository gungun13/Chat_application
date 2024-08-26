import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SocketProvider from './context/Socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-xjqvi8t0xz23hzfb.us.auth0.com"
        clientId="U9ZGFpRYHKsqYWqJNSK1jWotUrPln0DI"
        authorizationParams={{
          redirect_uri: window.location.origin + '/chat'
        }}
      >
        <SocketProvider>
        <Provider store={store}>
          
            <App />
          
        </Provider>
        </SocketProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
