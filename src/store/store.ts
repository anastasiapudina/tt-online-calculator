import { action, makeObservable, observable } from "mobx"
import { ProbabilityCalculatorManager } from "./ProbabilityCalculatorManager"
import { RiskCalculatorManager } from "./RiskCalculatorManager"

export enum CalculatorType {
	None = 0,
	Risk = 1,
	Probability = 2,
}

export class Store {
	RiskCalculator = new RiskCalculatorManager()
	ProbabilityCalculator = new ProbabilityCalculatorManager()

	constructor() {
		makeObservable(this, {
			calculatorType: observable,
			setCalculatorType: action,
		})
	}

	calculatorType: CalculatorType = CalculatorType.None
	setCalculatorType = (type: CalculatorType) => (this.calculatorType = type)
}

export const RootStore = new Store()
