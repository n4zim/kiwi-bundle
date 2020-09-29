import { ConditionOperator } from "../../Context/Selectors/ConditionOperator"

export interface SelectorCondition {
  operator: ConditionOperator
  value: string
  default?: boolean
}
