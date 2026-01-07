import {
	Container,
	Typography,
	ThemeProvider,
	createTheme,
	FormControlLabel,
	Checkbox,
	Card,
	Stack,
	Box,
	Divider,
} from "@mui/material"
import NumberField from "./components/NumberField"
import { BaseRiskValues } from "./store/constants"
import { observer } from "mobx-react-lite"
import { Store } from "./store/store"

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
})

export const App = observer(() => {
	return (
		<ThemeProvider theme={lightTheme}>
			<Container maxWidth="sm">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "1.5rem",
					}}>
					<Typography variant="subtitle1" component="p" align="center">
						Калькулятор балльной шкалы риска для общей выживаемости пациентов,
						получающих повторную ТТ
					</Typography>

					<Card
						variant="outlined"
						sx={{ p: "1rem" }}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0.5rem",
						}}>
						<NumberField
							label="Период наблюдения, мес"
							min={0}
							max={100}
							size="small"
							onValueChange={Store.setObservablePeriod}
							value={Store.observablePeriod}
						/>

						<table>
							<thead>
								<tr>
									<td>
										<Stack direction="row">
											<Typography textAlign="center" variant="body2" flex={1}>
												Период наблюдения, мес.
											</Typography>
											<Typography textAlign="center" variant="body2" flex={1}>
												Общая выживаемость h₀(t), %
											</Typography>
										</Stack>
									</td>
								</tr>
							</thead>
							<tbody>
								{BaseRiskValues.map(row => (
									<tr key={row.id}>
										<td>
											<Stack
												direction="row"
												borderRadius="0.25rem"
												sx={{
													bgcolor:
														Store.baseRisk === row.survival
															? "secondary.main"
															: undefined,
												}}>
												<Typography textAlign="center" variant="body2" flex={1}>
													{row.period}
												</Typography>
												<Typography textAlign="center" variant="body2" flex={1}>
													{row.survival}
												</Typography>
											</Stack>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</Card>

					<FormControlLabel
						control={<Checkbox />}
						//Xоо – достижение объективного ответа на фоне первичной ТТ (0 – достигнут, 1 – не достигнут)
						label="Достижение объективного ответа на фоне первичной ТТ"
						checked={Store.objectiveAnswer}
						onChange={Store.toggleObjectiveAnswer}
					/>

					<FormControlLabel
						control={<Checkbox />}
						//XпрогрТТ1 – прогрессирование на фоне первичной ТТ (0 – нет прогрессирования, 1 – было зарегистрировано прогрессирование)
						label="Прогрессирование на фоне первичной ТТ"
						checked={Store.progressOnPrimaryTherapy}
						onChange={Store.toggleProgressOnPrimaryTherapy}
					/>

					<NumberField
						//XвбпТТ1 – ВБП на фоне первичной ТТ (0 – более 13 месяцев, 1 – 13 месяцев и менее)
						label="ВБП на фоне первичной ТТ"
						helperText="Количество месяцев"
						min={0}
						max={100}
						size="small"
						onValueChange={Store.setTimeWithoutProgressionOnPrimaryTherapy}
						value={Store.timeWithoutProgressionOnPrimaryTherapy}
					/>

					<NumberField
						//XбезТТ – время без проведения ТТ (от момента первичной ТТ) (0 – более 17 месяцев, 1 – 17 месяцев и менее)
						label="Время без проведения ТТ (от момента первичной ТТ)"
						helperText="Количество месяцев"
						min={0}
						max={100}
						size="small"
						onValueChange={Store.setTimeWithoutTherapy}
						value={Store.timeWithoutTherapy}
					/>
					<Divider />
					<Box
						sx={{
							fontFamily: "courier new",
							textAlign: "center",
						}}>
						<i>h</i>(<i>t</i>)=<i>h</i>
						<sub>0</sub>(<i>t</i>)e
						<sup>
							(2.554<i>X</i>
							<sub>оо</sub> + 2.331<i>X</i>
							<sub>прогрТТ1</sub> + 1.916<i>X</i>
							<sub>ВБТТ1</sub> + 3.178<i>X</i>
							<sub>безТТ</sub>)
						</sup>
					</Box>
					<Box>
						<Typography variant="body2">
							<i>h</i>
							<sub>0</sub>(<i>t</i>){" "}
							{Store.baseRisk && (
								<>
									= <b>{Store.baseRisk}% </b>
								</>
							)}
							– базовый риск летального исхода в течение срока наблюдения t
						</Typography>
						<Typography variant="body2">
							<i>X</i>
							<sub>оо</sub> = <b>{!Store.objectiveAnswer ? "1" : "0"}</b> –
							достижение объективного ответа на фоне первичной ТТ
						</Typography>
						<Typography variant="body2">
							<i>X</i>
							<sub>прогрТТ1</sub> =
							<b>{Store.progressOnPrimaryTherapy ? " 1" : " 0"}</b> –
							прогрессирование на фоне первичной ТТ
						</Typography>
						<Typography variant="body2">
							<i>X</i>
							<sub>ВБТТ1</sub> =
							<b>
								{Store.timeWithoutProgressionOnPrimaryTherapyBool
									? " 1 "
									: " 0 "}
							</b>
							– ВБП на фоне первичной ТТ (0 – более 13 месяцев, 1 – 13 месяцев и
							менее)
						</Typography>
						<Typography variant="body2">
							<i>X</i>
							<sub>безТТ</sub> =
							<b>{Store.timeWithoutTherapyBool ? " 1 " : " 0 "}</b> – время без
							проведения ТТ (0 – более 17 месяцев, 1 – 17 месяцев и менее)
						</Typography>
					</Box>
					{!!Store.totalRisk && (
						<Box>
							<Typography variant="h4" textAlign="center">
								Риск смерти пациента
							</Typography>
							<Typography variant="h2" textAlign="center">
								{Store.totalRisk.toFixed(1)}%
							</Typography>
						</Box>
					)}
				</Box>
			</Container>
		</ThemeProvider>
	)
})
