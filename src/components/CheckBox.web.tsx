import CheckBoxBase, { CheckBoxProps } from "@react-native-community/checkbox"
import { React } from "../vendors"
import { StyleSheetStyleView } from "../types/styles"

interface Props extends CheckBoxProps {
  style?: StyleSheetStyleView
}

export const CheckBox = (props: Props) => {
  return <CheckBoxBase {...props} />
}
