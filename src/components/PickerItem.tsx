import { PickerItemProps, Picker } from "@react-native-picker/picker"
import { React } from "../vendors"
import { StyleSheetStyleView } from "../types/styles"

interface Props extends PickerItemProps {
  style?: StyleSheetStyleView
  children?: any
}

export const PickerItem = (props: Props) => {
  return <Picker.Item {...props} />
}
