import { Container, ThemeProvider, createTheme } from "@mui/material"

//import { RiskCalculator } from "./widgets/RiskCalculator"
import { ProbabilityCalculator } from "./widgets/ProbabilityCalculator"
import { observer } from "mobx-react-lite"

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
})

export const App = observer(() => {
	return (
		<ThemeProvider theme={lightTheme}>
			<Container sx={{ display: "flex", flexDirection: "row" }}>
				<ProbabilityCalculator />
			</Container>
		</ThemeProvider>
	)
})
