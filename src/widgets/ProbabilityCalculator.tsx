import { Container, Typography, Box, Divider, Button } from "@mui/material"
import NumberField from "../components/NumberField"
import { timeLine } from "../store/constants"
import { observer } from "mobx-react-lite"
import { Store } from "../store/store"
import { LineChart } from "@mui/x-charts"

export const ProbabilityCalculator = observer(() => {
	const store = Store.ProbabilityCalculator
	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1.5rem",
				}}>
				<Typography variant="subtitle1" component="p" align="center">
					Прогностическая модель для определения вероятности ВПР плода в
					зависимости от анамнестических факторов методом бинарной логистической
					регрессии
				</Typography>

				<NumberField
					label="Количество сайтов метастазирования"
					helperText="Количество органов с зарегистрированными отдаленными метастазами"
					min={0}
					max={100}
					size="small"
					onValueChange={store.setSitesQuantity}
					value={store.sitesQuantity || 0}
				/>
				<NumberField
					label="Время без прогрессирования на первичной ТТ"
					helperText="Полных лет"
					min={0}
					max={100}
					size="small"
					onValueChange={store.setTimeWithoutProgress}
					value={store.timeWithoutProgress || 0}
				/>

				{!!store.grahpData.length && (
					<LineChart
						xAxis={[{ data: timeLine.map(item => item.months) }]}
						series={[
							{
								data: store.grahpData,
								type: "line",
								strictStepCurve: true,
								curve: "stepBefore",
								showMark: false,
							},
						]}
						height={300}
						grid={{ vertical: true, horizontal: true }}
					/>
				)}
				<Button
					color="secondary"
					variant="contained"
					onClick={store.buildGraph}>
					{!!store.grahpData.length ? "Перестроить график" : "Построить график"}
				</Button>

				<Divider />
				<Box
					sx={{
						fontFamily: "courier new",
						textAlign: "center",
					}}>
					<i>
						z = -0.776 + 0.486X<sub>кол-во сайтов мтс</sub> – 0.090X
						<sub>ВБП1</sub>
					</i>
					<br />
					<br />
					<i>P</i>(<i>t</i>)
					<i>
						= 1/(1 + e<sup>-z</sup>) * 100%
					</i>
				</Box>
				{!isNaN(store.sitesQuantity as number) &&
					!isNaN(store.sitesQuantity as number) && (
						<Box>
							<Typography variant="h4" textAlign="center">
								Вероятность смерти пациента
							</Typography>
							<Typography variant="h2" textAlign="center">
								{store.totalProbability.toFixed(1)}%
							</Typography>
						</Box>
					)}
			</Box>
		</Container>
	)
})
