import { Environment } from "dropin-recipes"
import { Bundle } from "../core/bundle"

export const Deploy = (path: string, stage: string, name?: string) => {
  const bundle = new Bundle(path, Environment.PRODUCTION)
  bundle.display()
}
