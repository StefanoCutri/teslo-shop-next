import { Typography } from "@mui/material";
import ShopLayout from "@/components/layouts/ShopLayout";
import ProductList from "@/components/products/ProductList";
import { useProducts } from "@/hooks";

export default function Home() {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"Teslo-Shop - Home"}
      pageDescription={"Find teslo best products"}
      imageFullUrl=""
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>
      {isLoading ? <h1>Loading...</h1> : <ProductList products={products} />}
    </ShopLayout>
  );
}
