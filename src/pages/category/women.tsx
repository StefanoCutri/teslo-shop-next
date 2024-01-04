import {ProductList} from '../../components/products';
import {ShopLayout} from '../../components/layouts'
import FullScreenLoading from '../../components/ui/FullScreenLoading'
import {useProducts} from '../../hooks'
import { Typography } from "@mui/material";

const women = () => {
  const { products, isLoading } = useProducts("/products?gender=women");
  return (
    <ShopLayout title="Teslo-Shop Women" pageDescription="Women's products">
      <Typography variant="h1" component="h1">
        Women's Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default women;
