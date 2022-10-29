import React from "react"
import {
  Button,
  StyleSheet,
  Text,
} from "react-native"
import { i18nContent } from "../i18n/content"
import { i18nLinks } from "../i18n/links"
import * as Kiwi from "../kiwi"
import { Page } from "../layouts/page"

export default () => {
  const context = React.useContext(Kiwi.Context)
  return <Page>
    <Text
      style={STYLE.text1}
      children={Kiwi.i18n(i18nContent.test)}
    />
    <Button
      onPress={() => context.goTo("home")}
      title={Kiwi.i18n(i18nLinks.goTo("home"))}
    />
  </Page>
}

const STYLE = StyleSheet.create({
  text1: {
    color: "green",
  },
})
