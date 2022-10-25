import { React, ReactNative } from "../vendors"
import { StyleSheetStyleText } from "../types/styles"

interface Props extends ReactNative.TextInputProps {
  style?: ReactNative.StyleProp<StyleSheetStyleText>
  children?: React.ReactNode
  enterKeyHint?: string
}

export const TextInput = (props: Props) => {
  return <ReactNative.TextInput {...props} />
}
