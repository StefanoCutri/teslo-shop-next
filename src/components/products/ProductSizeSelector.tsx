import { Box, Button } from "@mui/material";
import { ISize } from "../../interfaces";

interface Props {
  selectedSize?: string;
  sizes: ISize[];

  // Methods
  onSelectedSize: (size: ISize) => void
}

const ProductSizeSelector = ({ selectedSize, sizes, onSelectedSize }: Props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" color={selectedSize === size ? 'primary' : 'info'} onClick={() => onSelectedSize(size)}>
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default ProductSizeSelector;
