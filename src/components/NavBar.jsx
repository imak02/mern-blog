import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  CircularProgress,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Paper,
  InputBase,
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";
import {
  DarkMode,
  Fitbit,
  LightMode,
  Logout,
  PersonAdd,
  PersonPin,
  Settings,
  Inbox,
  Mail,
  Search,
  Directions,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import "./NavBar.scss";
import { useState } from "react";

let isLoggedIn = false;
let themeMode = "light";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",

              "&:hover": {
                color: "green",
              },
            }}
          >
            {" "}
            <Link to="/" className="logo__link">
              <Fitbit
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  mt: 0.5,
                  color: "inherit",
                }}
              />
              Wordify
            </Link>
          </Typography>

          <Link to="/" className="links logo__link">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",

                "&:hover": {
                  color: "green",
                },
              }}
            >
              {" "}
              <Fitbit
                sx={{
                  display: { xs: "flex", md: "none" },

                  mr: 1,
                  color: "inherit",
                }}
              />
              Wordify
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search For Blogs, People, Categories"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <Directions />
              </IconButton>
            </Paper>
          </Box>
          {/* <Box sx={{}}> */}
          <Box
            sx={{
              mr: { md: 4 },
              display: "inline-flex",
              order: { xs: -1, md: 0 },
            }}
          >
            {themeMode === "light" ? (
              <Tooltip arrow title="Dark mode">
                <Fab
                  aria-label="DarkMode"
                  size="small"
                  onClick={() => dispatch(dark())}
                >
                  <DarkMode fontSize="small" />
                </Fab>
              </Tooltip>
            ) : (
              <Tooltip arrow title="Light mode">
                <Fab
                  aria-label="LightMode"
                  size="small"
                  onClick={() => dispatch(light())}
                >
                  <LightMode fontSize="small" />
                </Fab>
              </Tooltip>
            )}
          </Box>
          {!isLoggedIn ? (
            <Box sx={{ flexGrow: 0, display: "inline-block" }}>
              <Tooltip title="User Login" arrow>
                <IconButton sx={{ p: 0 }}>
                  <Link to="/login">
                    <Avatar sx={{ bgcolor: "green" }}>
                      <PersonPin sx={{ color: "white" }} />
                    </Avatar>
                  </Link>
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip arrow title="Profile Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {userResult.isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Avatar
                      alt={user.firstName}
                      src="profile.jpeg"
                      sx={{ bgcolor: "orange", color: "black" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    overflow: "visible",

                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: -1,
                    },
                  },
                }}
              >
                <Link to={`/profile/${user._id}`} className="links">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Avatar alt={user.firstName} src="profile.jpeg" />{" "}
                    {user.firstName + " " + user.lastName}
                  </MenuItem>
                </Link>

                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
          {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
