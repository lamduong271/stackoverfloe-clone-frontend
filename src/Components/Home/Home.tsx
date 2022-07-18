import { Box, TextField, Button } from "@mui/material";
import { FC } from "react";
import { HomeContainer } from "./Home.styles";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "80%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </Box>
      <Button onClick={() => navigate("/question")} variant="contained">
        Create Question
      </Button>
    </HomeContainer>
  );
};

export default Home;
