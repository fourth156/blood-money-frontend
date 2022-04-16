import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider} from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
