import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import ShopLayout from "@/components/layouts/ShopLayout";
import ProductSlideShow from "@/components/products/ProductSlideShow";
import ItemCounter from "@/components/ui/ItemCounter";
import ProductSizeSelector from "@/components/products/ProductSizeSelector";

import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { getAllProductsSlug, getProductBySlug } from "@/database";

interface Props {
  product: IProduct;
}

const ProductPage = ({ product }: Props) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((prod) => ({
      ...prod,
      size,
    }));
  };

  const updateQuantity = (quantity: number) => {
    setTempCartProduct((prod) => ({
      ...prod,
      quantity,
    }));
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* Sideshow */}
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            {/* Amount */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Amount</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
                updateQuantity={updateQuantity}
              />
              <ProductSizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {/* Add to box */}
            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn">
                {tempCartProduct.size ? "Add to cart" : "Select a size"}
              </Button>
            ) : (
              <Chip
                label="No products available"
                color="error"
                variant="outlined"
              />
            )}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await getAllProductsSlug();
  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;

// Not this way
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string };

//   const product = await getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };
