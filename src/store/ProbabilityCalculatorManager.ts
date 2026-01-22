import { action, computed, makeObservable, observable } from "mobx"

export class ProbabilityCalculatorManager {
	sitesQuantity: number = NaN
	timeWithoutProgress: number = NaN

	constructor() {
		makeObservable(this, {
			sitesQuantity: observable,
			setSitesQuantity: action,

			timeWithoutProgress: observable,
			setTimeWithoutProgress: action,

			totalProbability: computed,
		})
	}

	setSitesQuantity = (value: number | null) => {
		if (value !== null) this.sitesQuantity = value
	}
	setTimeWithoutProgress = (value: number | null) => {
		if (value !== null) this.timeWithoutProgress = value
	}

	private countDegree = (timeWithoutProgress: number) => {
		return (
			-0.776 + 0.486 * (this.sitesQuantity || 0) - 0.09 * timeWithoutProgress
		)
	}

	private countTotalProbability(timeWithoutProgress: number) {
		return (1 / (1 + Math.exp(-this.countDegree(timeWithoutProgress)))) * 100
	}

	get totalProbability() {
		return this.countTotalProbability(this.timeWithoutProgress || 0)
	}
}
