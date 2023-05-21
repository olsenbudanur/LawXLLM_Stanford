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
import * as S from "./Payment.styles";
import { Alert, CircularProgress } from "@mui/material";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SummaryPage from "./SummaryPage";
import Cookies from "js-cookie";

const exampleEssay = require("../../assets/blurEssay.png");

export default function Payment() {
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [purchase, setPurchase] = useState(false);
	const toEssay = () => {
		Cookies.set("state", JSON.stringify(location.state), {
			expires: 7,
		});
		setTimeout(() => {
			setLoading(false);
		}, 10000);
	};

	useEffect(() => {
		toEssay();
	}, []);

	return (
		<>
			<div
				style={{
					display: loading ? "none" : "block",
				}}
			>
				<S.Sec2Wrapper>
					<div
						style={{
							display: purchase ? "none" : "block",
						}}
					>
						<S.Sec2Wrapper>
							<h1>Report + Chatbot is Ready!</h1>
							<br></br>
							<S.Image src={String(exampleEssay)} />

							<Button
								onClick={() => {
									setPurchase(true);
								}}
								sx={{
									my: 2,
									background: "#1b58bd",
									color: "white",
									display: "block",
								}}
								color="inherit"
							>
								Get the information!
							</Button>
						</S.Sec2Wrapper>
					</div>

					<div
						style={{
							display: purchase ? "block" : "none",
						}}
					>
						<SummaryPage></SummaryPage>
					</div>
				</S.Sec2Wrapper>
			</div>
			<div style={{ display: loading ? "block" : "none" }}>
				<S.Sec2Wrapper>
					<S.LoadingWrapper>
						<h1>Gathering information through semantic search with embeddings</h1>
						<br></br>
						<CircularProgress></CircularProgress>
					</S.LoadingWrapper>
				</S.Sec2Wrapper>
			</div>
		</>
	);
}
