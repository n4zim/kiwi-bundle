import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../styles"

interface Props extends ReactNative.CheckBoxProps {
  style?: StyleSheetStyleView
}

export const CheckBox = (props: Props) => {
  return <ReactNative.CheckBox {...props} />
}
