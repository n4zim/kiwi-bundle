import React from "react"
import {
  Button,
  StyleSheet,
  Text,
} from "react-native"
import * as Kiwi from "../kiwi"
import { Page } from "../layouts/page"
import { i18nContent } from "../i18n/content"
import { i18nLinks } from "../i18n/links"

export default () => {
  const context = React.useContext(Kiwi.Context)
  console.log(context)
  return <Page>
    <Text
      style={STYLE.text1}
      children={Kiwi.i18n(i18nContent.home)}
    />
    <Button
      onPress={console.log}
      title={Kiwi.i18n(i18nLinks.goTo("Test"))}
    />
    <Button
      onPress={() => context.setLanguage(Kiwi.Language.ENGLISH)}
      title={Kiwi.i18n(i18nLinks.changeLanguage(Kiwi.Language.ENGLISH))}
    />
    <Button
      onPress={() => context.setLanguage(Kiwi.Language.FRENCH)}
      title={Kiwi.i18n(i18nLinks.changeLanguage(Kiwi.Language.FRENCH))}
    />
  </Page>
}

const STYLE = StyleSheet.create({
  text1: {
    color: "blue",
  },
})
