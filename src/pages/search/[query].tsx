import { GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

import ShopLayout from "@/components/layouts/ShopLayout";
import ProductList from "@/components/products/ProductList";
import { getAllProducts, getProductsBySearchTerm } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

export default function Search({ products, foundProducts, query }: Props) {
  return (
    <ShopLayout
      title={"Teslo-Shop - Search"}
      pageDescription={"Find teslo best products"}
    >
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            Couldn't find products
          </Typography>
          <Typography
            variant="h2"
            color="secondary"
            sx={{ ml: 1 }}
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let { query = "" } = params as { query: string };

  query = query.toString();

  let products = await getProductsBySearchTerm(query);
  const foundProducts = products.length > 0;

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  if (!foundProducts) {
    // all prodcyuts
    products = await getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
