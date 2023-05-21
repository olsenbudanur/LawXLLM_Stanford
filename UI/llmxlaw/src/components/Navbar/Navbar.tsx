import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../Context/AuthContext";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const pages = [];
const logo = require("../../assets/croppedLogo.png");

function Navbar() {
	const { signUp, linkSignIn, currentUser, logOut }: any = useAuth();
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] =
		React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	function navigateLogin() {
		navigate("/login");
	}

	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
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
						<Box
							component="img"
							sx={{
								height: 70,
								width: 70,
								padding: 2,
								// maxHeight: { xs: 233, md: 167 },
								// maxWidth: { xs: 350, md: 250 },
							}}
							alt="Logo"
							src={logo}
						/>
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						{/* <IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton> */}
						{/* <Menu
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
								display: {
									xs: "block",
									md: "none",
								},
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={
										handleCloseNavMenu
									}
								>
									<Typography textAlign="center">
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu> */}
					</Box>

					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						<span>&nbsp;&nbsp;</span>
						<span>&nbsp;&nbsp;</span>
						<span>&nbsp;&nbsp;</span>
						<span>&nbsp;</span>
						<Box
							component="img"
							sx={{
								height: 70,
								width: 70,
								padding: 2,
								// maxHeight: { xs: 233, md: 167 },
								// maxWidth: { xs: 350, md: 250 },
							}}
							alt="logo"
							src={logo}
						/>
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{/* {pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								{page}
							</Button>
						))} */}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Toolbar>
							{currentUser && (
								<Button
									onClick={logOut}
									sx={{
										my: 2,
										background: "blue",
										color: "white",
										display: "block",
									}}
									color="inherit"
								>
									Log Out
								</Button>
							)}
							{!currentUser && (
								<Button
									onClick={navigateLogin}
									sx={{
										my: 2,
										background:
											"#1b58bd",
										color: "white",
										display: "block",
									}}
									color="inherit"
								>
									Log In
								</Button>
							)}
						</Toolbar>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
