import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as S from "../Styles";

const screenshot1 = require("../../assets/screenshot1.png");
const screenshot2 = require("../../assets/screenshot2.png");
const screenshot3 = require("../../assets/screenshot3.png");
const screenshot4 = require("../../assets/screenshot4.jpeg");

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const steps = [
	{
		label: "Log in with email",
		description:
			"Log in with email",
	},
	{
		label: "Basic info",
		description: `Fill out some basic information about your case.`,
	},
	{
		label: "Advanced info",
		description:
			"Provide us with further information regarding your case.",
	},
	{
		label: "Similar cases + case-specific chat bot",
		description: `We will provide you with similar cases to yours through semantic search, and let you ask questions to our AI powered chat bot. Lastly, we give you optional next steps.`,
	},
];

export default function Steps() {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<S.stepsWrapper>
			<Box sx={{ maxWidth: 800, minHeight: 400 }}>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((step, index) => (
						<Step key={step.label}>
							<StepLabel
								componentsProps={{
									label: {
										style: {
											color: "#fff",
										},
									},
								}}
							>
								{step.label}
							</StepLabel>
							<StepContent>
								<Typography>
									{step.description}
								</Typography>
								<Box sx={{ mb: 2 }}>
									<div>
										{index !=
										steps.length - 1 ? (
											<Button
												variant="contained"
												onClick={
													handleNext
												}
												sx={{
													mt: 1,
													mr: 1,
												}}
											>
												Continue
											</Button>
										) : null}
										{index != 0 ? (
											<Button
												onClick={
													handleBack
												}
												sx={{
													mt: 1,
													mr: 1,
													color: "#fff",
												}}
											>
												Back
											</Button>
										) : null}
									</div>
								</Box>
							</StepContent>
						</Step>
					))}
				</Stepper>
			</Box>
			<div
				style={{
					display: "grid",
					placeItems: "center",
				}}
			>
				{<S.photo src={String(screenshots[activeStep])} />}
			</div>
		</S.stepsWrapper>
	);
}
