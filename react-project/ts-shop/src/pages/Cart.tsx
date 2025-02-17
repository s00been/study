import React from 'react';

import { useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '../cache';

import Close from '@mui/icons-material/Close';
import CreditCard from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import { styled, ThemeProvider } from '@mui/material/styles';
import {
  Content,
  EdgeSidebar,
  Footer,
  Fullscreen,
  Header,
  InsetAvoidingView,
  InsetContainer,
  InsetSidebar,
  Root,
} from '../mui-treasury/layout-core-v5';
import {
  DailyCart,
  DailyCheckout,
  DailyHeader,
  dailyShoppingTheme,
  DailySummary,
} from '../mui-treasury/layout-v5-app-shoppingCart/components';

const StyledHeader = styled(Header)(() => ({
  backgroundColor: '#ffffff',
}));

const InsetAvoidingViewFooter = styled(InsetAvoidingView)(
  ({ theme: { breakpoints } }) => ({
    border: 'unset',
    position: 'relative',
    backgroundColor: '#fff',

    '&:before': {
      content: '" "',
      position: 'absolute',
      width: '100%',
      height: 24,
      top: 0,
      left: 0,
      transform: 'translateY(-100%)',
      background: 'linear-gradient(to top, #ffffff, rgba(255,255,255,0))',
    },

    [breakpoints.only('sm')]: {
      paddingRight: 64,
    },

    [breakpoints.up('md')]: {
      paddingBottom: 40,
    },
  }),
);

export default function Cart() {
  const cartItems = useReactiveVar(cartItemsVar);

  const itemObj = cartItems.reduce(
    (acc, item) => {
      const {
        product: { id },
      } = item;
      if (acc[id]) {
        acc[id].amount += 1;
      } else {
        acc[id] = { ...item };
      }

      return acc;
    },
    {} as Record<string, CartItem>,
  );

  return (
    <ThemeProvider theme={dailyShoppingTheme}>
      <Fullscreen>
        <Root
          scheme={{
            header: {
              config: {
                xs: {
                  position: 'relative',
                  height: 64,
                },
              },
            },
            rightInsetSidebar: {
              config: {
                md: {
                  position: 'absolute',
                  width: 'max(33%, 256px)',
                },
              },
            },
            rightEdgeSidebar: {
              config: {
                xs: {
                  variant: 'temporary',
                  width: '88%',
                },
              },
            },
          }}
        >
          {({ toggleRightSidebarOpen, state: { rightEdgeSidebar } }) => {
            return (
              <>
                <CssBaseline />
                <Fab
                  color={'primary'}
                  onClick={toggleRightSidebarOpen}
                  sx={(theme) => ({
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    color: '#2E3B4D',
                    '& svg': {
                      fontSize: 32,
                      color: '#fff',
                    },
                    zIndex: 1500,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    [theme.breakpoints.up('sm')]: {
                      bottom: 40,
                    },
                    [theme.breakpoints.up('md')]: {
                      transform: 'scale(0)',
                    },
                    ...(rightEdgeSidebar?.open && {
                      top: 8,
                      right: 8,
                      width: 48,
                      height: 48,
                    }),
                  })}
                >
                  {rightEdgeSidebar?.open ? <Close /> : <CreditCard />}
                </Fab>
                <Content>
                  <InsetContainer>
                    <DailyCart itemObj={itemObj} />
                  </InsetContainer>
                </Content>
              </>
            );
          }}
        </Root>
      </Fullscreen>
    </ThemeProvider>
  );
}
