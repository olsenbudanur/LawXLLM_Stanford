import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Navbar } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import * as S from "./Home.styles";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { Alert } from "@mui/material";
import Steps from "../../components/HomeSections/Steps";

const exampleEssay1 = require("../../assets/Essay1.png");
const exampleEssay2 = require("../../assets/Essay2.png");
const exampleEssay3 = require("../../assets/Essay3.png");
const openAI = require("../../assets/openai.png");

function Home() {
	const [pageCount, setPageCount] = useState("2");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailExists, setEmailExists] = useState<boolean>(false);
	const { signUp, linkSignIn, currentUser }: any = useAuth();
	const [loginError, setLoginError] = React.useState<boolean>(false);
	const [blink, setBlink] = useState(true);
	// const interval = setInterval(() => setTime(Date.now()), 1000);

	// while(true){
	// 	setBlink(!blink);
	// };

	const navigate = useNavigate();

	const navigateToPrompt = async () => {
		setEmail(email.toLowerCase());
		//
		// If logged in.
		if (currentUser) {
			navigate("/prompts");
		} else {
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
			// Validate the email using a regular expression
			const emailRegex =
				/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
			if (emailRegex.test(email)) {
				setEmailError(false);
			} else {
				setEmailError(true);
				return;
			}

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
						navigate("/prompts");
					})
					.catch((error: any) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode, errorMessage);
					});
			}
		}
	};
	const handleCountChange = (event: any) => {
		setPageCount(event.target.value);
	};

	const handleEmailChange = (event: any) => {
		setEmail(event.target.value);
	};

	return (
		<S.Wrapper>
			<S.Sec1Wrapper>
				<S.TextLoginWrapper>
					<S.TextWrapper>
						<S.Title>
							<TypeAnimation
								sequence={[
									"Do you have a consumer claim? CLL{AI}M BOT is here for you!",
								]}
								speed={80}
							/>
						</S.Title>
						<S.SubTitle>
							Analyze your case using the same AI
							model that powers ChatGPT{" "}
							<S.openAILogo src={String(openAI)} />{" "}
							and evaluate your next steps using our custom case-specific chat bot
							{blink ? "!" : ""}
						</S.SubTitle>

						<S.Title>Try Now!</S.Title>
						<S.SubTitle>
							Enter your email, and follow the steps.
						</S.SubTitle>
					</S.TextWrapper>
					<S.LoginWrapper>
						{!currentUser && (
							<S.LoginHeader>
								Generate your case evaluation & bot!
							</S.LoginHeader>
						)}
						{currentUser && (
							<S.LoginHeader>
								Generate your case evaluation & bot!
							</S.LoginHeader>
						)}
						{emailExists && (
							<>
								<Alert severity="info">
									This email already exists.
									Please log in through the
									link sent to the email.
									(Make sure to check spam)
								</Alert>
							</>
						)}
						{loginError && (
							<Alert severity="error">
								There has been an error. Please
								try again or contact support.
							</Alert>
						)}
						{emailError && (
							<Alert severity="error">
								Please enter a valid email.
							</Alert>
						)}
						{!currentUser && (
							<TextField
								label="Please Enter your Email"
								fullWidth
								value={email}
								error={emailError}
								onChange={handleEmailChange}
								placeholder="Your Email..."
							/>
						)}
						{currentUser && (
							<S.CurrUser>
								Currently logged in as{" "}
								{currentUser.email}
							</S.CurrUser>
						)}
						
						{!currentUser && (
							<Button
								fullWidth
								sx={{
									marginTop: 2,
									height: 50,
									borderRadius: 10,
								}}
								variant="contained"
								onClick={navigateToPrompt}
							>
								Continue
							</Button>
						)}
						{currentUser && (
							<Button
								fullWidth
								sx={{
									marginTop: 2,
									height: 50,
									borderRadius: 10,
								}}
								variant="contained"
								onClick={navigateToPrompt}
							>
								Continue
							</Button>
						)}
					</S.LoginWrapper>
				</S.TextLoginWrapper>
			</S.Sec1Wrapper>

			<S.Sec2Wrapper>
				<S.Title>How CLL &#123;AI&#125; M BOT works</S.Title>
				<Steps />
			</S.Sec2Wrapper>
			
		</S.Wrapper>
	);
}

export default Home;
