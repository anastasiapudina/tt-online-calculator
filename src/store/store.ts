import { ProbabilityCalculatorManager } from "./ProbabilityCalculatorManager"
import { RiskCalculatorManager } from "./RiskCalculatorManager"

export const Store = {
	RiskCalculator: new RiskCalculatorManager(),
	ProbabilityCalculator: new ProbabilityCalculatorManager(),
}
