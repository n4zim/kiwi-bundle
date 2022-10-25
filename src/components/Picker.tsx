import { React } from "../vendors"
import { Picker as PickerBase, PickerProps } from "@react-native-picker/picker"
import { StyleSheetStyleView } from "../types/styles"

interface Props extends PickerProps {
  style?: StyleSheetStyleView
  children?: React.ReactNode
}

export const Picker = (props: Props) => {
  return <PickerBase {...props} />
}
