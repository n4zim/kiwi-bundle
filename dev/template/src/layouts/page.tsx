import React from "react"
import {
  SafeAreaView,
  ScrollView,
} from "react-native"

export function Page(props: { children: React.ReactNode }) {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {props.children}
      </ScrollView>
    </SafeAreaView>
  )
}
