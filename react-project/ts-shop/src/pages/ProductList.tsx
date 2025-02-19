import React, { memo, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';

import isEqual from 'lodash.isequal';

import ProductCard from '../components/Product/ProductCard';
import { cartItemsVar } from '../cache';
import { GetProductsQuery } from '../generated/graphql';

interface ProductListProps {
  products?: GetProductsQuery['products'];
  search?: string;
}

const areEqual = (prevProps: ProductListProps, nextProps: ProductListProps) => {
  return isEqual(prevProps, nextProps);
};
const ProductList = memo(({ products, search }: ProductListProps) => {
  console.log('ProductList 렌더링');
  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {[...new Array(10)].flatMap(() =>
        products
          ?.filter(({ name }) => {
            const searchRegex = new RegExp(search, 'g');
            return name.search(searchRegex) !== -1;
          })
          .map((props) => (
            <Grid key={uuidv4()} item xs={6} md={4}>
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
          )),
      )}
    </Grid>
  );
}, areEqual);
export default ProductList;
