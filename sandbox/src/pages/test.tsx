import React from "react"
import {
  StyleSheet,
  Text,
} from "react-native"
import { Page } from "../layouts/page"

export default () => {
  return <Page>
    <Text style={STYLE.text1}>Test</Text>
  </Page>
}

const STYLE = StyleSheet.create({
  text1: {
    color: "green",
  },
})
