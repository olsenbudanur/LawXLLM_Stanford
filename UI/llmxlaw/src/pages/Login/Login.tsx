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
import * as S from "./Login.styles";
import { Alert } from "@mui/material";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
	const [emailExists, setEmailExists] = React.useState<boolean>(false);
	const [emailError, setEmailError] = React.useState<boolean>(false);
	const [email, setEmail] = React.useState<string>("false");
	const [loginError, setLoginError] = React.useState<boolean>(false);
	const { signUp, linkSignIn, currentUser }: any = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		handleEmailSubmit(data.get("email"));
	};

	const handleEmailSubmit = (email: any) => {
		setEmail(email.toLowerCase());
		//
		// Validate the email using a regular expression
		const emailRegex =
			/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (emailRegex.test(email)) {
			navigateToPrompt(email);
			setEmailError(false);
		} else {
			setEmailError(true);
		}
	};

	const navigateToPrompt = async (email: any) => {
		//
		// Check if the email has an account already,
		// if it does, handle that case later with
		// email link log in.
		//
		// Otherwise, generate a new password, and create
		// a firebase account with the said password.
		// then auto log in and go to the prompt page.
		//
		// The password is just a filler, and is irrelevent.

		//
		// If this user exists..
		const methods = await fetchSignInMethodsForEmail(auth, email);
		if (methods.length > 0) {
			//
			// Need to send a OTP to the user here.
			setEmailExists(true);
			let response = await linkSignIn(email);
			if (response == -1) {
				setEmailExists(false);
				setEmailError(false);
				setLoginError(true);
				return;
			}
		} else {
			// //
			// // Create a user on the fly with just email...
			signUp(email)
				.then((userCredential: any) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					navigate("/prompts");
				})
				.catch((error: any) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorCode, errorMessage);
				});
		}
	};

	return (
		// <ThemeProvider theme={theme}>
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
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<br></br>
					{emailExists && (
						<>
							<Alert severity="info">
								This email already exists.
								Please log in through the link
								sent to the email. (Make sure to
								check spam)
							</Alert>
						</>
					)}
					{emailError && (
						<Alert severity="error">
							Please enter a valid email.
						</Alert>
					)}
					{loginError && (
						<Alert severity="error">
							There has been an error. Please try
							again or contact support.
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
						Sign In or Sign Up With Just Your Email!
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
							Sign In / Sign Up
						</Button>
					</Box>
				</Box>
			</Container>
			{/* </ThemeProvider> */}
		</S.Sec2Wrapper>
	);
}
