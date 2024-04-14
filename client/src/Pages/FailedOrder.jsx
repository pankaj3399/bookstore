import { Box } from "@mui/material";

const FailedOrder = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <p>
        <b>Oh no! The inventory got sold out! Visit later to shop more.</b>
      </p>
    </Box>
  );
};

export default FailedOrder;
