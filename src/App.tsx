import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import React from 'react';
import {
  DefaultGenerics,
  MakeGenerics,
  Navigate,
  Outlet,
  ReactLocation,
  Route,
  Router,
} from 'react-location';
import BloodMoneyAppShell from './components/BloodMoneyAppShell';
import Transaction from './components/Transaction';
import TransactionTable from './components/TransactionTable';
import {queryClient} from './main';
import {fetchTransaction} from './queries/useTransactionQuery';

const routes: Route<DefaultGenerics>[] = [
  {
    path: '/',
    element: <Navigate to='/transactions' />,
  },
  {
    path: '/transactions',
    element: <TransactionTable />,
    loader: () =>
      queryClient.getQueryData(['transactions', 'ALL', 'ALL']) ??
      queryClient.fetchQuery(['transactions', 'ALL', 'ALL'], () =>
        fetchTransaction({index: 'ALL', indexValue: 'ALL'})
    ),
  },
];

export type LocationGenerics = MakeGenerics<{
  Search: {
    transactionId: string;
  }
}>

const location = new ReactLocation<LocationGenerics>();

export default function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = React.useCallback((value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')), [colorScheme]);

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <Router location={location} routes={routes}>
      <ColorSchemeProvider  colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }}>
          <BloodMoneyAppShell>
            <Outlet />
          </BloodMoneyAppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </Router>
  );
}
