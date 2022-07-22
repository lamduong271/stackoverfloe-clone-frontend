import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import { useAppContext } from "../../Services/app-context";
import { Button } from "../Login/Login.styles";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Stackoverflow-Clone
            </Typography>

            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                  <div>{user.name}</div>
                </Box>
              </Box>
            )}
            <Button onClick={onLogOut}>Logout</Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
