import React from "react"
import {
  Button,
  StyleSheet,
  Text,
} from "react-native"
import { Page } from "../layouts/page"
import * as Kiwi from "../kiwi/i18n"
import { i18nContent } from "../i18n/content"

export default () => {
  return <Page>
    <Text
      style={STYLE.text1}
      children={Kiwi.i18n.translate(i18nContent.home)}
    />
    <Button onPress={console.log} title={Kiwi.i18n.translate({})}/>
  </Page>
}

const STYLE = StyleSheet.create({
  text1: {
    color: "blue",
  },
})
