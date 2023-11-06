import { Typography } from "@mui/material";
import ShopLayout from "@/components/layouts/ShopLayout";
import { initialData } from "../../database/products";
import ProductList from "@/components/products/ProductList";

export default function Home() {
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

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
}
