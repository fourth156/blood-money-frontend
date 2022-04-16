import {
  DefaultGenerics,
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
    path: 'transactions',
    children: [
      {
        path: '/',
        element: <TransactionTable />,
        loader: () =>
          queryClient.getQueryData(['transactions', 'ALL', 'ALL']) ??
          queryClient.fetchQuery(['transactions', 'ALL', 'ALL'], () =>
            fetchTransaction({index: 'ALL', indexValue: 'ALL'})
          ),
      },
      {
        path: '/:transactionId',
        element: <>
          <TransactionTable />
          <Transaction />
        </>,
      },
    ],
  },
];

const location = new ReactLocation();

export default function App() {
  return (
    <Router location={location} routes={routes}>
      <BloodMoneyAppShell>
        <Outlet />
      </BloodMoneyAppShell>
    </Router>
  );
}
