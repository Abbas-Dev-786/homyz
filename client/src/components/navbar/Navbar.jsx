import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import AuthBtns from "./AuthBtns";
import useAuth from "../../hooks/useAuth";

const pages = [
  { label: "Home", link: "/" },
  { label: "Properties", link: "/properties" },
  { label: "Contact Us", link: "/contact" },
];

const Navbar = () => {
  const { user } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#141110", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
          disableGutters
        >
          <Logo color="white" />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <NavLink to={page.link} key={page.label}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              // aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <NavLink to={page.link} key={page.label}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Logo color="white" sm />

          {user ? <UserMenu /> : <AuthBtns />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
