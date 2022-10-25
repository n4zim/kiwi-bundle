import { PickerProps, Picker as PickerBase } from "@react-native-picker/picker"
import { React } from "../vendors"
import { StyleSheetStyleView } from "../types/styles"

interface Props extends PickerProps {
  style?: StyleSheetStyleView
  children?: React.ReactNode
}

export const Picker = (props: Props) => {
  return <PickerBase {...props} />
}
