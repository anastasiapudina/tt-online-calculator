import { Container, ThemeProvider, createTheme } from "@mui/material"

import { RiskCalculator } from "./widgets/RiskCalculator"
import { ProbabilityCalculator } from "./widgets/ProbabilityCalculator"

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
})

export const App = () => {
	return (
		<ThemeProvider theme={lightTheme}>
			<Container sx={{ display: "flex", flexDirection: "row" }}>
				<RiskCalculator />
				<ProbabilityCalculator />
			</Container>
		</ThemeProvider>
	)
}
