import {
  AppShell,
  Navbar,
  Burger,
  Header,
  MediaQuery,
  useMantineTheme,
  Text,
} from '@mantine/core';
import React from 'react';
import { Link, MatchRoute } from 'react-location';
import Transaction from './Transaction';

type Props = React.PropsWithChildren<{}>;


export default function BloodMoneyAppShell({children}: Props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);
  
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      fixed
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{sm: 200, lg: 300}}>
          <Text color={theme.colors.gray[0]}>🐔🐔Cán bộ gà🐔🐔</Text>
          <Transaction />
        </Navbar>
      }
      header={
        <Header height={70} p='md'>
          <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <MediaQuery largerThan='sm' styles={{display: 'none'}}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[0]}
                mr='xl'
              />
            </MediaQuery>
            <Link to='/' color={theme.colors.gray[0]}>
              Chia máu
            </Link>
          </div>
        </Header>
      }>
      {children}
    </AppShell>
  );
}
