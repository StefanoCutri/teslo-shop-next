import ShopLayout from "@/components/layouts/ShopLayout";
import ProductList from "@/components/products/ProductList";
import FullScreenLoading from "@/components/ui/FullScreenLoading";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";
import React from "react";

const KidPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");
  return (
    <ShopLayout title="Teslo-Shop Kid" pageDescription="Kid's products">
      <Typography variant="h1" component="h1">
        Kid's Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
