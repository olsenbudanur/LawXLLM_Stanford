import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";
import { redirect } from "react-router-dom";
import * as S from "./Prompts.styles";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const steps = ["Pick Issue Track", "Describe Issue", "We Find Relevent Cases & Prep AI"];

export default function Prompts() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [collegeName, setCollegeName] = React.useState("");
	const [prompt, setPrompt] = React.useState("");
	const [promptTopic, setPromptTopic] = React.useState("");
	const [mood, setMood] = React.useState("");
	const [pageCount, setPageCount] = React.useState("2");
	const [writtenEssay, setWrittenEssay] = React.useState("");
	const [hobby, setHobby] = React.useState("");
	const [hobbyTime, setHobbyTime] = React.useState("");
	const [hobbyFav, setHobbyFav] = React.useState("");
	const [hobbyLearned, setHobbyLearned] = React.useState("");
	const [hobbyLeadership, setHobbyLeadership] = React.useState("");
	const [event, setEvent] = React.useState("");
	const [childhood, setChildhood] = React.useState("");
	const [anything, setAnything] = React.useState("");

	const { currentUser }: any = useAuth();
	const [error, setError] = React.useState(false);
	const navigate = useNavigate();

	const toPayment = () => {
		navigate("/payment", {
			state: {
				subissue: hobby,
				query: hobbyFav,
			},
		});
	};

	const handleCountChange = (event: any) => {
		setPageCount(event.target.value);
	};

	//
	// If not logged in..
	React.useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, []);

	const handleNext = () => {
		if (
			(prompt === "" && activeStep === 0) ||
			(mood === "" && activeStep === 0) ||
			(hobby === "" && activeStep === 1) ||
			(hobbyTime === "" && activeStep === 1) ||
			(hobbyFav === "" && activeStep === 1) ||
			(writtenEssay === "" && activeStep === 1) 

		) {
			setError(true);
			return;
		}

		if (activeStep == steps.length - 2) {	
			toPayment();
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handlePromptChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPrompt((event.target as HTMLInputElement).value);
	};

	return (
		<S.Sec2Wrapper>
			<S.StepperWrapper>
				{currentUser && (
					<Box sx={{ width: "100%" }}>
						<Stepper activeStep={activeStep}>
							{steps.map((label) => {
								const stepProps: {
									completed?: boolean;
								} = {};
								const labelProps: {
									optional?: React.ReactNode;
								} = {};

								return (
									<Step
										key={label}
										{...stepProps}
									>
										<StepLabel
											{...labelProps}
										>
											{label}
										</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === steps.length || (
							<React.Fragment>
								{activeStep === 0 && (
									<S.FormWrapper>
										<FormControl>
											<FormLabel>
												I am a...
											</FormLabel>
											<RadioGroup
												value={
													prompt
												}
												onChange={
													handlePromptChange
												}
											>
												<FormControlLabel
													value="Personal Statement"
													control={
														<Radio />
													}
													label="Lawyer, Attorney, or Legal Professional"
												/>
												<FormControlLabel
													value="Custom Prompt"
													control={
														<Radio />
													}
													label="Consumer"
												/>
											</RadioGroup>
										</FormControl>

										{prompt ===
											"Custom Prompt" && (
											<h1>Coming Soon!</h1>
										)}
										<FormControl
											fullWidth
										>
											<InputLabel id="demo-simple-select-helper-label">
												Issue Topic
											</InputLabel>
											<Select
												value={
													mood
												}
												label="Mood"
												onChange={(
													event
												) => {
													setMood(
														event
															.target
															.value
													);
												}}
											>
												<MenuItem value="Debt Collection/Credit Reports/Financial">
												Debt Collection/Credit Reports/Financial
												</MenuItem>
												<MenuItem value="Privacy/Data Security">
													Privacy/Data Security
												</MenuItem>
												<MenuItem value="Product Safety">
													Product Safety
												</MenuItem>
												<MenuItem value="Advertising">
													Advertising
												</MenuItem>
												<MenuItem value="Insurance">
													Insurance
												</MenuItem>
												<MenuItem value="Investments/Securities">
													Investments/Securities
												</MenuItem>
												<MenuItem value="Children's Issues">
													Children's Issues
												</MenuItem>
												<MenuItem value="Labor/Employment">
													Labor/Employment
												</MenuItem>
											</Select>
										</FormControl>
										
									</S.FormWrapper>
								)}

								{activeStep === 1 && (
									<S.FormWrapper>
										<FormControl
											fullWidth
										>
											<InputLabel id="demo-simple-select-helper-label">
												Complaint/Issue
											</InputLabel>
											<Select
												value={
													hobby
												}
												label="hobby"
												onChange={(
													event
												) => {
													setHobby(
														event
															.target
															.value
													);
												}}
											>
												<MenuItem value="You told them to stop contacting you, but they keep trying">
												You told them to stop contacting you, but they keep trying
												</MenuItem>
												<MenuItem value="Impersonated attorney, law enforcement, or government official">
												Impersonated attorney, law enforcement, or government official
												</MenuItem>
												<MenuItem value="Threatened or suggested your credit would be damaged">
												Threatened or suggested your credit would be damaged
												</MenuItem>
												<MenuItem value="Sued you in a state where you do not live or did not sign for the debt">
												Sued you in a state where you do not live or did not sign for the debt
												</MenuItem>
												<MenuItem value="Threatened to sue you for very old debt">
												Threatened to sue you for very old debt
												</MenuItem>
												<MenuItem value="Didn't receive enough information to verify debt">
												Didn't receive enough information to verify debt
												</MenuItem>
												<MenuItem value="Talked to a third-party about your debt">
												Talked to a third-party about your debt
												</MenuItem>
												<MenuItem value="Sued you without properly notifying you of lawsuit">
												Sued you without properly notifying you of lawsuit
												</MenuItem>
												<MenuItem value="Threatened to arrest you or take you to jail if you do not pay">
												Threatened to arrest you or take you to jail if you do not pay
												</MenuItem>
												<MenuItem value="Indicated you were committing crime by not paying debt">
												Indicated you were committing crime by not paying debt
												</MenuItem>
												<MenuItem value="Contacted you after you asked them to stop">
												Contacted you after you asked them to stop
												</MenuItem>
												<MenuItem value="Contacted you instead of your attorney">
												Contacted you instead of your attorney	
												</MenuItem>
												<MenuItem value="Contacted your employer">
												Contacted your employer
												</MenuItem>
												<MenuItem value="Didn't receive notice of right to dispute">
												Didn't receive notice of right to dispute
												</MenuItem>
												<MenuItem value="Notification didn't disclose it was an attempt to collect a debt">
												Notification didn't disclose it was an attempt to collect a debt
												</MenuItem>
												<MenuItem value="Seized or attempted to seize your property">
												Seized or attempted to seize your property
												</MenuItem>
												<MenuItem value="Threatened to turn you in to immigration or deport you">
												Threatened to turn you in to immigration or deport you
												</MenuItem>
												<MenuItem value="Told you not to respond to a lawsuit they filed against you">
												Told you not to respond to a lawsuit they filed against you
												</MenuItem>
												<MenuItem value="Other">
												Other
												</MenuItem>
											</Select>
										</FormControl>
										Company
										<TextField
											multiline
											value={
												writtenEssay
											}
											onChange={(
												e
											) => {
												setWrittenEssay(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										State
										<TextField
											required
											multiline
											value={
												hobbyTime
											}
											onChange={(
												e
											) => {
												setHobbyTime(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										Explain the complaint in detail
										<TextField
											rows={10}
											required
											value={
												hobbyFav
											}
											multiline
											onChange={(
												e
											) => {
												setHobbyFav(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 500,
											}}
										/>
										
									</S.FormWrapper>
								)}
								<Box
									sx={{
										display: "flex",
										flexDirection:
											"row",
										pt: 2,
									}}
								>
									<Button
										color="inherit"
										disabled={
											activeStep ===
											0
										}
										onClick={handleBack}
										sx={{ mr: 1 }}
									>
										Back
									</Button>
									<Box
										sx={{
											flex: "1 1 auto",
										}}
									/>

									<Button
										onClick={handleNext}
									>
										{activeStep ===
										steps.length - 1
											? "Finish"
											: "Next"}
									</Button>
								</Box>
								{error && (
									<Snackbar
										anchorOrigin={{
											vertical: "bottom",
											horizontal:
												"center",
										}}
										open={error}
										onClose={() => {
											setError(
												false
											);
										}}
										message="Please fill out the entire form"
									>
										<MuiAlert severity="error">
											Please fill
											out the entire
											form
										</MuiAlert>
									</Snackbar>
								)}
							</React.Fragment>
						)}
					</Box>
				)}
				{!currentUser}
			</S.StepperWrapper>
		</S.Sec2Wrapper>
	);
}
