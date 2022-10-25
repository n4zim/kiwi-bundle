import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../styles"

interface Props extends ReactNative.StatusBarProps {
  style?: StyleSheetStyleView
}

export const StatusBar = (props: Props) => {
  return <ReactNative.StatusBar {...props}/>
}
