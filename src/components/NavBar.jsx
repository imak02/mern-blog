import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  CircularProgress,
  Divider,
  Fab,
  ListItemIcon,
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
  Search,
  Directions,
  PostAdd,
  BorderColor,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import "./NavBar.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/ThemeContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { myThemeMode, setMyThemeMode } = useContext(DarkModeContext);

  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;
  const user = auth.user ?? "";

  useEffect(() => {
    if (isLoggedIn) {
      const getUser = async () => {
        try {
          const response = await axios.get("/user/current-user");
          auth.setUser(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [isLoggedIn]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ borderBottom: "5px solid red" }}>
      <Container maxWidth="false">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
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
              flexGrow: 2,
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
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 3,
              flexGrow: 1,
            }}
          >
            <NavLink className="links" to="/blog/create">
              <Tooltip arrow title="Create post">
                <Fab
                  aria-label="Write"
                  size="medium"
                  variant="extended"
                  color="success"
                >
                  <PostAdd sx={{ mr: 1 }} />
                  Create Post
                </Fab>
              </Tooltip>
            </NavLink>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              mr: 1,
            }}
          >
            <NavLink className="links" to="/blog/create">
              <Tooltip arrow title="Create post">
                <Fab
                  aria-label="Write"
                  size="small"
                  variant="circular"
                  color="warning"
                >
                  <PostAdd fontSize="small" />
                </Fab>
              </Tooltip>
            </NavLink>
          </Box>
          <Box
            sx={{
              mr: { md: 4 },
              display: "inline-flex",
              order: { xs: -1, md: 0 },
              color: "black",
            }}
          >
            {myThemeMode === "light" ? (
              <Tooltip arrow title="Dark mode">
                <Fab
                  aria-label="DarkMode"
                  size="small"
                  onClick={() => setMyThemeMode("dark")}
                >
                  <DarkMode fontSize="small" />
                </Fab>
              </Tooltip>
            ) : (
              <Tooltip arrow title="Light mode">
                <Fab
                  aria-label="LightMode"
                  size="small"
                  onClick={() => setMyThemeMode("light")}
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
                  {/* {userResult.isLoading ? (
                    <CircularProgress />
                  ) : ( */}
                  <Avatar sx={{ bgcolor: "orange", color: "black" }}>
                    {user.name}
                  </Avatar>
                  {/* )} */}
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
                <Link to={`/profile`} className="links">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Avatar>{user.name}</Avatar> {user.name}
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
                    auth.logout();
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
