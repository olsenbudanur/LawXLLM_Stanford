import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as S from "./ConfirmLogin.styles";
import { Alert } from "@mui/material";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function ConfirmLogin() {
	const { linkSignIn, currentUser, linkSignInComplete }: any = useAuth();
	const [currEmail, setCurrEmail] = React.useState<string>("");
	const [emailExists, setEmailExists] = React.useState<boolean>(true);
	const [emailError, setEmailError] = React.useState<boolean>(false);
	const [loginError, setLoginError] = React.useState<boolean>(false);

	React.useEffect(() => {
		try {
			let email = window.localStorage.getItem("emailForSignIn");
			if (!email) {
				// User opened the link on a different device. To prevent session fixation
				// attacks, ask the user to provide the associated email again. For example:
				setEmailExists(false);
			} else {
				linkSignInComplete(email);
			}
		} catch {
			setLoginError(true);
		}
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		linkSignInHelper(data.get("email"));
	};

	function linkSignInHelper(currEmail: any) {
		try {
			const emailRegex =
				/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
			if (emailRegex.test(currEmail)) {
				setEmailError(false);
				linkSignInComplete(currEmail);
			} else {
				setEmailError(true);
			}
		} catch {
			setLoginError(true);
		}
	}

	return (
		<>
			{/* <ThemeProvider theme={theme}> */}
			<S.Sec2Wrapper>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar
							sx={{
								m: 1,
								bgcolor: "secondary.main",
							}}
						>
							<LockOutlinedIcon />
						</Avatar>
						<br></br>
						{!emailExists && (
							<Alert severity="info">
								Please confirm your email using
								the form below.
							</Alert>
						)}
						{emailError && (
							<Alert severity="error">
								Please enter a valid email.
							</Alert>
						)}
						{loginError && (
							<Alert severity="error">
								There has been an error. Please
								try again or contact support.
							</Alert>
						)}
						<br></br>
						<Typography
							sx={{
								display: "flex",
								alignItems: "center",
							}}
							component="h1"
							variant="h6"
						>
							Please Re-Confirm Your Email
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Confirm Email
							</Button>
						</Box>
					</Box>
				</Container>
			{/* </ThemeProvider> */}
			</S.Sec2Wrapper>
		</>
	);
}

export default ConfirmLogin;
