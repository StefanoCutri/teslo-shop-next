import ShopLayout from "@/components/layouts/ShopLayout";
import { Typography } from "@mui/material";

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
    </ShopLayout>
  );
}
