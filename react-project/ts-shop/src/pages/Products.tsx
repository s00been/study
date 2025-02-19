import { useState } from 'react';
import {
  Container,
  Paper,
  useTheme,
  Fab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import ProductCard from '../components/Product/ProductCard';
import { cartItemsVar } from '../cache';

import ProductList from './ProductList';

import {
  useGetProductsQuery,
  useAddProductMutation,
} from '../generated/graphql';

export default function Products() {
  const { data, loading, error } = useGetProductsQuery();
  const [addProduct, { loading: mutationLoading }] = useAddProductMutation({
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: ['GetProducts'],
  });

  const [open, setOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '',
    price: '',
    imgUrl: '',
  });
  const { name, price, imgUrl } = form;

  if (loading) {
    return (
      <Container sx={{ paddingTop: 7, textAlign: 'center' }}>
        Loading...
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ paddingTop: 7 }}>
        <Paper sx={{ padding: 2, backgroundColor: theme.palette.error.light }}>
          {error.message}
        </Paper>
      </Container>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    addProduct({
      variables: form,
    })
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container sx={{ paddingTop: 7 }}>
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          justifyContent: 'center',
          marginBottom: 2,
        }}
      >
        <TextField
          variant="outlined"
          label="상품명으로 검색"
          fullWidth
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
        />
        <Button onClick={() => setSearch(searchDraft)} variant="contained">
          조회
        </Button>
      </Box>
      <ProductList products={data?.products} search={search} />
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>상품 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <code>{JSON.stringify(form)}</code>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="상품명"
            fullWidth
            value={name}
            onChange={handleTextChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="price"
            label="상품 가격"
            fullWidth
            value={price}
            onChange={handleTextChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="imgUrl"
            label="상품 이미지 주소"
            fullWidth
            value={imgUrl}
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddTwoToneIcon onClick={handleClickOpen} />
      </Fab>
    </Container>
  );
}
