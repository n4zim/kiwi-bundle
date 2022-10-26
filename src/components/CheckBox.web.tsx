import { React } from "../vendors"
import { StyleSheetStyleView } from "../types/styles"
import { View } from "./View"

interface Props {
  style?: StyleSheetStyleView
}

export const CheckBox = (props: Props) => {
  return <View {...props}/>
}
