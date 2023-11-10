import ShopLayout from "@/components/layouts/ShopLayout";
import ProductList from "@/components/products/ProductList";
import FullScreenLoading from "@/components/ui/FullScreenLoading";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";
import React from "react";

const men = () => {
  const { products, isLoading } = useProducts("/products?gender=men");
  return (
    <ShopLayout title="Teslo-Shop Men" pageDescription="Men's products">
      <Typography variant="h1" component="h1">
        Men's Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default men;
