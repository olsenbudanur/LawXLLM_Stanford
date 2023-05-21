import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Paper } from "@mui/material";

export default function StickyFooter() {
	return (
		<Paper
			sx={{
				bottom: 0,
				width: "100%",
				background: "#d7e5fc",
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						flexGrow: 1,
						justifyContent: "center",
						display: "flex",
						my: 1,
					}}
				></Box>

				<Box
					sx={{
						flexGrow: 1,
						justifyContent: "center",
						display: "flex",
						mb: 2,
					}}
				>
					<Typography variant="caption" color="initial">
						Copyright ©2022. Contact us at
						olsenbudanur@gmail.com
					</Typography>
				</Box>
			</Container>
		</Paper>
	);
}
