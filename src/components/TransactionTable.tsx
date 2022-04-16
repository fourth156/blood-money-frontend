import {Box, createStyles, Skeleton, Table} from '@mantine/core';
import {useNavigate} from 'react-location';
import {useTransactionsQuery} from '../queries/useTransactionQuery';
import {CellProps, Column, useTable} from 'react-table';
import {Transaction as ITransaction} from '../types/Transaction';

const useStyles = createStyles((theme) => ({
  pre: {
    fontFamily: 'monospace',
    fontSize: '16px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    color: theme.colorScheme === 'dark' ? '#fff' : '#000',
  },
  row: {
    cursor: 'pointer'
  }
}));

const dateRenderer = ({ value }: CellProps<ITransaction, Date>) => {
  if (!value) return null;
  return <Box>{value.toLocaleDateString()} - {value.toLocaleTimeString()}</Box>
}

const columns: Array<Column<ITransaction>> = [
  {
    Header: 'Transaction ID',
    accessor: 'id',
  },
  {
    Header: 'From',
    accessor: 'from',
  },
  {
    Header: 'To',
    accessor: 'to',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Reference ID',
    accessor: 'refId',
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: dateRenderer
  },
  {
    Header: 'Updated At',
    accessor: 'updatedAt',
    Cell: dateRenderer
  }
];

export default function TransactionTable() {
  const {classes} = useStyles();
  const {isLoading, data} = useTransactionsQuery({
    index: 'ALL',
    indexValue: 'ALL',
  });
  const navigate = useNavigate();
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable<ITransaction>({columns, data: data ?? []});

  return (
    <>
      {isLoading && (
        <>
          <Skeleton height={8} radius='xl' />
          <Skeleton height={8} mt={6} radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />
        </>
      )}
      {!isLoading && (
        <Table striped highlightOnHover {...getTableProps()}>
          <thead>
            {headerGroups.map((g) => (
              <tr {...g.getHeaderGroupProps()}>
                {g.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className={classes.row}
                  {...row.getRowProps()}
                  onDoubleClick={() => navigate({to: `/transactions/${row.values.id}`})}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
