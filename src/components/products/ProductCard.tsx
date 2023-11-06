import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { IProduct } from "../../../interfaces";

interface Props {
  product: IProduct;
}

const ProductCard = ({product}: Props) => {
  return (
    <Grid item xs={6} sm={4} key={product.slug}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`products/${product.images[0]}`}
            alt={product.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
