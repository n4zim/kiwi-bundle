import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../styles"

interface Props extends ReactNative.PickerItemProps {
  style?: StyleSheetStyleView
  children?: any
}

export const PickerItem = (props: Props) => {
  return <ReactNative.Picker.Item {...props} />
}
