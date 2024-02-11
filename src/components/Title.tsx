import { Stack, Typography } from "@mui/material";
import Jslogo from "./Jslogo";

const Title = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
    >
      <Jslogo />
      <Typography variant="h2" component={"h1"}>
        JS Quiz
      </Typography>
    </Stack>
  );
};

export default Title;
