import { React, ReactNative } from "../vendors"
import { PinchGestureHandler } from "react-native-gesture-handler"
import { StyleSheetStyleView } from "../types/styles"

export interface ZoomableViewProps {
  children?: React.ReactNode
  style?: ReactNative.StyleProp<StyleSheetStyleView>
}

export const ZoomableView = (props: ZoomableViewProps) => {
  return <PinchGestureHandler {...props} />
}
