import { StyleSheetStyleView } from "../styles"
import { React, ReactNative } from "../vendors"

interface Props extends ReactNative.ActivityIndicatorProps {
  style?: StyleSheetStyleView
}

export const ActivityIndicator = (props: Props) => {
  return <ReactNative.ActivityIndicator {...props}/>
}
