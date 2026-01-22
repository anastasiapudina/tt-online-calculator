import { Container, ThemeProvider, createTheme } from "@mui/material"

import { RiskCalculator } from "./widgets/RiskCalculator"
import { ProbabilityCalculator } from "./widgets/ProbabilityCalculator"
import { observer } from "mobx-react-lite"
import { CalculatorType, RootStore } from "./store/store"
import Select from "react-select"

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
})

export const App = observer(() => {
	return (
		<ThemeProvider theme={lightTheme}>
			<Container
				sx={{
					display: "flex",
					height: !RootStore.calculatorType ? "100vh" : "auto",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 1,
				}}>
				<Select
					options={[
						{
							value: CalculatorType.Probability,
							label: "Вероятность прогрессирования",
						},
						{
							value: CalculatorType.Risk,
							label: "Оценка риска",
						},
					]}
					onChange={item => item && RootStore.setCalculatorType(item.value)}
					placeholder="Выберите калькулятор"
				/>
			</Container>
			<Container sx={{ display: "flex", flexDirection: "row" }}>
				{!!RootStore.calculatorType ? (
					RootStore.calculatorType === CalculatorType.Probability ? (
						<ProbabilityCalculator />
					) : (
						<RiskCalculator />
					)
				) : null}
			</Container>
		</ThemeProvider>
	)
})
