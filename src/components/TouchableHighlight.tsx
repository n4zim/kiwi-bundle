import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../styles"

interface Props extends ReactNative.TouchableHighlightProps {
  style?: StyleSheetStyleView
  children?: React.ReactNode
}

export const TouchableHighlight = (props: Props) => {
  return <ReactNative.TouchableHighlight {...props} />
}
