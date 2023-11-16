import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  updateQuantity: (quantity: number) => void;
  currentValue: number;
  maxValue: number;
}

const ItemCounter = ({ updateQuantity, currentValue, maxValue }: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={() =>
          currentValue > 1 ? updateQuantity(currentValue - 1) : null
        }
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {currentValue}
      </Typography>
      <IconButton
        onClick={() =>
          currentValue < maxValue ? updateQuantity(currentValue + 1) : null
        }
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
