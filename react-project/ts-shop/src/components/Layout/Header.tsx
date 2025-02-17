import { useState, useCallback } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import {
  Badge,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Typography,
  styled,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '../../cache';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '.MuiBadge-dot': {
    backgroundColor: theme.palette.secondary.main, // Change dot color
  },
}));

interface Props {
  children?: React.ReactNode;
}

const Header = ({ children }: Props) => {
  const cartItems = useReactiveVar(cartItemsVar);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {children}
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
