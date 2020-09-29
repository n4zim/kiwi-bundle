import { SelectorCondition } from "./Condition"

export interface FieldSelector {
  name: string
  display?: boolean
  selectors?: SelectorCondition[]
  abstract?: boolean
  filters?: boolean
}
