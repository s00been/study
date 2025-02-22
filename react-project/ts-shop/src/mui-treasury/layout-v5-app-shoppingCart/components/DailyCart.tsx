import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import DailySizeSelector from './DailySizeSelector';
import DailyInteger from './DailyInteger';

const TypographyHeading = styled(Typography)(
  ({ theme: { palette, breakpoints } }) => ({
    fontWeight: 900,
    fontSize: '1.75rem',
    textAlign: 'center',

    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },

    [breakpoints.up('md')]: {
      fontSize: '2.25rem',
    },
  }),
);

const StyledTable = styled(Table)(({ theme: { palette, breakpoints } }) => ({
  minWidth: 650,
}));

const ImgImage = styled('img')(({ theme: { palette, breakpoints } }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}));

const PName = styled('p')(({ theme: { palette, breakpoints } }) => ({
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',

  fontWeight: 'bold',
  fontSize: 16,
  margin: '0 0 8px 0',
}));

const SpanDescr = styled('span')(({ theme: { palette, breakpoints } }) => ({
  fontSize: 14,
  color: palette.text.secondary,
}));

function createData(image, name, descr, size, quantity, totalPrice) {
  return { image, name, descr, size, quantity, totalPrice };
}

const DailyCart = ({ itemObj }) => {
  return (
    <Box pt={{ xs: 2, sm: 4, md: 6 }}>
      <TypographyHeading variant={'h1'} gutterBottom>
        Shopping Cart.
      </TypographyHeading>
      <TableContainer>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(itemObj)?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Box display={'flex'} alignItems={'center'}>
                    <Box width={80} height={80}>
                      <ImgImage
                        alt={row.product.name}
                        src={row.product.imgUrl}
                      />
                    </Box>
                    <Box ml={2}>
                      <PName>{row.product.name}</PName>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <DailyInteger>{row.amount}</DailyInteger>
                </TableCell>
                <TableCell>{Number(row.product.price) * row.amount}</TableCell>
                <TableCell>
                  <IconButton>
                    <Close />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Box>
  );
};

export default DailyCart;
