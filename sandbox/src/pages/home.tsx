import React from "react"
import * as Kiwi from "kiwi-bundle"
import { APP } from "../app"
import STYLE from "./home.style"

export default APP.Page(self => self
  .style(STYLE)
  .render(({ style }) => {
    return (
      <Kiwi.SafeAreaView>
        <Kiwi.ScrollView contentInsetAdjustmentBehavior="automatic">
          <Kiwi.View>
            <Kiwi.Text style={style.text1}>It works</Kiwi.Text>
          </Kiwi.View>
        </Kiwi.ScrollView>
      </Kiwi.SafeAreaView>
    )
  })
)
