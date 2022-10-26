import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../types/styles"

interface Props extends ReactNative.KeyboardAvoidingViewProps {
  style?: StyleSheetStyleView
  children?: React.ReactNode
}

export const KeyboardAvoidingView = (props: Props) => {
  return <ReactNative.KeyboardAvoidingView {...props}/>
}
