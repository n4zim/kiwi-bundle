import "react-native"
import React from "react"
import Home from "../src/pages/home"
import renderer from "react-test-renderer"

it("renders correctly", () => {
  renderer.create(<Home/>)
})
