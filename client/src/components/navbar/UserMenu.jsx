import { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  Avatar,
  MenuItem,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { removeUser, user } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    const result = removeUser();

    navigate("/");

    result
      ? toast.success("Logout Successfull")
      : toast.error("user does not exists");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <NavLink to="/user/profile">
          <MenuItem>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
        </NavLink>
        {user.isSeller && (
          <NavLink to="/user/dashboard">
            <MenuItem>
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
          </NavLink>
        )}
        <MenuItem onClick={logoutHandler}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
