import { spawn } from "child_process"
import { join } from "path"

export default ({ path }) => {
  spawn(
    join(path, "node_modules/.bin/react-scripts"),
    ["build"],
    {
      shell: true,
      stdio: "inherit",
      //uid: 1000,
      cwd: path,
      env: {
        SKIP_PREFLIGHT_CHECK: "true",
        FORCE_COLOR: "true",
      },
    }
  )
}
