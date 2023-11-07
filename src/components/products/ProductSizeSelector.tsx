import { Box, Button } from "@mui/material";
import { ISize } from "../../../interfaces";

interface Props {
  selectedSize?: string;
  sizes: ISize[];
}

const ProductSizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" color={selectedSize === size ? 'primary' : 'info'}>
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default ProductSizeSelector;
