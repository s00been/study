import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Container, Paper, useTheme } from '@mui/material';

import ProductCard from '../components/Product/ProductCard';
import { cartItemsVar } from '../cache';

import { useGetProductsQuery } from '../gql/graphql';

export default function Products() {
  const theme = useTheme();
  const { data, loading, error } = useGetProductsQuery();

  return (
    <Container sx={{ paddingTop: 7 }}>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {data?.products.map((props, idx) => (
          <Grid key={idx} item xs={6} md={4}>
            <ProductCard
              onClick={() => {
                const allCartItems = cartItemsVar();
                cartItemsVar([
                  ...allCartItems,
                  {
                    id: uuidv4(),
                    product: props,
                    amount: 1,
                  },
                ]);
              }}
              {...props}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
