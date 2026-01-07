import { action, computed, makeObservable, observable } from "mobx"
import { BaseRiskValues } from "./constants"

class AppStore {
	constructor() {
		makeObservable(this, {
			baseRisk: computed,
			observablePeriod: observable,
			setObservablePeriod: action.bound,

			objectiveAnswer: observable,
			toggleObjectiveAnswer: action.bound,

			progressOnPrimaryTherapy: observable,
			toggleProgressOnPrimaryTherapy: action.bound,

			timeWithoutProgressionOnPrimaryTherapy: observable,
			setTimeWithoutProgressionOnPrimaryTherapy: action.bound,
			timeWithoutProgressionOnPrimaryTherapyBool: computed,

			timeWithoutTherapy: observable,
			setTimeWithoutTherapy: action.bound,
			timeWithoutTherapyBool: computed,
		})
	}

	observablePeriod: number | null = null

	setObservablePeriod = (value: number | null) => {
		this.observablePeriod = value
	}

	get baseRisk() {
		if (this.observablePeriod === null) return null

		let result = BaseRiskValues[BaseRiskValues.length - 1].survival

		let i = 0
		while (i < BaseRiskValues.length) {
			if (this.observablePeriod <= BaseRiskValues[i].period) {
				result = BaseRiskValues[i].survival
				break
			}
			i++
		}

		return result
	}

	public objectiveAnswer = false
	toggleObjectiveAnswer = () => (this.objectiveAnswer = !this.objectiveAnswer)

	public progressOnPrimaryTherapy = false
	toggleProgressOnPrimaryTherapy = () =>
		(this.progressOnPrimaryTherapy = !this.progressOnPrimaryTherapy)

	public timeWithoutProgressionOnPrimaryTherapy: number | null = null
	setTimeWithoutProgressionOnPrimaryTherapy = (value: number | null) =>
		(this.timeWithoutProgressionOnPrimaryTherapy = value)
	get timeWithoutProgressionOnPrimaryTherapyBool() {
		return this.timeWithoutProgressionOnPrimaryTherapy! <= 13
	}

	public timeWithoutTherapy: number | null = null
	setTimeWithoutTherapy = (value: number | null) =>
		(this.timeWithoutTherapy = value)
	get timeWithoutTherapyBool() {
		return this.timeWithoutTherapy! <= 17
	}

	get totalRisk() {
		const degree =
			2.554 * Number(!this.objectiveAnswer) +
			2.331 * Number(this.progressOnPrimaryTherapy) +
			1.916 * Number(this.timeWithoutProgressionOnPrimaryTherapyBool) +
			3.178 * Number(this.timeWithoutTherapyBool)

		return (this.baseRisk || 0) * Math.exp(degree)
	}
}

export const Store = new AppStore()
