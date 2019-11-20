import { KiwiBundleContext } from "../core/context"
import jest from "jest"

export const Test = (path: string) => {
  const context = new KiwiBundleContext(path)
  jest.run(context.path)
}
